import React, { useEffect } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import axios from "axios"
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { InstagramEmbed } from 'react-social-media-embed';
// import DetailMap from "./map"
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

import Link from 'next/link'
import { placeType } from '../../../../types/common/index';

export default function Contents({ detailResult }: { detailResult: placeType }) {


     // const findingRoute = (webService: string) => {
     //      if (webService === "naver") {
     //           const naverMapUrl = `http://m.map.naver.com/route.nhn?menu=route&sx=${startLongitude}&sy=${startLatitude}&ex=127.0276368&ey=37.4979502&pathType=0&showMap=true`
     //           console.log("naver", naverMapUrl)
     //           window.location.href = naverMapUrl
     //      }
     // }

     return (
          <Box sx={{ width: '100%', bgcolor: "#f5f5f5", padding: "15px" }}>
               <Typography gutterBottom fontSize={20}>
                    제목
               </Typography>
               <Paper sx={{ p: 1, marginBottom: 2, textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="span" >
                         {detailResult?.reviewTitle}
                    </Typography>
               </Paper>
               <Typography gutterBottom fontSize={20}>
                    내용
               </Typography>
               <Paper sx={{ p: 2, marginBottom: 2, minHeight: 150 }}>
                    <Typography fontSize={16}>
                         {detailResult?.reviewDescription}
                    </Typography>
               </Paper>

               {/* <Box sx={{ m: 2 }}>
                    <Typography gutterBottom variant="body1">
                         태그
                    </Typography>
                    <Stack direction="row" spacing={1}>
                         <Chip label="맛집" />
                         <Chip label="국밥" />
                         <Chip label="순대국밥" />
                         <Chip label="행복" />
                    </Stack>
               </Box> */}
               <Typography gutterBottom variant="body1" fontSize={20}>
                    인스타그램
               </Typography>
               <InstagramEmbed url={detailResult?.instagramUrl ?? ""} width="100%" />

               <Typography gutterBottom variant="body1">
                    지도
               </Typography>
               <Paper sx={{ height: 50 }}>
                    <Link href={detailResult.place_url} target="_blank">
                         <Grid container style={{ height: "100%" }}>
                              <Grid item xs={3}
                                   display="flex"
                                   alignItems="center"
                                   justifyContent="center"
                              ><RoomOutlinedIcon
                                        fontSize={"medium"}
                                   /></Grid >
                              <Grid item xs={9}
                                   display="flex"
                                   alignItems="center"
                                   justifyContent="center"
                              >
                                   <Typography>
                                        {detailResult.address_name}
                                   </Typography>
                              </Grid>
                         </Grid>
                    </Link>
                    {/* <DetailMap /> */}

                    {/* <Button onClick={() => findingMap("naver")}>네이버 지도에서 보기</Button> */}
               </Paper>
          </Box>
     );
}


