import { Row, Col, Typography, Button } from "antd";
import styled from "styled-components";
import Image from "next/image";
import Link from 'next/link'

import { useRouter } from "next/router";




const { Title, Text, Paragraph } = Typography;

export default function PlaceCard({ url, data }: { url: string, data: any }) {
     const gotData = data.data
     const router = useRouter()
     const onClickDetail = () => {
          router.push(`/`);
     }

     return (

          <NFTCardWrapper >
               <Link href={url}>
                    <Row gutter={[15, 0]} style={{ height: "100%" }}>
                         <Col
                              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 180 }}
                         >
                              <ImageWrapper>
                                   <img
                                        style={{ height: 160, width: 160, borderRadius: 15 }}
                                        src={"/images/food_image.jpeg"}>
                                   </img>
                              </ImageWrapper>
                         </Col>
                         <RightCardCol >
                              <MainTitle ellipsis={{ rows: 2 }}>{gotData?.placeName}</MainTitle>
                              <StyledParagraph ellipsis={{ rows: 2 }}>
                                   {gotData?.placeDescription}
                              </StyledParagraph>
                              <CategoryRow>
                                   <Col span={24}>
                                        <MiddleText ellipsis={true}>장소 이름: {gotData?.placeInfo?.place_name}</MiddleText>
                                   </Col>
                                   <Col span={24}>
                                        <MiddleText ellipsis={true}>장소 주소: {gotData?.placeInfo?.road_address_name}</MiddleText>
                                   </Col>
                              </CategoryRow>
                         </RightCardCol>
                    </Row>
               </Link>
          </NFTCardWrapper>
     );
}

// 함수로 작성한 styl 
const ImageWrapper = styled.div(({ theme }) => {
     return {
          position: "static",
          width: "100%",
          display: "flex",
          justifyContent: "left"
     }
})


const StyledStarWrapper = styled.div(({ theme }) => {
     return {
          position: "absolute",
          width: 30,
          height: 37,
          backgroundColor: "#218ce0",
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px 0 20px 0"
     }
})



const LinkWrappCol = styled(Col)(({ theme }) => {
     return {
          ["&&"]: {
               display: "flex",
               justifyContent: "flex-end",
          },
     };
});

const BottomCardRow = styled(Row)(({ theme }) => {
     return {
          alignItems: "center",
          marginTop: 5,
     };
});

const StyledParagraph = styled(Paragraph)(({ theme }) => {
     return {
          ["&&"]: {
               height: 28,
               fontSize: 11,
               lineHeight: "1.3em",
               marginTop: 5,
               color: "#777777",
          },
     };
});

const CategoryRow = styled(Row)(({ theme }) => {
     return {
          width: "100%",
     };
});

const MiddleText = styled(Text)(({ theme }) => {
     return {
          ["&&"]: {
               fontSize: 8,
               textOverflow: "ellipsis",
               whiteSpace: "nowrap",
               textAlign: "left",
               color: "#777777",
          },
     };
});

const RightCardCol = styled(Col)`
          padding: 0;
          width: calc(100% - 180px);
`

const MainTitle = styled(Title)(({ theme }) => {
     return {
          ["&&"]: {
               fontSize: 21,
               height: 51.6,
               marginBottom: 0,
          },
     };
});

const LinkButton = styled.div(({ theme }) => {
     return {
          border: "solid 1px #ccc",
          width: 16,
          height: 16,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
     };
});

const LinkButtonsRow = styled(Row)(({ theme }) => {
     return {
          ["&&"]: {
               display: "flex",
               alignItems: "center",
          },
     };
});

const SourceLink = styled(Button)(({ theme }) => {
     return {
          ["&&"]: {
               border: "solid 1px #218ce0",
               color: "#218ce0",
               fontWeight: 700,
               fontSize: 6,
               padding: 7,
               borderRadius: 20,
          },
     };
});

const NFTCardWrapper = styled.div`
          height: auto;
          padding: 15px;
          cursor: pointer;
          background: white;
          border-radius: 15px;
          position: static;
          margin: 15px;
          box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.35);
`

const CardImage = styled(Image)(({ theme }) => {
     return {
          ["&&"]: {
               // width: "100%",
               borderRadius: 15
          },
     };
});
