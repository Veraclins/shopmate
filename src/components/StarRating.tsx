import React from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import {
  brand,
  white,
  brandYellow,
  brandOrange,
  dark,
  grey,
  lightGrey,
} from 'styles/colors';
import Star from './Star';

interface StarRatingProps {
  title?: string;
  submitText?: string;
  errors?: string;
}

const StarRating: React.FunctionComponent<StarRatingProps> = ({
  title,
  errors,
  submitText = 'Submit',
  children,
}) => {
  return (
    <StyledStarRating>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
    </StyledStarRating>
  );
};

const Container = styled.div`
  padding: 0 ${rem(10)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  color: ${({ color }) => (color ? color : 'inherit')};
  width: 100%;
`;

const StyledStarRating = styled.div<Partial<StarRatingProps>>`
  padding: ${rem(7.5)} ${rem(20)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: ${rem(10)};
  /* width: 100%; */

  &::placeholder {
    color: ${({ color }) => color};
    opacity: 0.6;
  }
`;

const Submit = styled.input`
  margin: ${rem(20)} auto;
  padding: ${rem(15)} ${rem(40)};
  display: flex;
  background: ${brand};
  border-radius: ${rem(50)};
  color: ${white};
  align-items: center;
  font-weight: bold;
  outline: none;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  margin: ${rem(10)} auto;
  text-align: center;
  font-size: ${rem(12)};
  color: ${brand};
`;

const Title = styled.div`
  margin: ${rem(20)} auto;
  display: flex;
  box-sizing: border-box;
  font-weight: bold;
  font-size: ${rem(25)};
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  align-items: center;
`;

export default StarRating;
