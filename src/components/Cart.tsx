import React from 'react';
import styled from 'styled-components';

import { light, dark, brand, lightGrey } from 'styles/colors';
import { rem } from 'styles';
import { CartItem } from 'state/interfaces';
import { connect, useDispatch } from 'react-redux';
import { getImageUrl, getColorAndSize } from 'helpers';
import { FaTimes, FaMinus, FaPlus } from 'react-icons/fa';
import api from 'services/api';
import { addToCart } from 'state/cart';
import { throwError, changeStatus } from 'state/status';
import Button from 'components/Button';

interface CartProps {
  cartId: string;
  items: CartItem[];
  bag: number;
  close: () => void;
  openCheckoutForm: () => void;
}

const Cart: React.FunctionComponent<CartProps> = ({
  cartId,
  items,
  close,
  openCheckoutForm,
}) => {
  const dispatch = useDispatch();

  const loadCart = async () => {
    try {
      const response = await api.get(`shoppingcart/${cartId}`);
      dispatch(addToCart(response.data));
    } catch (error) {
      dispatch(throwError(error.message));
    }
  };

  const updateItem = async (itemId, quantity) => {
    try {
      dispatch(changeStatus(true));
      await api.put(`shoppingcart/update/${itemId}`, {
        quantity,
      });
      await loadCart();
    } catch (error) {
      dispatch(throwError(error.message));
    } finally {
      dispatch(changeStatus(false));
    }
  };

  const removeItem = async itemId => {
    try {
      dispatch(changeStatus(true));
      await api.delete(`shoppingcart/removeProduct/${itemId}`);
      await loadCart();
    } catch (error) {
      dispatch(throwError(error.message));
    } finally {
      dispatch(changeStatus(false));
    }
  };

  const decreaseQuantity = (currentQuantity: number, itemId: number) => {
    const quantity = currentQuantity - 1;
    updateItem(itemId, quantity);
  };

  const increaseQuantity = (currentQuantity: number, itemId: number) => {
    const quantity = currentQuantity + 1;
    updateItem(itemId, quantity);
  };

  return (
    <>
      <StyledCart>
        <Title>{items.length} Items in Your Cart</Title>
        <Header>
          <Left>
            <Text>Items</Text>
          </Left>
          <Right>
            <Text>Size</Text>
            <Text>Color</Text>
            <Text>Quantity</Text>
            <Text>Price</Text>
          </Right>
        </Header>
        <MainArea>
          {items.map(item => (
            <Item key={item.item_id}>
              <Left>
                <Image>
                  <img src={getImageUrl(item.image)} alt="item" />
                </Image>
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <Remove onClick={() => removeItem(item.item_id)}>
                    <RemoveButton /> Remove
                  </Remove>
                </ItemDetails>
              </Left>
              <Right>
                <Text>{getColorAndSize(item.attributes).size}</Text>
                <Text>{getColorAndSize(item.attributes).color}</Text>
                <Text>
                  <QuantityButton
                    onClick={() =>
                      decreaseQuantity(item.quantity, item.item_id)
                    }
                  >
                    <FaMinus />
                  </QuantityButton>
                  {item.quantity}
                  <QuantityButton
                    onClick={() =>
                      increaseQuantity(item.quantity, item.item_id)
                    }
                  >
                    <FaPlus />
                  </QuantityButton>
                </Text>
                <Text>
                  <ItemName>${item.subtotal}</ItemName>
                </Text>
              </Right>
            </Item>
          ))}
        </MainArea>
        <Footer>
          <CartButton light onClick={close}>
            Back to shop
          </CartButton>
          <CartButton
            onClick={() => {
              close();
              openCheckoutForm();
            }}
          >
            Checkout
          </CartButton>
        </Footer>
      </StyledCart>
    </>
  );
};

const StyledCart = styled.div`
  margin: 0 ${rem(40)};
  padding: 0 ${rem(16)};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Title = styled.div`
  margin: 0 0 ${rem(40)};
  box-sizing: border-box;
  font-size: ${rem(28)};
  color: ${dark};
  text-align: left;
  font-weight: bold;
`;

const Header = styled.div`
  align-items: center;
  box-sizing: border-box;
  border-bottom: ${rem(2)} solid ${lightGrey};
  padding-bottom: ${rem(10)};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MainArea = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${rem(20)};
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Item = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: ${rem(20)} 0 0;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ItemName = styled.div`
  box-sizing: border-box;
  font-size: ${rem(18)};
  color: ${dark};
  font-weight: bold;
`;

const Image = styled.div`
  display: flex;
  img {
    display: inline-block;
    width: ${rem(60)};
    height: ${rem(60)};
    padding: ${rem(10)};
    border: ${rem(0.5)} solid ${lightGrey};
  }
`;

const ItemDetails = styled.div`
  box-sizing: border-box;
  padding: ${rem(5)} ${rem(15)};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Left = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: flex-start;
`;

const Right = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: flex-start;
`;

const Text = styled.div`
  width: ${rem(120)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Remove = styled.div`
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  align-items: center;
`;

const RemoveButton = styled(FaTimes)`
  color: ${brand};
`;

const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${rem(5)};
  margin: 0 ${rem(10)};
  width: ${rem(36)};
  height: ${rem(36)};
  color: ${dark};
  background: ${light};
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 50%;
`;

const Footer = styled.div`
  box-sizing: border-box;
  display: flex;
  background: ${light};
  margin: 0 ${rem(-70)} ${rem(-14)};
  padding: 0 ${rem(70)};
  padding-bottom: ${rem(20)};
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CartButton = styled(Button)`
  margin: ${rem(14)};
`;

const mapStateToProps = state => ({
  items: state.cart.items,
  cartId: state.cart.cartId,
  bag: state.cart.bag,
});

export default connect(mapStateToProps)(Cart);
