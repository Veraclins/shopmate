/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import React from 'react';
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  ReactStripeElements,
} from 'react-stripe-elements';
import styled from 'styled-components';
import { rem } from 'styles';
import { brand, lightGrey, white } from 'styles/colors';

const createOptions = (fontSize: string, padding?: string) => ({
  style: {
    base: {
      fontSize,
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4',
      },
      ...(padding ? { padding } : {}),
    },
    invalid: {
      color: `${brand}`,
    },
  },
});

const StripeElement: React.FunctionComponent<
  ReactStripeElements.InjectedStripeProps & { fontSize: string }
> = ({ fontSize }) => (
  <>
    <CardLabel>
      Card number
      <CardNumberElement {...createOptions(fontSize)} />
    </CardLabel>
    <CardLabel>
      Expiry date
      <CardExpiryElement {...createOptions(fontSize)} />
    </CardLabel>
    <CardLabel>
      Security code (CVC)
      <CardCVCElement {...createOptions(fontSize)} />
    </CardLabel>
  </>
);

const CardLabel = styled.label`
  padding: ${rem(10)};
  color: ${({ color }) => (color ? color : 'inherit')};
  box-sizing: border-box;
  text-align: left;
  min-width: ${rem(300)};

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
  }
  > .StripeElement {
    margin: ${rem(10)} auto;
    padding: ${rem(10)} ${rem(20)};
    box-sizing: border-box;
    background: ${white};
    border-radius: ${rem(10)};
    outline: none;
    font-family: 'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
    box-shadow: 0 ${rem(2)} ${rem(6)} ${rem(0)} ${lightGrey};
    text-align: center;
    width: 100%;
  }
`;

export default StripeElement;
