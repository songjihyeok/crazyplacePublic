import styled from "styled-components"
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { parseCookies } from "../../helpers"
import { getCookies, deleteCookie } from 'cookies-next';
import { useRouter } from "next/router";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { NextResponse } from 'next/server'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Login from "./login/index.page"
import CircularProgress from '@mui/material/CircularProgress';

export default function Mypage({ data }) {
     const [loading, setLoading] = useState(true);
     const router = useRouter()
     const userToken = getCookies()?.userToken


     const onLogOutHandler = () => {
          deleteCookie('userToken');
          router.push("/mypage/login")
     }

     const onAdmit = () => {
          router.push("/register")
     }


     useEffect(() => {
          if (!userToken) {
               router.push("/mypage/login")
          } else {
               setLoading(false)
          }
     }, [])

     if (loading) {
          return <CircularProgress />
     }

     return <MainTitleWrapper>
          <h2>나의 소중한 공간에 오신 걸 환영합니다.</h2>
          <h2>공간을 등록하고 공유하세요</h2>
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
               <nav aria-label="main mailbox folders">
                    <List>
                         <ListItem disablePadding>
                              <ListItemButton onClick={onAdmit}>
                                   <ListItemIcon>
                                        <AddIcon />
                                   </ListItemIcon>
                                   <ListItemText primary="등록하러 가기" />
                              </ListItemButton>
                         </ListItem>
                         <ListItem disablePadding>
                              <ListItemButton onClick={onLogOutHandler}>
                                   <ListItemIcon>
                                        <LogoutIcon />

                                   </ListItemIcon>
                                   <ListItemText primary="로그아웃" />
                              </ListItemButton>
                         </ListItem>
                    </List>
               </nav>
          </Box>
     </MainTitleWrapper>
}


const MainTitleWrapper = styled.div`
     padding: 15px 30px;
`