import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

import { white, dark } from 'styles/colors';
import { rem } from 'styles';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  small?: boolean;
  close: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  small,
  close,
}) => {
  return ReactDom.createPortal(
    <StyledModal small={small}>
      <Head>
        <CloseButton onClick={close}>
          <FaTimes />
        </CloseButton>
      </Head>
      {children}
    </StyledModal>,
    document.body
  );
};

const StyledModal = styled.div<Partial<ModalProps>>`
  z-index: 5;
  text-align: center;
  padding: ${rem(14)};
  background: ${white};
  width: ${({ small }) => (small ? rem(500) : '100%')};
  max-width: ${rem(1000)};
  position: fixed;
  left: 50%;
  top: 50%;
  overflow-y: scroll;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  display: flex;
  max-height: 100%;
  box-shadow: 0 ${rem(20)} ${rem(60)} ${rem(-6)} ${dark};
  flex-direction: column;
  justify-content: flex-start;

  @media screen and (max-width: ${rem(480)}) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  width: 100%;
`;

const CloseButton = styled.span`
  padding: ${rem(2)};
  cursor: pointer;
  vertical-align: center;
  font-size: ${rem(30)};
`;

export default Modal;
