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
  Title,
} from 'components/Profile';
import Select from 'components/Select';
import Stepper from 'components/Stepper';
import { useAxios, useForm } from 'helpers/hooks';
import api from 'services/api';
import { Customer, CartItem } from 'state/interfaces';
import { changeStatus } from 'state/status';
import { update } from 'state/user';
import { rem } from 'styles';
import Input from 'components/Input';
import { lightGrey } from 'styles/colors';
import Radio from './Radio';

interface CheckoutProps {
  close: () => void;
  errors?: string;
  customer: Customer;
  items: CartItem[];
}
const Checkout: React.FunctionComponent<CheckoutProps> = ({
  close,
  customer,
  items,
}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [steps] = useState(['Basic', 'Regional']);
  const [errors, setErrors] = useState('');
  const initialRegion = {
    id: 0,
    value: '',
    label: '',
  };
  const [regions, setRegions] = useState([initialRegion]);
  const submit = async data => {
    const shipping_region_id = regions.find(
      region => region.value === data.region
    );
    if (shipping_region_id) {
      data = { ...data, shipping_region_id: shipping_region_id.id };
    }
    console.log({ data });
    // try {
    //   dispatch(changeStatus(true));
    //   const response = await api.put('customers/Checkout', data);
    //   dispatch(update(response.data));
    //   close();
    // } catch (error) {
    //   setErrors(error.message);
    // } finally {
    //   dispatch(changeStatus(false));
    // }
  };
  const { values, handleChange, handleSubmit } = useForm(
    {
      address_1: customer.address_1 || '',
      address_2: customer.address_2 || '',
      city: customer.city || '',
      region: customer.region || '',
      postal_code: customer.postal_code || '',
      country: customer.country || '',
      shipping: 0,
    },
    submit
  );
  const result = useAxios({ url: `shipping/regions` }, []);
  if (result.length !== regions.length) {
    let options: any[] = [];
    result.forEach(element => {
      options = [
        ...options,
        {
          value: element.shipping_region,
          label: element.shipping_region,
          id: element.shipping_region_id,
        },
      ];
    });
    setRegions(options);
  }

  const shippingOptions = [
    {
      value: 1,
      label: 'Option 1',
    },
    {
      value: 2,
      label: 'Option 2',
    },
  ];

  return (
    <>
      <Container>
        <Title>Update Checkout</Title>
        <StyledForm errors={errors} onSubmit={handleSubmit}>
          <Stepper steps={steps} currentStep={step} />
          {step === 1 && (
            <>
              <MainArea>
                <InputGroup>
                  <ProfileInput
                    type="text"
                    value={values.name}
                    name="name"
                    required
                    placeholder="Name"
                    label="Name"
                    onChange={handleChange}
                  />
                  <ProfileInput
                    type="tel"
                    value={values.mob_phone}
                    name="mob_phone"
                    placeholder="Mobile phone number"
                    label="Mobile phone number"
                    onChange={handleChange}
                  />
                </InputGroup>
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
                    value={values.region}
                    name="region"
                    placeholder="Region"
                    required
                    label="Region"
                    options={regions}
                    onChange={handleChange}
                  />
                </InputGroup>
              </MainArea>
              <Line />
              <InputGroup>
                <Radio
                  required
                  readOnly
                  horizontal
                  name="shipping"
                  options={shippingOptions}
                  onChange={handleChange}
                />
              </InputGroup>
            </>
          )}
          {step === 2 && (
            <>
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
                  value={values.region}
                  name="region"
                  placeholder="Region"
                  required
                  label="Region"
                  options={regions}
                  onChange={handleChange}
                />
              </InputGroup>
            </>
          )}
          {errors && <ErrorMessage>{errors}</ErrorMessage>}
          <Footer>
            <InputButton onClick={() => setStep(step - 1)} disabled={step <= 1}>
              Previous
            </InputButton>
            {step < steps.length ? (
              <InputButton
                onClick={() => setStep(step + 1)}
                disabled={step >= steps.length}
              >
                Next
              </InputButton>
            ) : (
              <Submit type="submit" value="Update Checkout" />
            )}
          </Footer>
        </StyledForm>
      </Container>
    </>
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
  justify-content: center;
  margin: 0 ${rem(10)};
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

const MainArea = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: ${rem(1)} solid;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    box-sizing: border-box;
  }
`;
const Line = styled.hr`
  margin: ${rem(40)} 0 ${rem(20)};
  padding: 0 ${rem(20)};
  width: 100%;
  font-weight: bold;
`;

export default Checkout;
