/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import styled from 'styled-components';

import { white, light, dark, brand, grey } from 'styles/colors';
import { rem } from 'styles';
import {
  ProductId,
  ProductComplete,
  Review,
  Attribute,
  CartInput,
} from 'state/interfaces';
import { connect, useDispatch } from 'react-redux';
import { useAxios, useForm } from 'helpers/hooks';
import { fetchProduct, fetchAttributes, loadReviews } from 'state/product';
import api from 'services/api';
import { addToCart } from 'state/cart';
import Button from 'components/Button';
import Form from 'components/Form';
import Textarea from 'components/Textarea';
import { changeStatus } from 'state/status';
import { getImageUrl } from 'helpers';

interface ItemProps {
  id: ProductId;
  cartId: string;
  product: ProductComplete;
  reviews: Review[];
  sizes: Attribute[];
  colors: Attribute[];
  close: () => void;
}

const Item: React.FunctionComponent<ItemProps> = ({
  id,
  product,
  reviews,
  sizes,
  colors,
  cartId,
  close,
}) => {
  const [selectedColor, setColor] = useState('White');
  const [selectedSize, setSize] = useState('S');
  const dispatch = useDispatch();
  const submitReview = data => {
    console.log(data);
  };

  const addProductToCart = async () => {
    const data: CartInput = {
      cart_id: cartId,
      product_id: product.product_id,
      attributes: `${selectedSize}, ${selectedColor}`,
    };
    try {
      dispatch(changeStatus(true));
      const response = await api.post('shoppingcart/add', data);
      dispatch(addToCart(response.data));
      close();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(changeStatus(false));
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    { review: '', rating: 5 },
    submitReview
  );
  const result = useAxios({ url: `products/${id}` }, { product });
  const productReviews = useAxios({ url: `products/${id}/reviews` }, reviews);
  const attributes = useAxios({ url: `attributes/inProduct/${id}` }, [
    ...sizes,
    ...colors,
  ]);

  if (productReviews.length !== reviews.length) {
    dispatch(loadReviews(productReviews));
  }

  if (attributes.length !== [...sizes, ...colors].length) {
    dispatch(fetchAttributes(attributes));
  }

  if (result.product_id !== product.product_id) {
    dispatch(fetchProduct(result));
  }

  return (
    <StyledItem>
      <MainArea>
        <Preview>
          <Image src={getImageUrl(product.image)} alt="Item preview" />
          <SmallerImage>
            <img src={getImageUrl(product.image)} alt="thumbnail" />
            <img src={getImageUrl(product.image_2)} alt="thumbnail" />
          </SmallerImage>
        </Preview>
        <Details>
          <Name>{product.name}</Name>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>
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

          <Button large onClick={addProductToCart}>
            Add to cart
          </Button>
        </Details>
      </MainArea>
      <ReviewContainer>
        <Title>Product Reviews</Title>
        <ReviewArea>
          {reviews.map(review => (
            <Reviews key={Math.random()}>
              <ReviewLeft>
                <Name>{review.name}</Name>
                rating: {review.rating}
              </ReviewLeft>
              <ReviewDetail>{review.review}</ReviewDetail>
            </Reviews>
          ))}
        </ReviewArea>
        <Line />
        <Title>Add a review</Title>
        <AddReview>
          <Form onSubmit={handleSubmit} submitText="Submit Review">
            <InputControl>
              <InputLabel>Your review</InputLabel>
              <ReviewInput
                type="text"
                value={values.review}
                name="review"
                onChange={handleChange}
              />
            </InputControl>
          </Form>
        </AddReview>
      </ReviewContainer>
    </StyledItem>
  );
};

const StyledItem = styled.div`
  padding: ${rem(30)};
  background: ${light};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Title = styled.div`
  margin: ${rem(20)} 0;
  box-sizing: border-box;
  font-size: ${rem(20)};
  color: ${dark};
  text-align: left;
  font-weight: bold;
`;

const Line = styled.hr`
  margin: ${rem(40)} 0 ${rem(20)};
  width: 100%;
  font-weight: bold;
`;

const MainArea = styled.div`
  padding: ${rem(30)};
  background: ${white};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-shadow: 0 0 ${rem(2)} ${rem(-1)} ${grey};
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
`;

const Name = styled.div`
  margin: ${rem(10)} 0;
  box-sizing: border-box;
  font-weight: bold;
  color: ${dark};
`;

const Description = styled.div`
  margin: ${rem(10)} 0;
  box-sizing: border-box;
  font-size: ${rem(13)};
  line-height: normal;
  text-align: left;
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

const ReviewContainer = styled.div`
  padding: ${rem(60)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 ${rem(2)} ${rem(-1)} ${dark};
`;

const ReviewArea = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: ${rem(300)};
  padding-bottom: ${rem(30)};
  overflow-y: auto;
  justify-content: space-between;
`;

const Reviews = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ReviewLeft = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewDetail = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex: 3;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
`;

const AddReview = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: ${rem(480)}) {
    box-sizing: border-box;
  }
`;

const InputControl = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
`;

const InputLabel = styled.div`
  box-sizing: border-box;
  min-width: ${rem(100)};
  flex: 1;
  display: flex;
`;

const ReviewInput = styled(Textarea)`
  margin: ${rem(10)} ${rem(20)};
  flex: 3;
  display: flex;
  padding: ${rem(20)};
  text-align: left;
`;

const mapStateToProps = state => ({
  product: state.product.product,
  reviews: state.product.reviews,
  sizes: state.product.attributes.sizes,
  colors: state.product.attributes.colors,
  cartId: state.cart.cartId,
});

export default connect(mapStateToProps)(Item);
