import React, { useState } from 'react';
import styled from 'styled-components';

import { white, light, dark, brand, grey } from 'styles/colors';
import { rem } from 'styles';
import {
  ProductId,
  ProductComplete,
  Review,
  Attribute,
} from 'state/interfaces';
import { connect, useDispatch } from 'react-redux';
import { useAxios } from 'helpers/hooks';
import { fetchProduct, fetchAttributes } from 'state/product';
import config from 'config';
import Button from './Button';

interface ItemProps {
  id: ProductId;
  product: ProductComplete;
  reviews: Review[];
  sizes: Attribute[];
  colors: Attribute[];
}

const Item: React.FunctionComponent<ItemProps> = ({
  id,
  product,
  reviews,
  sizes,
  colors,
}) => {
  const dispatch = useDispatch();

  const [selectedColor, setColor] = useState('White');
  const [selectedSize, setSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  const getImageUrl = image => `${config.BASE_URL}/images/products/${image}`;

  const result = useAxios({ url: `products/${id}` }, { product });
  const cartId = useAxios({ url: `shoppingcart/generateUniqueId` }, {});
  const attributes = useAxios({ url: `attributes/inProduct/${id}` }, [
    ...sizes,
    ...colors,
  ]);

  if (attributes.length !== [...sizes, ...colors].length) {
    dispatch(fetchAttributes(attributes));
  }
  if (result && result.product_id !== product.product_id) {
    dispatch(fetchProduct(result));
  }

  return (
    <StyledItem>
      <MainArea>
        <Preview>
          <Image src={getImageUrl(product.image)} />
          <SmallerImage>
            <img src={getImageUrl(product.image)} />
            <img src={getImageUrl(product.image_2)} />
          </SmallerImage>
        </Preview>
        <Details>
          <Name>{product.name}</Name>
          <Price>£{product.discounted_price}</Price>
          <AttributeTitle>Choose color</AttributeTitle>
          <AttributeArea>
            {colors.map(col => (
              <ColorButton
                onClick={() => setColor(col.attribute_value)}
                key={col.attribute_value_id}
                color={col.attribute_value}
                selectedColor={selectedColor}
              />
            ))}
          </AttributeArea>
          <AttributeTitle>Choose size</AttributeTitle>
          <AttributeArea>
            {sizes.map(siz => (
              <SizeButton
                onClick={() => setSize(siz.attribute_value)}
                key={siz.attribute_value_id}
                size={siz.attribute_value}
                selectedSize={selectedSize}
              >
                {siz.attribute_value}
              </SizeButton>
            ))}
          </AttributeArea>
          <AttributeTitle>Choose quantity</AttributeTitle>
          <QuantityArea>
            <QuantityButton
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </QuantityButton>
            <Quantity>{quantity}</Quantity>
            <QuantityButton onClick={() => setQuantity(quantity + 1)}>
              +
            </QuantityButton>
          </QuantityArea>
          <Button large>Add to cart</Button>
        </Details>
      </MainArea>
      <Title>Product Reviews</Title>
      <ReviewArea>x</ReviewArea>
      <Title>You may also like</Title>
      <Recommended>x</Recommended>
    </StyledItem>
  );
};

const StyledItem = styled.div`
  margin: ${rem(10)};
  padding: ${rem(16)};
  background: ${light};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Title = styled.div`
  margin: ${rem(20)} 0;
  box-sizing: border-box;
  font-size: ${rem(20)};
  color: ${dark};
  text-align: left;
  font-weight: bold;
`;

const MainArea = styled.div`
  text-align: center;
  background: ${white};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Preview = styled.div`
  text-align: center;
  padding: ${rem(20)} auto;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    box-sizing: border-box;
    margin: ${rem(20)} auto;
  }
`;

const Image = styled.img`
  display: block;
  margin: ${rem(10)} auto;
  min-width: ${rem(200)};

  @media screen and (max-width: ${rem(480)}) {
    box-sizing: border-box;
  }
`;

const SmallerImage = styled.div`
  display: flex;
  margin: ${rem(20)} auto;
  img {
    display: inline-block;
    width: ${rem(100)};
    margin: ${rem(5)};
    @media screen and (max-width: ${rem(480)}) {
      box-sizing: border-box;
    }
  }
`;

const Details = styled.div`
  background: ${white};
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Name = styled.div`
  margin: ${rem(10)} 0;
  box-sizing: border-box;
  font-weight: bold;
  color: ${dark};
`;

const Price = styled.div`
  padding: ${rem(5)};
  font-weight: bold;
  color: ${brand};
  text-align: center;
`;

const AttributeArea = styled.div`
  margin: ${rem(5)} 0;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${brand};
  text-align: center;
`;

const AttributeTitle = styled.div`
  margin: ${rem(10)} 0;
  display: flex;
  font-weight: bold;
`;

const ColorButton = styled.button<{ color: string; selectedColor: string }>`
  margin: ${rem(5)};
  padding: ${rem(2)};
  display: flex;
  align-items: center;
  font-weight: bold;
  outline: none;
  background: ${({ color }) => color};
  border: ${({ color, selectedColor }) =>
    color === selectedColor && `${rem(3)} solid ${grey}`};
  height: ${({ color, selectedColor }) =>
    color === selectedColor ? rem(25) : rem(20)};
  width: ${({ color, selectedColor }) =>
    color === selectedColor ? rem(25) : rem(20)};
  text-align: center;
  box-sizing: border-box;
  border-radius: 50%;
`;

const SizeButton = styled.button<{ size: string; selectedSize: string }>`
  margin: ${rem(5)};
  padding: ${rem(3)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  outline: none;
  background: ${({ size, selectedSize }) =>
    size === selectedSize ? brand : light};

  width: ${rem(55)};
  text-align: center;
  box-sizing: border-box;
`;

const QuantityArea = styled.div`
  margin: ${rem(5)} 0;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-align: center;
`;

const Quantity = styled.div`
  margin: ${rem(5)} 0;
  padding: ${rem(3)} ${rem(8)};
  display: flex;
  align-items: center;
  font-weight: bold;
  text-align: center;
`;

const QuantityButton = styled.button`
  margin: ${rem(5)};
  padding: ${rem(3)} ${rem(8)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  outline: none;
  background: ${light};
  border-radius: ${rem(5)};
  text-align: center;
  box-sizing: border-box;
`;

const ReviewArea = styled.div`
  text-align: center;
  background: ${white};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: ${rem(200)};
  justify-content: center;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Recommended = styled.div`
  text-align: center;
  background: ${white};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const mapStateToProps = state => ({
  product: state.product.product,
  reviews: state.product.reviews,
  sizes: state.product.attributes.sizes,
  colors: state.product.attributes.colors,
});

export default connect(mapStateToProps)(Item);
