/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  Container,
  ErrorMessage,
  InputButton,
  StyledForm,
  Submit,
  Footer,
} from 'components/Profile';
import Select from 'components/Select';
import Stepper from 'components/Stepper';
import { useAxios, useForm } from 'helpers/hooks';
import api from 'services/api';
import { Customer, CartItem } from 'state/interfaces';
import { changeStatus } from 'state/status';
import { update, logout } from 'state/user';
import { rem } from 'styles';
import Input from 'components/Input';
import { lightGrey, dark, brand } from 'styles/colors';
import Radio from './Radio';
import { placeOrder } from 'state/cart';
import { getColorAndSize, checkRequiredFields } from 'helpers';
import CheckoutForm from './CheckoutForm';
import { injectStripe, ReactStripeElements } from 'react-stripe-elements';
import rocket from 'assets/icons-rocket.png';
import { isValidSession, INVALID_SESSION } from 'helpers/auth';
import { toast } from 'react-toastify';
import { history } from 'store';

interface CheckoutProps {
  close: () => void;
  errors?: string;
  customer: Customer;
  cartId: string;
  bag: number;
  items: CartItem[];
}
const Checkout: React.FunctionComponent<
  ReactStripeElements.InjectedStripeProps & CheckoutProps
> = ({ close, stripe, customer, items, bag, cartId }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [steps] = useState(['Delivery', 'Confirmation', 'Payment', 'Finish']);
  const [errors, setErrors] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState({
    value: 0,
    label: 'Please select',
    cost: 0,
  });
  const [grandTotal, setGrandTotal] = useState(
    Math.ceil(bag + Number(selectedShipping.cost))
  );
  const [shippingOptions, setShippingOptions] = useState([selectedShipping]);
  const [regions, setRegions] = useState([
    {
      value: 0,
      label: '',
    },
  ]);
  const submit = async data => {
    const shipping_region_id = data.shipping_region_id | 0;
    const shipping_id = data.shipping_id | 0;
    data = { ...data, shipping_region_id };
    const shippingRegion = regions.find(
      region => region.value === selectedRegion
    );

    if (shippingRegion) {
      data = { ...data, region: shippingRegion.label };
    }
    const order = {
      cart_id: cartId,
      tax_id: 2,
      shipping_id,
    };
    const requiredErrors = checkRequiredFields(data, [
      'address_1',
      'city',
      'shipping_region_id',
      'postal_code',
      'country',
      'region',
      'shipping_id',
    ]);
    if (requiredErrors) return setErrors(requiredErrors);
    try {
      const hasSession = isValidSession();
      if (!hasSession) {
        dispatch(logout());
        toast.error(INVALID_SESSION);
        return history.push('/');
      }
      dispatch(changeStatus(true));
      if (stripe) {
        const payload = await stripe.createToken();
        if (payload.error) return setErrors(payload.error.message || '');
        const { token } = payload;
        if (token) {
          const response = await api.put('customers/address', data);
          await dispatch(update(response.data));
          const orderResponse = await api.post('/orders', order);
          await dispatch(placeOrder(orderResponse.data));
          const { orderId } = orderResponse.data;
          const charge = {
            stripeToken: token.id,
            order_id: orderId,
            description: `Order ${orderId} by ${customer.name}`,
            amount: grandTotal * 100,
          };

          await api.post('/stripe/charge', charge);
          setStep(step + 1);
        }
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    } catch (error) {
      setErrors(error.message);
    } finally {
      dispatch(changeStatus(false));
    }
  };
  const { values, handleChange, handleSubmit } = useForm(
    {
      address_1: customer.address_1 || '',
      address_2: customer.address_2 || '',
      city: customer.city || '',
      shipping_region_id: customer.shipping_region_id || 1,
      postal_code: customer.postal_code || '',
      country: customer.country || '',
    },
    submit
  );
  const result = useAxios({ url: 'shipping/regions' }, []);
  if (result.length !== regions.length) {
    let options: any[] = [];
    result.forEach(element => {
      options = [
        ...options,
        {
          value: element.shipping_region_id,
          label: element.shipping_region,
        },
      ];
    });
    setRegions(options);
  }

  const getShippingOptions = async (id: number) => {
    try {
      dispatch(changeStatus(true));
      const response = await api.get(`shipping/regions/${id}`);
      const { data } = response;
      const options = data.map(element => {
        const label = element.shipping_type;
        const value = element.shipping_id;
        const cost = element.shipping_cost;
        return { value, label, cost };
      });
      setShippingOptions(options);
    } catch (error) {
      setErrors(error.message);
    } finally {
      dispatch(changeStatus(false));
    }
  };

  const shippingOption = shippingOptions.find(
    shippingOption => shippingOption.value === (values.shipping_id | 0)
  );
  if (shippingOption && selectedShipping.value !== shippingOption.value) {
    setSelectedShipping(shippingOption);
  }

  if (selectedRegion !== Number(values.shipping_region_id)) {
    setSelectedRegion(Number(values.shipping_region_id));

    getShippingOptions(Number(values.shipping_region_id));
  }

  return (
    <Container>
      <Title>Checkout</Title>
      <StyledForm
        errors={errors}
        onSubmit={handleSubmit}
        onFocus={() => setErrors('')}
      >
        <Stepper steps={steps} currentStep={step} />
        {step === 1 && (
          <>
            <InputGroup>
              <ProfileInput
                type="text"
                value={values.address_1}
                name="address_1"
                label="Main Address"
                required
                placeholder="Main Address"
                onChange={handleChange}
              />
              <ProfileInput
                type="text"
                value={values.address_2}
                name="address_2"
                label="Second Address"
                placeholder="Second Address"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <ProfileInput
                type="text"
                value={values.city}
                name="city"
                placeholder="City"
                required
                label="City"
                onChange={handleChange}
              />
              <ProfileInput
                type="text"
                value={values.postal_code}
                name="postal_code"
                required
                placeholder="Postal Code"
                label="Postal Code"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <ProfileInput
                type="text"
                value={values.country}
                required
                name="country"
                placeholder="Country"
                label="Country"
                onChange={handleChange}
              />
              <CheckoutSelect
                type="select"
                value={values.shipping_region_id}
                name="shipping_region_id"
                placeholder="Shipping region"
                required
                label="Shipping region"
                options={regions}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <Line />
            </InputGroup>
            <Title>Delivery Options</Title>
            <InputGroup>
              <Radio
                required
                horizontal
                name="shipping_id"
                selected={Number(values.shipping_id)}
                options={shippingOptions}
                onChange={handleChange}
              />
            </InputGroup>
          </>
        )}
        {step === 2 && (
          <>
            <Summary>
              <Cart>
                <Title>Order Summary</Title>
                <Header>
                  <Left>
                    <HeadingText>Items</HeadingText>
                  </Left>
                  <Right>
                    <HeadingText>Size</HeadingText>
                    <HeadingText>Color</HeadingText>
                    <HeadingText>Quantity</HeadingText>
                    <HeadingText>Price</HeadingText>
                  </Right>
                </Header>
                <MainArea>
                  {items.map(item => (
                    <Item key={item.item_id}>
                      <Left>
                        <Name>{item.name}</Name>
                      </Left>
                      <Right>
                        <ItemText>
                          {getColorAndSize(item.attributes).size}
                        </ItemText>
                        <ItemText>
                          {getColorAndSize(item.attributes).color}
                        </ItemText>
                        <ItemText>{item.quantity}</ItemText>
                        <ItemText>
                          <Price>${item.subtotal}</Price>
                        </ItemText>
                      </Right>
                    </Item>
                  ))}
                </MainArea>
              </Cart>
              <Delivery>
                <Title>Delivery</Title>
                <Label>Address</Label>
                <Content>
                  {values.address_1}, {values.city}, {values.country},{' '}
                  {values.postal_code}
                </Content>
                <Label>Delivery options</Label>
                {shippingOption ? (
                  <Content>{selectedShipping.label}</Content>
                ) : (
                  <Content error>You must select a shipping option</Content>
                )}
              </Delivery>
            </Summary>
            <CostSummary>
              <CostItem>
                <Label>Subtotal</Label>
                <CostValue>${bag}</CostValue>
              </CostItem>
              <CostItem>
                <Label>Shipping</Label>
                <CostValue>${selectedShipping.cost}</CostValue>
              </CostItem>
              <CostItem>
                <Label>Grand total</Label>
                <CostValue big>${grandTotal}</CostValue>
              </CostItem>
            </CostSummary>
          </>
        )}
        {step === 3 && <CheckoutForm fontSize="18px" />}
        {step === 4 && (
          <Success>
            <Image src={rocket} />
            <SuccessMessage>Success!</SuccessMessage>
            <SuccessByline>Your items will be shipped shortly</SuccessByline>
            <SuccessByline>You will get an email with details</SuccessByline>
          </Success>
        )}
        {errors && <ErrorMessage>{errors}</ErrorMessage>}
        <Footer>
          {step < steps.length ? (
            <>
              <InputButton
                light
                onClick={() => setStep(step - 1)}
                disabled={step <= 1}
              >
                Previous
              </InputButton>
              {step < steps.length - 1 ? (
                <InputButton
                  onClick={() => {
                    setStep(step + 1);
                    setGrandTotal(
                      Math.ceil(bag + Number(selectedShipping.cost))
                    );
                  }}
                  disabled={step >= steps.length}
                >
                  Next
                </InputButton>
              ) : (
                <Submit type="submit" value="Place Order" />
              )}
            </>
          ) : (
            <BackToShop onClick={() => close()}>Back to Shop</BackToShop>
          )}
        </Footer>
      </StyledForm>
    </Container>
  );
};

const CheckoutSelect = styled(Select)`
  margin: ${rem(5)} auto;
  padding: ${rem(10)};
  border-radius: ${rem(5)};
  align-items: center;
`;

const InputGroup = styled.div`
  display: flex;
  color: ${dark};
  justify-content: center;
  margin: ${rem(10)} ${rem(10)};
  box-sizing: border-box;
  align-items: center;
  width: 100%;
`;

const ProfileInput = styled(Input)`
  margin: ${rem(5)} auto;
  padding: ${rem(10)};
  border-radius: ${rem(5)};
  align-items: center;
  text-align: left;

  &:read-only {
    background: ${lightGrey};
    cursor: not-allowed;
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  margin: ${rem(20)} ${rem(10)} ${rem(10)};
  box-sizing: border-box;
  align-items: center;
  height: ${rem(1)};
  background: ${lightGrey};
  padding: 0 ${rem(20)};
  width: 100%;
`;

const Title = styled.div`
  margin: ${rem(20)} 0;
  box-sizing: border-box;
  font-size: ${rem(18)};
  color: ${dark};
  display: flex;
  align-self: flex-start;
  text-align: left;
  font-weight: bold;
`;

const Header = styled.div`
  align-items: center;
  box-sizing: border-box;
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

const Summary = styled.div`
  box-sizing: border-box;
  display: flex;
  padding-bottom: ${rem(20)};
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: ${rem(2)} solid ${lightGrey};
  width: 100%;
`;

const CostSummary = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: ${rem(20)};
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const CostItem = styled.div`
  box-sizing: border-box;
  padding: ${rem(5)} ${rem(15)};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Cart = styled.div`
  padding: 0 ${rem(16)};
  box-sizing: border-box;
  display: flex;
  flex: 2;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Delivery = styled.div`
  margin: 0 ${rem(16)};
  padding: 0 ${rem(16)};
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Item = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: ${rem(20)} 0 0;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Price = styled.div`
  box-sizing: border-box;
  color: ${brand};
  font-weight: bold;
`;

const Left = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  & :first-child {
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Right = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: flex-start;
`;

const HeadingText = styled.div`
  min-width: ${rem(80)};
  font-size: ${rem(14)};
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  margin: ${rem(10)} 0;
  font-size: ${rem(14)};
  display: flex;
  font-weight: bold;
  align-items: center;
`;

const Content = styled.div<{ error?: boolean }>`
  display: flex;
  font-weight: normal;
  color: ${({ error }) => (error ? brand : dark)};
  align-items: center;
  font-size: ${rem(14)};
  text-align: start;
`;

const CostValue = styled.div<{ big?: boolean }>`
  display: flex;
  font-weight: bold;
  align-items: center;
  color: ${dark};
  font-size: ${({ big }) => (big ? rem(18) : rem(14))};
  text-align: start;
`;

const ItemText = styled.div`
  min-width: ${rem(80)};
  display: flex;
  color: ${dark};
  font-weight: normal;
  justify-content: center;
  font-size: ${rem(14)};
  align-items: center;
`;

const Name = styled.div`
  min-width: ${rem(80)};
  display: flex;
  color: ${dark};
  font-weight: normal;
  font-size: ${rem(14)};
  align-items: center;
`;

const Success = styled.div`
  margin: ${rem(10)} auto ${rem(30)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SuccessMessage = styled.div`
  margin: ${rem(20)};
  color: ${dark};
  font-weight: bold;
  text-transform: uppercase;
  font-size: ${rem(30)};
`;

const SuccessByline = styled.div`
  color: ${dark};
  font-weight: normal;
  font-size: ${rem(14)};
`;

const BackToShop = styled(InputButton)`
  margin: ${rem(14)} auto;
`;

const Image = styled.img`
  display: block;
  margin: ${rem(10)} auto;
  min-width: ${rem(200)};

  @media screen and (max-width: ${rem(480)}) {
    box-sizing: border-box;
  }
`;

export default injectStripe(Checkout);
