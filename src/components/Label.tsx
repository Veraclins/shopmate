import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';
import { brand, white } from 'styles/colors';

interface LabelProps {
  color?: string;
  plain?: boolean;
  value: string | number;
}

const Label: React.FunctionComponent<LabelProps> = ({
  color,
  value,
  plain,
}) => (
  <StyledLabel color={color} plain={plain}>
    {value}
  </StyledLabel>
);

const StyledLabel = styled.div<Partial<LabelProps>>`
  margin: ${rem(5)} auto;
  padding: ${rem(5)};
  background: ${({ color, plain }) =>
    plain ? 'transparent' : color ? color : brand};
  border-radius: ${rem(5)};
  color: ${({ plain }) => (plain ? brand : white)};
`;

export default Label;
