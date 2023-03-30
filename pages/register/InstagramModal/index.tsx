import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Modal from "../../../Components/Modal"
import ModalTitleCloseButton from '../../../Components/ModalTitleCloseButton';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material"
import RoundButton from '../../../Components/RoundButton';
import { InstagramEmbed } from 'react-social-media-embed';


export default function InstagramModal(
     { visible, setVisible, instagramUrl, setInstagramUrl }:
          {
               visible: boolean,
               setVisible: React.Dispatch<React.SetStateAction<boolean>>
               instagramUrl: string,
               setInstagramUrl: React.Dispatch<React.SetStateAction<string>>
          }) {
     const [isSearch, setIsSearch] = useState(true);
     const instaRef = useRef(null)
     const onCloseModal = () => {
          setVisible(false)
     }

     const reset = () => {
          setIsSearch(false)
          setInstagramUrl("")
     }


     //"https://www.instagram.com/p/CnYrZQLyy8f"
     return (
          <Modal visible={visible}>
               <ModalTitleCloseButton
                    titleText="인스타그램 url 등록"
                    onClick={onCloseModal}
               />
               <FilteringFormWrap>
                    <FormControl fullWidth sx={{ m: 1 }}>
                         <TextField
                              id="outlined-multiline-flexible"
                              label="인스타그램 url"
                              multiline
                              maxRows={4}
                              value={instagramUrl}
                              onChange={(e) => setInstagramUrl(e.target.value)}
                         />
                    </FormControl>
                    {/* <div id="instagram-post"></div> */}
                    {instagramUrl && isSearch ? <div >
                         <EmbededUrlWrapper ref={instaRef}>
                              <InstagramEmbed
                                   url={instagramUrl}
                                   data-width={350}
                              />
                         </EmbededUrlWrapper>
                         <Grid container>
                              <Grid item xs={6}  >
                                   <StyledRoundButton as={RoundButton}
                                        className="addMargin"
                                        onClick={() => reset()}
                                        buttonText={"초기화"}
                                        buttonStyle={{ backgroundColor: "white", color: "black" }}
                                   />
                              </Grid>
                              <Grid item xs={6}>
                                   <StyledRoundButton as={RoundButton}
                                        className="addMargin"
                                        onClick={() => setVisible(false)}
                                        buttonText={"확인"}
                                   />

                              </Grid>
                         </Grid>
                    </div> : <StyledRoundButton as={RoundButton}
                         onClick={() => setIsSearch(true)}
                         className="addMargin"
                         buttonText={"등록"}
                    />}


               </FilteringFormWrap>
          </Modal>
     );
}

const StyledRoundButton = styled.div`
          margin-top: 15px;
`

const EmbededUrlWrapper = styled.div`
      max-height: 500px;
     overflow: scroll;
     &&&& .Header{
          display:none;
     }
`

const FilteringFormWrap = styled.div`
     /* background-color: #f8f8f8; */
     padding: 15px;
     display: flex;
     width: 100%;
     flex-direction: column;
     height: 100%;
     justify-content: space-between;
 
`
