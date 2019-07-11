import React, { useState } from 'react';
import styled from 'styled-components';

import { dark, brand } from 'styles/colors';
import { rem } from 'styles';
import Card from 'components/Card';
import Label from 'components/Label';
import Modal from 'components/Modal';
import Item from 'components/Item';
import { Product } from 'state/interfaces';
import config from 'config';

interface ProductProps {
  product: Product;
}

const ProductCard: React.FunctionComponent<ProductProps> = ({ product }) => {
  const [modalOpen, showModal] = useState(false);
  const imageUrl = `${config.BASE_URL}/images/products/${product.thumbnail}`;
  return (
    <>
      <Card small onClick={() => showModal(true)}>
        <Image src={imageUrl} />
        <Name>{product.name}</Name>
        <Price>
          <OldPrice>£{product.price}</OldPrice>
          <Label value={`£${product.discounted_price}`} />
        </Price>
        <Description>{product.description.substring(0, 70)}...</Description>
      </Card>
      {modalOpen && (
        <Modal close={() => showModal(false)}>
          <Item id={product.product_id} />
        </Modal>
      )}
    </>
  );
};

const Name = styled.div`
  margin: ${rem(20)} auto;
  display: flex;
  box-sizing: border-box;
  font-weight: bold;
  color: ${dark};
  align-items: center;
`;

const Description = styled.div`
  text-align: center;
`;

const Image = styled.img`
  text-align: center;
  margin: 0 auto;
`;

const Price = styled.div`
  display: flex;
  text-align: center;
`;

const OldPrice = styled.div`
  text-decoration: line-through;
  padding: ${rem(5)};
  margin: ${rem(5)} auto;
  color: ${brand};
  text-align: center;
`;

export default ProductCard;
