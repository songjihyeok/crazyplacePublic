import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useCookies } from "react-cookie"
import styled from 'styled-components'
import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';

export default function auth() {
     const [code, setCode] = useState<null | string>(null);
     const router = useRouter()
     const [kakaoAccessToken, setKakaoAccessToken] = useState<null | string>(null)
     const REDIRECT_URI = process.env.NEXT_PUBLIC_MAIN_URL + "/mypage"

     useEffect(() => {
          const code = new URL(window.location.href).searchParams.get('code');
          setCode(code)
     }, []);

     const getUserData = async (accessToken: string | null) => {
          try {
               const data
                    = await axios({
                         url: `/api/getuserinfo`,
                         method: 'post',
                         data: {
                              access_token: accessToken,
                         }
                    });
               return data
          } catch (e) {
               console.log(e);
          }
     };


     const getToken = async (code: string | null) => {
          try {
               const {
                    data: { access_token },
               } = await axios({
                    url: `https://kauth.kakao.com/oauth/token`,
                    method: 'post',
                    params: {
                         grant_type: 'authorization_code',
                         client_id: process.env.NEXT_PUBLIC_KAKAO_RESTFUL_API_KEY,
                         REDIRECT_URI: REDIRECT_URI,
                         code: code,
                    },
               });

               return access_token;
          } catch (e) {
               console.log("error", e);
          }
     };

     useEffect(() => {

          const setAccessToken = (data) => {
               if (data.result) {
                    const accessToken = data.token
                    setCookie("userToken", accessToken)
                    router.push("/mypage")
               }
          }

          const getAndSetAccessToken = async () => {
               if (kakaoAccessToken) {
                    const { data } = await getUserData(kakaoAccessToken)
                    setAccessToken(data)
               }
          }

          getAndSetAccessToken()
     }, [kakaoAccessToken])




     useEffect(() => {
          const getKakaoAccessToken = async () => {
               const gotKakaoAccess_token = await getToken(code)
               setKakaoAccessToken(gotKakaoAccess_token)
          }

          if (code) {
               getKakaoAccessToken()
          }
     }, [code])




     return (
          <div>
               login
          </div>
     );
}

