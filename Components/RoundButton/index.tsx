import React from 'react';
import styled from 'styled-components';
const ButtonWrap = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
`
const Button = styled.button`
     font-size: 18px;
     font-weight: 500;
     color: #fff;
     width: 140px;
     height: 50px;
     border-radius: 25px;
     background-color: #000;
     border: 1px solid #000;
     box-sizing: border-box;
     :hover{
          background-color: #fff;
          color: #000;
          transition: all .3s ease;
     }
`

const RoundButton = ({ buttonText, onClick, className, buttonStyle }: 
          { className?: string, buttonText: string, onClick?: () => void,
               buttonStyle?: Object
          }) => {
     return (
          <ButtonWrap className={className}>
               <Button onClick={onClick} style={buttonStyle}> {buttonText}</Button>
          </ButtonWrap>
     );
};

export default RoundButton;