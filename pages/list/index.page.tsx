import { useEffect, useState } from 'react';
import { Row, Col, Image } from "antd"
import Card from "../../Components/Card"
import styled from "styled-components"
import axios from "axios"
import { getCookies, deleteCookie } from 'cookies-next';
import Loading from '@/Components/Loading';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoil/modalControl/atom/index';


const PlaceList = () => {
     const [placesList, setPlacesList] = useState([])
     const [isLoading, setIsLoading] = useState(true)
     const setModalState = useSetRecoilState(modalState)
     const userToken = getCookies()?.userToken

     useEffect(() => {
          const getPlaceList = async () => {
               try {
                    const gotPlaceListResult = await axios.get("api/getPlaceList", {
                         headers: {
                              Authorization: `Bearer ${userToken}`
                         }
                    })
                    setIsLoading(false)
                    const gotPlaceList = gotPlaceListResult.data
                    setPlacesList(gotPlaceList)
               }
               catch (error) {
                    if (error) {
                         setModalState(true)
                         setIsLoading(false)
                    }
               }
          }
          getPlaceList()
     }, [])



     if (isLoading) {
          return <Loading />
     }

     return <Row>
          <Col span={24}>
               <CardsWrapper>
                    {placesList.map((element, index) => {
                         const dataId = element?.id
                         return <Card key={index} url={`/detail/${dataId}`} data={element}></Card>
                    })}

               </CardsWrapper>
          </Col>
     </Row>
}

export default PlaceList;


const CardsWrapper = styled.div`
     overflow-y: scroll;
     height: 100%;
     padding: 15px 15px 100px 15px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
     ::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
     }
`