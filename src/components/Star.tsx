import React from 'react';
import styled from 'styled-components';
import { rem } from 'styles';
import { brandGreen, brandOrange, lightGrey } from 'styles/colors';

interface StarProps {
  size?: 'small' | 'medium' | 'large';
  offset?: number | string;
  id: number | string;
  rate?: boolean;
  hovered?: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Star: React.FunctionComponent<StarProps> = ({
  size = 'medium',
  offset = 0,
  id,
  rate,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  if (offset < 0) offset = 0;
  return (
    <StyledStar
      size={size}
      rate={rate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Svg size={size} viewBox="0 0 50 50">
        <defs>
          <linearGradient id={`star${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: brandOrange }} />
            <stop offset={`${offset}%`} style={{ stopColor: brandOrange }} />
            <stop offset={`${offset}%`} style={{ stopColor: lightGrey }} />
            <stop offset="100%" style={{ stopColor: lightGrey }} />
          </linearGradient>
        </defs>
        <path
          style={{
            fill: hovered ? brandGreen : `url(#star${id})`,
          }}
          d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
        />
      </Svg>
    </StyledStar>
  );
};
const StyledStar = styled.div<Partial<StarProps>>`
  padding: ${({ size }) =>
    size === 'small' ? rem(1) : size === 'medium' ? rem(2) : rem(3)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  pointer-events: ${({ rate }) => !rate && 'none'};
  cursor: pointer;
  justify-content: center;
`;

const Svg = styled.svg<Partial<StarProps>>`
  width: ${({ size }) =>
    size === 'small' ? rem(15) : size === 'medium' ? rem(30) : rem(60)};
`;

export default Star;
