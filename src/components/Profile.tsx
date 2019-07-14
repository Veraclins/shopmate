/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Input from 'components/Input';
import { useForm } from 'helpers/hooks';
import { rem } from 'styles';
import { brand, dark, white, lightGrey, light } from 'styles/colors';
import api from 'services/api';
import { update } from 'state/user';
import { changeStatus } from 'state/status';
import { Customer } from 'state/interfaces';
import Button from 'components/Button';
import Stepper from 'components/Stepper';

interface ProfileProps {
  close: () => void;
  errors?: string;
  customer: Customer;
}
const Profile: React.FunctionComponent<ProfileProps> = ({
  close,
  customer,
}) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [steps] = useState(['Basic', 'Phone']);
  const [errors, setErrors] = useState('');
  const submit = async data => {
    if (data.password && data.password !== data.confirmPassword) {
      return setErrors('password and confirm password must match');
    }
    let valueToSubmit = {};
    if (!data.password) {
      const { password, confirmPassword, ...others } = data;
      valueToSubmit = others;
    } else {
      valueToSubmit = data;
    }
    try {
      dispatch(changeStatus(true));
      const response = await api.put(`customer`, valueToSubmit);
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
      name: customer.name,
      email: customer.email,
      password: '',
      confirmPassword: '',
      day_phone: customer.day_phone || '',
      eve_phone: customer.eve_phone || '',
      mob_phone: customer.mob_phone || '',
    },
    submit
  );

  return (
    <>
      <Container>
        <Title>Profile</Title>
        <StyledForm errors={errors} onSubmit={handleSubmit}>
          <Stepper steps={steps} currentStep={step} />
          {step === 1 && (
            <>
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
                  type="email"
                  value={values.email}
                  name="email"
                  readOnly
                  required
                  placeholder="Email"
                  label="Email"
                />
              </InputGroup>
              <InputGroup>
                <ProfileInput
                  type="password"
                  value={values.password}
                  name="password"
                  placeholder="Password"
                  label="Password"
                  onChange={handleChange}
                />
                <ProfileInput
                  type="password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  placeholder="Repeat password"
                  label="Repeat password"
                  onChange={handleChange}
                />
              </InputGroup>
            </>
          )}
          {step === 2 && (
            <>
              <InputGroup>
                <ProfileInput
                  type="tel"
                  value={values.day_phone}
                  name="day_phone"
                  placeholder="Day phone number"
                  label="Day phone number"
                  onChange={handleChange}
                />
                <ProfileInput
                  type="tel"
                  value={values.eve_phone}
                  name="eve_phone"
                  placeholder="Evening phone number"
                  label="Evening phone number"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <ProfileInput
                  type="tel"
                  value={values.mob_phone}
                  name="mob_phone"
                  placeholder="Mobile phone number"
                  label="Mobile phone number"
                  onChange={handleChange}
                />
              </InputGroup>
            </>
          )}
          {errors && <ErrorMessage>{errors}</ErrorMessage>}
          <Footer>
            <InputButton
              light
              onClick={() => setStep(step - 1)}
              disabled={step <= 1}
            >
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
              <Submit type="submit" value="Update Profile" />
            )}
          </Footer>
        </StyledForm>
      </Container>
    </>
  );
};

export const Container = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  color: ${({ color }) => (color ? color : 'inherit')};
  width: 100%;
`;

export const StyledForm = styled.form<Partial<ProfileProps>>`
  padding: ${rem(7.5)} ${rem(20)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ errors }) => (errors ? `${rem(1)} solid ${brand}` : 'none')};
  font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-weight: bold;
  border-radius: ${rem(10)};
  width: 100%;

  &::placeholder {
    color: ${({ color }) => color};
    opacity: 0.6;
  }
`;

export const ErrorMessage = styled.div`
  margin: ${rem(10)} auto;
  text-align: center;
  font-size: ${rem(12)};
  color: ${brand};
`;

export const Title = styled.div`
  margin: 0 auto ${rem(20)};
  display: flex;
  color: ${dark};
  box-sizing: border-box;
  font-weight: bold;
  font-size: ${rem(25)};
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  align-items: flex-start;
`;

export const ProfileInput = styled(Input)`
  margin: ${rem(5)} ${rem(20)};
  padding: ${rem(20)};
  border-radius: ${rem(8)};
  align-items: center;

  &:read-only {
    background: ${lightGrey};
    cursor: not-allowed;
  }
`;

export const Footer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding-bottom: ${rem(20)};
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: ${rem(10)};
  box-sizing: border-box;
  align-items: center;
  width: 100%;
`;

export const InputButton = styled(Button)`
  border: ${({ light, disabled }) =>
    light && !disabled && `${rem(1)} solid ${brand}`};
  margin: ${rem(14)};
`;

export const Submit = styled.input`
  margin: ${rem(14)};
  padding: ${rem(15)} ${rem(40)};
  display: flex;
  background: ${brand};
  border-radius: ${rem(50)};
  color: ${white};
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  justify-content: center;
`;

export default Profile;
