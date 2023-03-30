import { MyLocation } from "@mui/icons-material";
import { useEffect } from "react"
import styled from "styled-components"
import useMap from '../../hooks/useMap';
import Loading from "@/Components/Loading"

const Map = () => {
  const { isLoading, myLocation } = useMap()

  return <>
    {isLoading ? <Loading/> : null}
    <MapBox id="map" ></MapBox>
  </>
}

const MapBox = styled.div`
  width: 100%;
  height: 100%;
`;


export default Map;

