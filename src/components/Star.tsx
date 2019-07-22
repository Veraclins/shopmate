import React from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import { brand, white, brandOrange, lightGrey } from 'styles/colors';

interface StarProps {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  fraction?: number | string;
}

const Star: React.FunctionComponent<StarProps> = ({
  size = 'tiny',
  fraction = 5,
}) => {
  return (
    <StyledStar size={size}>
      <Svg size={size} viewBox="0 0 50 50">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: brandOrange }} />
            <stop offset={`${fraction}0%`} style={{ stopColor: brandOrange }} />
            <stop offset={`${fraction}0%`} style={{ stopColor: lightGrey }} />
            <stop offset="100%" style={{ stopColor: lightGrey }} />
          </linearGradient>
        </defs>
        <path
          style={{
            fill: `url(#gradient1)`,
          }}
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
      </Svg>
    </StyledStar>
  );
};
const StyledStar = styled.div<Partial<StarProps>>`
  padding: ${({ size }) =>
    size === 'tiny'
      ? rem(2)
      : size === 'small'
      ? rem(3)
      : size === 'medium'
      ? rem(4)
      : rem(5)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Svg = styled.svg<StarProps>`
  width: ${({ size }) =>
    size === 'tiny'
      ? rem(20)
      : size === 'small'
      ? rem(30)
      : size === 'medium'
      ? rem(50)
      : rem(70)};
`;

export default Star;
