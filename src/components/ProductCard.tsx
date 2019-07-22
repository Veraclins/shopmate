import React, { useState } from 'react';
import styled from 'styled-components';

import { dark } from 'styles/colors';
import { rem } from 'styles';
import Card from 'components/Card';
import Label from 'components/Label';
import Modal from 'components/Modal';
import Item from 'components/Item';
import { Product } from 'state/interfaces';
import { getImageUrl } from 'helpers';

interface ProductProps {
  product: Product;
}

const ProductCard: React.FunctionComponent<ProductProps> = ({ product }) => {
  const [modalOpen, showModal] = useState(false);
  return (
    <>
      <Card small onClick={() => showModal(true)}>
        <Image src={getImageUrl(product.thumbnail)} />
        <Name>{product.name}</Name>
        <Price>
          <Label value={`$${product.price}`} />
        </Price>
        <Description>{product.description.substring(0, 40)}...</Description>
      </Card>
      {modalOpen && (
        <Modal close={() => showModal(false)}>
          <Item id={product.product_id} close={() => showModal(false)} />
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

export default ProductCard;
