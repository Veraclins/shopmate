import React, { useState } from 'react';
import styled from 'styled-components';

import Star from 'components/Star';
import { useDispatch } from 'react-redux';
import { rateProduct } from 'state/product';

interface StarRatingProps {
  size?: 'small' | 'medium' | 'large';
  rating?: number;
  numberOfStars?: number;
  rate?: boolean;
}

const StarRating: React.FunctionComponent<StarRatingProps> = ({
  rating = 0,
  size,
  numberOfStars = 5,
  rate,
}) => {
  let total = rating;
  let fill = 0;
  let stars: number[] = [];
  for (let index = 1; index <= numberOfStars; index++) {
    stars = [...stars, index];
  }

  const [hoveredStar, setHoveredStar] = useState(0);
  const [ratingValue, setRatingValue] = useState(rating);
  const dispatch = useDispatch();
  if (rate && ratingValue !== rating) dispatch(rateProduct(ratingValue));
  return (
    <StyledStarRating>
      {stars.map((star, index) => {
        if (total > 1) {
          fill = 100;
          total--;
        } else {
          fill = total * 100;
          total--;
        }
        return (
          <Star
            rate={rate}
            size={size}
            key={index}
            id={Math.random()
              .toString(36)
              .substring(2, 12)}
            offset={fill}
            hovered={hoveredStar >= index + 1}
            onMouseEnter={() => setHoveredStar(index + 1)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() => setRatingValue(index + 1)}
          />
        );
      })}
    </StyledStarRating>
  );
};

const StyledStarRating = styled.div<Partial<StarRatingProps>>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StarRating;
