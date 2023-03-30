import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

interface modal {
     visible?: boolean
}

const ModalBackground = styled.div<modal>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${props => props.visible ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    width: calc(100vw + 10px);
    height: calc(100vh + 10px);
    background-color: rgba(0,0,0,0.6);
    z-index: 999999;
`
const ModalBox = styled.div`
    max-width: 512px;
    width: 90%;
    min-height: 250px;
    overflow-y: hidden;
    border-radius: 20px;
    background-color: #fff;
    padding: 30px 30px;
    @media (max-width: 500px) {
          padding: 15px;
          width: 95%;
    }
`

const Modal = ({ children, visible }: { children: ReactNode, visible?: boolean }) => {

     useEffect(() => {
          const makeScrollHidden = () => {
               if (visible) {
                    document.body.classList.add('body-style');
                    document.body.style.overflow = 'hidden';
               } else {
                    document.body.style.overflow = "auto";
                    document.body.classList.remove('body-style');
               }
          }
          makeScrollHidden()
     }, [visible])



     return (
          <ModalBackground visible={visible} >
               <ModalBox>
                    {children}
               </ModalBox>
          </ModalBackground>
     );
};

export default Modal;