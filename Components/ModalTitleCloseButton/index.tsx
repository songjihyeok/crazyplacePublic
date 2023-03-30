import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

const Title = styled.h3`
     display: flex;
     align-items: center;
     justify-content: space-between;
     font-size: 24px;
     font-weight: 600;
     border-bottom: 1px solid #000;
     padding-bottom: 20px;
     margin-top: 0px;
     margin-bottom: 0px;
     @media (max-width: 800px) {
          padding-bottom: 15px;
     }
}

`
const ModalTitleCloseButton = ({ titleText, onClick }: { titleText: string, onClick?: () => void }) => {
     return (
          <Title>
               {titleText}
               <div onClick={onClick}>
                    <CloseIcon />
               </div>
          </Title >
     );
};

export default ModalTitleCloseButton;