import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios"
import InstagramIcon from '@mui/icons-material/Instagram';
import PlaceIcon from '@mui/icons-material/Place';
import InstagramModal from "./InstagramModal"
import PlaceModal from "./placeModal"
import RoundButton from '@/Components/RoundButton';
import { getCookies, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import UploadImage from './UploadImage';

export default function Register() {
     const userToken = getCookies()?.userToken
     const router = useRouter()
     const [instagramVisible, setInstagramVisible] = useState(false)
     const [placeVisible, setPlaceVisible] = useState(false)
     const [reviewTitle, setReviewTitle] = useState("")
     const [reviewDescription, setReviewDescription] = useState("")
     const [instagramUrl, setInstagramUrl] = useState<string>("");
     const [placeInfo, setPlaceInfo] = useState(null)
     const onRegisterInstagram = () => {
          setInstagramVisible(true)
     }

     const onRegisterPlace = () => {
          setPlaceVisible(true)
     }

     const onSubmit = async () => {
          try {
               const data = {
                    id: placeInfo.id,
                    reviewTitle,
                    reviewDescription,
                    placeInfo,
                    instagramUrl
               }
               const submitResult = await axios.post("api/upload", {
                    Headers: {
                         Authorization: `Bearer ${userToken}`
                    },
                    body: {
                         data
                    }
               })


               alert("등록되었습니다")
               router.push("/list")
          }
          catch (err) {
               console.log(err)
          }
     }



     return (
          <RegisterWrapper>
               <div>
                    <h2>등록하기</h2>
                    <FormControl sx={{ p: 1, minWidth: 250 }}>
                         <TextField
                              id="outlined-multiline-flexible"
                              label="리뷰 제목"
                              multiline
                              maxRows={4}
                              onChange={(e) => setReviewTitle(e.target.value)}
                         />
                    </FormControl>
                    <FormControl sx={{ p: 1 }} fullWidth>
                         <TextField
                              id="outlined-multiline-flexible"
                              label="리뷰 내용"
                              multiline
                              maxRows={4}
                              onChange={(e) => setReviewDescription(e.target.value)}
                         />
                    </FormControl>

                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                         <nav aria-label="main mailbox folders">
                              <List>
                                   <ListItem >
                                        <ListItemButton onClick={onRegisterInstagram}>
                                             <ListItemIcon>
                                                  <InstagramIcon />
                                             </ListItemIcon>
                                             <ListItemText primary="인스타그램 url 등록" />
                                        </ListItemButton>

                                   </ListItem>
                                   <ListItem>
                                        {!instagramVisible ? <Typography>{instagramUrl}</Typography> : null}
                                   </ListItem>
                                   <ListItem >
                                        <ListItemButton onClick={onRegisterPlace}>
                                             <ListItemIcon>
                                                  <PlaceIcon />
                                             </ListItemIcon>
                                             <ListItemText primary="장소 위치 등록" />
                                        </ListItemButton>
                                   </ListItem>
                                   <ListItem >
                                        {!placeVisible ? <Typography>{placeInfo?.place_name}</Typography> : null}
                                   </ListItem>
                                   <ListItem>
                                        <UploadImage />
                                   </ListItem>
                              </List>
                         </nav>
                    </Box>
                    <InstagramModal
                         visible={instagramVisible}
                         setVisible={setInstagramVisible}
                         instagramUrl={instagramUrl}
                         setInstagramUrl={setInstagramUrl}
                    ></InstagramModal>
                    <PlaceModal
                         setPlaceInfo={setPlaceInfo}
                         visible={placeVisible}
                         setVisible={setPlaceVisible}
                    ></PlaceModal>
               </div>
               <div>
                    <RoundButton buttonStyle={{ marginBottom: 30 }} buttonText={"등록하기"} onClick={onSubmit} />

               </div>

          </RegisterWrapper>
     );
}

const RegisterWrapper = styled.div`
     padding: 30px 15px;
     height: 100%;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
`