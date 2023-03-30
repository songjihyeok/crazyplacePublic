import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Box from '@mui/material/Box';
import { useRouter } from 'next/router'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import { routesType } from './types';

const BottomNavigationComponent = () => {
     const router = useRouter()
     const currentRoute = router.asPath.slice(1, router.asPath.length)
     const [value, setValue] = useState(0);


     const routeChangeHandler = (newValue: routesType) => {
          router.push(newValue)
     }


     return <BottomLayout>
          <Box sx={{ width: "100%" }} >
               <StyledBottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                         routeChangeHandler(newValue)
                    }}
               >
                    <BottomNavigationAction label="리스트" icon={<FormatListBulletedIcon />} value={routesType.list} />
                    <BottomNavigationAction label="지도" icon={<MapIcon />} value={routesType.map} />
                    <BottomNavigationAction label="내 정보" icon={<PersonIcon />} value={routesType.add} />
               </StyledBottomNavigation>
          </Box>
     </BottomLayout>
}

export default BottomNavigationComponent;

const StyledBottomNavigation = styled(BottomNavigation)`
     height: 79px;
     .MuiBottomNavigationAction-label{
          display:flex;
          
          align-items: center;
     }
`

const BottomLayout = styled.div`
     position:absolute;
     z-index: 1000;
     bottom: 0;
     height: 79px;
     width: 100%;
     display: flex;
     align-items: center;
     justify-content:center;
     box-shadow: rgb(0 0 0 / 24%) 0px -10px 10px -10px;
    border-top: 1px solid rgb(231, 231, 231);

`
