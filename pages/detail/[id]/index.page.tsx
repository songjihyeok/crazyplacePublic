import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import Contents from "./contents"
import { useRouter } from "next/router"
import { getCookies, deleteCookie } from 'cookies-next';
import { GetServerSideProps } from "next"
import {placeType} from "../../../types/common"

export default function Detail({id}) {
     // const router = useRouter()
     // const query = router.query
     const userToken = getCookies()?.userToken
     const [loading, setLoading ] = useState<boolean>(true)
     const [detailResult, setDetailResult] = useState<placeType| null>(null)
     // console.log("pathname", router.pathname)

     useEffect(() => {
          const getDetailData = async () => {
               const result = await axios.post("/api/getPlaceDetail", {
                    Headers: {
                         Authorization: `Bearer ${userToken}`
                    },
                    body: {
                         id: id
                    }
               })
               if(result?.data?.success){
                    const gotPlaceDetail = result.data.body
                    setDetailResult(gotPlaceDetail)
                    setLoading(false)
               }else{
                    alert("데이터를 가져오는데 실패했습니다.")
                    setLoading(false)
               }
          }
          getDetailData()
     }, [])
     if(loading){
          return "loading"
     }
     
     return <DetailWrapper>
          <ImageWrapper>
               <StyledMainImage
                    src={"/images/food_image.jpeg"}>
               </StyledMainImage>
          </ImageWrapper>
          <Contents detailResult={detailResult}/>
     </DetailWrapper>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
     const { query } = context
     const { id } = query
     return {
          props: {
               id
          }
     }
}








const StyledMainImage = styled.img`
     height: 300px;
     width: 100%;
`


const DetailWrapper = styled.div`
     height: 100%;
     overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
     ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
     }
`

const ImageWrapper = styled.div`
          width: "100%";

`
