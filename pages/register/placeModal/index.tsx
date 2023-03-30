import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Modal from "../../../Components/Modal"
import ModalTitleCloseButton from '../../../Components/ModalTitleCloseButton';
import { Row, Col } from "antd"
import RoundButton from '../../../Components/RoundButton';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from "./listItem"
import { placeInterface } from "./type"


export default function PlaceModal({ visible, setVisible, setPlaceInfo }: { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>, setPlaceInfo: React.Dispatch<any> }) {
     const [query, setQuery] = useState("")
     const [kakaoPlace, setKakaoPlace] = useState(null)
     const [placeList, setPlaceList] = useState([])

     const onCloseModal = () => {
          setVisible(false)
          setQuery("")
     }


     const onSearch = useCallback(async (e) => {
          try {
               const value = e.target.value
               setQuery(value)
               debouncedFunction(value)
          }
          catch (error) {
               console.log(error)
          }
     }, [])

     function debounce(func, timeout = 300) {
          let timer;
          return (...args) => {
               clearTimeout(timer);
               timer = setTimeout(() => {
                    func.apply(this, args);
               }, timeout);
          };
     }

     const callback = function (result, status) {
          if (status === "OK") {
               setPlaceList(result)
          } else {
               setPlaceList([])
          }
     };
     // 받아온 리스트로 place 리스트 스테잇 변경 로직

     const debouncedFunction = useCallback(
          debounce(async value => {
               try {
                    console.log("kakao", kakaoPlace)
                    if (kakaoPlace) {
                         kakaoPlace.keywordSearch(value, callback);
                    }
               } catch (e) {
                    window.alert("가져오는데 실패 했습니다.")
               }
               // 3. 0.5초안에 호출된 가장 마지막 api만 서버로 호출합니다.
          }, 500),
          [kakaoPlace],
     );

     const onChangeHandler = (e) => {
          const value = e.target.value
          setQuery(value)
     }

     const settingPlaceInfo = (element: placeInterface) => {
          setPlaceInfo(element)
          setVisible(false)
          setQuery("")
     }

     useEffect(() => {
          const onLoadKakaoPlace = () => {
               window.kakao.maps.load(function () {
                    const places = new window.kakao.maps.services.Places();
                    setKakaoPlace(places)
               })
          }
          onLoadKakaoPlace()
     }, [])



     return (
          <Modal visible={visible}>
               <ModalTitleCloseButton
                    titleText="장소 등록"
                    onClick={onCloseModal}
               />
               <SearchWrapperRow>
                    <Col span={24} >
                         <TextField
                              id="outlined-multiline-flexible"
                              label="장소 이름"
                              multiline
                              style={{ width: "100%" }}
                              maxRows={4}
                              onChange={onSearch}
                              value={query}
                         />
                    </Col>
                    {/* <Col span={4} offset={2}>
                         <RoundButton buttonText={"검색"} onClick={onSearch} />
                    </Col> */}
               </SearchWrapperRow>
               <Row>
                    <Col span={24}>
                         <nav aria-label="main mailbox folders">
                              <List style={{ height: 300, marginTop: 15, overflowY: "scroll" }}>

                                   {placeList.map((element: any, index: number) => {
                                        return <ListItem
                                             key={index}
                                             onClick={settingPlaceInfo}
                                             element={element}
                                        />
                                   })}
                              </List>
                         </nav>
                    </Col>
               </Row>
          </Modal>
     );
}
const SearchWrapperRow = styled(Row)`
     align-items: center;
     margin: 30px 0 0 0;
`

