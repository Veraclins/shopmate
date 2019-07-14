/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  Container,
  ErrorMessage,
  InputButton,
  InputGroup,
  ProfileInput,
  StyledForm,
  Submit,
  Footer,
  Title,
} from 'components/Profile';
import Select from 'components/Select';
import Stepper from 'components/Stepper';
import { useAxios, useForm } from 'helpers/hooks';
import api from 'services/api';
import { Customer } from 'state/interfaces';
import { changeStatus } from 'state/status';
import { update } from 'state/user';
import { rem } from 'styles';

interface AddressProps {
  close: () => void;
  errors?: string;
  customer: Customer;
}
const Address: React.FunctionComponent<AddressProps> = ({
  close,
  customer,
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

    try {
      dispatch(changeStatus(true));
      const response = await api.put('customers/address', data);
      dispatch(update(response.data));
      close();
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
      region: customer.region || '',
      postal_code: customer.postal_code || '',
      country: customer.country || '',
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

  return (
    <>
      <Container>
        <Title>Update Address</Title>
        <StyledForm errors={errors} onSubmit={handleSubmit}>
          <Stepper steps={steps} currentStep={step} />
          {step === 1 && (
            <>
              <InputGroup>
                <ProfileInput
                  type="text"
                  value={values.address_1}
                  name="address_1"
                  label="Main address"
                  required
                  placeholder="Main address"
                  onChange={handleChange}
                />
                <ProfileInput
                  type="text"
                  value={values.address_2}
                  name="address_2"
                  label="Second address"
                  placeholder="Second address"
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
              </InputGroup>
            </>
          )}
          {step === 2 && (
            <>
              <InputGroup>
                <ProfileInput
                  type="text"
                  value={values.postal_code}
                  name="postal_code"
                  required
                  placeholder="Postal Code"
                  label="Postal Code"
                  onChange={handleChange}
                />
                <ProfileInput
                  type="text"
                  value={values.country}
                  required
                  name="country"
                  placeholder="Country"
                  label="Country"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <AddressSelect
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
              <Submit type="submit" value="Update Address" />
            )}
          </Footer>
        </StyledForm>
      </Container>
    </>
  );
};

const AddressSelect = styled(Select)`
  margin: ${rem(5)} auto;
  padding: ${rem(20)};
  border-radius: ${rem(8)};
  align-items: center;
`;

export default Address;
