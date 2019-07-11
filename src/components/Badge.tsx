import React from 'react';
import styled from 'styled-components';

import { rem } from 'styles';

interface BadgeProps {
  theme: any;
  size?: number;
  value?: number;
}

const Badge: React.FunctionComponent<BadgeProps> = ({
  theme,
  size,
  value,
  children,
}) => (
  <Container theme={theme}>
    {children}
    {value !== 0 && (
      <Overlay theme={theme} size={size}>
        {value}
      </Overlay>
    )}
  </Container>
);

const Container = styled.div<Partial<BadgeProps>>`
  display: flex;
  align-items: center;
  position: relative;
  font-family: Montserrat, 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  font-size: ${rem(20)};
  max-height: ${rem(30)};
  color: ${({ color }) => color};
`;

const Overlay = styled.div<BadgeProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  font-size: ${rem(14)};
  align-items: center;
  background: ${({ theme }) => theme.badgeBackground};
  top: -46%;
  left: 45%;
  width: ${({ size }) => rem(size || 25)};
  height: ${({ size }) => rem(size || 25)};
  color: ${({ theme }) => theme.badgeColor};
  border-radius: 50%;
`;

export default Badge;
