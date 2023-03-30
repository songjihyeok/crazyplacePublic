import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styled from "styled-components"
import BottomNavigation from "../layout/MobileLayout"
import Script from 'next/script';
import { CookiesProvider } from 'react-cookie';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Modal from "@/Components/Modal"
import { modalState } from '../recoil/modalControl/atom/index';

declare global {
  interface Window {
    Kakao: any;
    kakao: any;
    instgrm: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {

  const kakaoInit = () => {
    if (window?.Kakao && !window?.Kakao?.isInitialized()) {
      window?.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
    }
  }

  return <RecoilRoot>
    <CookiesProvider>
      <Container >
        <Script
          src='https://developers.kakao.com/sdk/js/kakao.js'
          onLoad={kakaoInit}
        ></Script>
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8204e5d324683a64fdc233b7ad0ec647&autoload=false&libraries=services,clusterer"
          strategy="beforeInteractive"
        />

        <CenterLayout>
          <MainLayout>

            <Component {...pageProps} />
          </MainLayout>
          <BottomNavigation />
        </CenterLayout>
      </Container >
    </CookiesProvider>
  </RecoilRoot>
}

const MainLayout = styled.div`
    height: calc(100% - 80px);
    width: 100%;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`


const Container = styled.div`
  display: flex; 
  width: 100%;
  height: 100%;
  justify-content: center;
 
`
const CenterLayout = styled.div`
  max-width: 512px;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

 `
