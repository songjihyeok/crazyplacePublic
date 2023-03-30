import React from 'react'
import styled from 'styled-components'

export default function login() {

     const onKakaoLogin = () => {
          window.Kakao.Auth.authorize({
               redirectUri: `${process.env.NEXT_PUBLIC_MAIN_URL}/kakao/auth`,
          });
     }


     return (
          <div>
               <MainTitleWrapper>
                    <h2>나의 소중한 공간을 등록하려면</h2>
                    <h2>로그인 해주세요</h2>
                    <StyledButtonWrapper onClick={onKakaoLogin}>
                         <img
                              src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                              width="222"
                              alt="카카오 로그인 버튼"
                         />
                    </StyledButtonWrapper>
               </MainTitleWrapper>
          </div>
     );
}


const MainTitleWrapper = styled.div`
     padding: 15px 30px;
`


const StyledButtonWrapper = styled.a`
     display: inline-block;
     height: 100%;
     :hover{
          cursor: pointer;
     }
`


