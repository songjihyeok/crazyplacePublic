import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { placeInterface } from "../type"
import styled from "styled-components"
import Grid from '@mui/material/Unstable_Grid2';
import { Divider } from '@mui/material';

export default function listItem({ element, onClick }: { element: placeInterface, onClick: (element: placeInterface) => void }) {
     return (
          <>
               <ListItem onClick={() => onClick(element)}>
                    <Grid container alignItems="center">
                         <Grid xs={12}>
                              <Title>{element.place_name}</Title>
                         </Grid>
                         <Grid xs={12} >
                              <ListItemText primary={element.road_address_name} />
                         </Grid>
                    </Grid>
               </ListItem>
               <Divider />
          </>

     );
}

const Title = styled.h2`
     margin: 5px 0;     
`


