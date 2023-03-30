import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
     return (
          <StyledFullLayout>
                <CircularProgress size={60}/>
          </StyledFullLayout>
     );
}

const StyledFullLayout = styled.div`
    width: 100%;
    height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
