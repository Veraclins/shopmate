import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingBag } from 'react-icons/fa';
import Modal from 'components/Modal';
import Cart from 'components/Cart';
import Badge from 'components/Badge';
import Checkout from 'components/Checkout';
import { Customer, CartItem } from 'state/interfaces';
import { Elements, StripeProvider } from 'react-stripe-elements';

interface CartIconProps {
  theme: any;
  items: CartItem[];
  cartId: string;
  bag: number;
  customer: Customer;
}

const CartIcon: React.FunctionComponent<CartIconProps> = ({
  theme,
  items,
  customer,
  bag,
  cartId,
}) => {
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutForm, toggleCheckoutForm] = useState(false);

  const openCheckoutForm = () => {
    toggleCheckoutForm(true);
  };

  return (
    <>
      <Container onClick={() => setShowCart(true)}>
        <Badge theme={theme} value={items.length}>
          <FaShoppingBag />
        </Badge>
      </Container>

      {showCart && (
        <Modal close={() => setShowCart(false)}>
          <Cart
            close={() => setShowCart(false)}
            openCheckoutForm={openCheckoutForm}
          />
        </Modal>
      )}
      {showCheckoutForm && (
        <Modal close={() => toggleCheckoutForm(false)}>
          <StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
            <Elements>
              <Checkout
                customer={customer}
                items={items}
                cartId={cartId}
                bag={bag}
                close={() => toggleCheckoutForm(false)}
              />
            </Elements>
          </StripeProvider>
        </Modal>
      )}
    </>
  );
};

const Container = styled.div`
  z-index: 1;
  cursor: pointer;
`;

export default CartIcon;
