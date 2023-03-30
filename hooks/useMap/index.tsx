import { useEffect, useRef, useState } from 'react';

function useMap() {
     const [myLocation, setMyLocation] = useState<
          { latitude: string; longitude: string } | null
     >(null);
     const [isLoading, setIsLoading] = useState(true)

     useEffect(() => {
          // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
          const getGeoLocation = async () => {
               try {

                    if (navigator.geolocation) {
                         navigator.geolocation.getCurrentPosition((position) => {
                              setMyLocation({
                                   latitude: position?.coords?.latitude.toString(),
                                   longitude: position?.coords?.longitude.toString(),
                              });

                         })
                    }
               }
               catch (error) {
                    window.alert('위치 권한 설정 확인해주세요');
               }
          }
          getGeoLocation()
     }, []);

     useEffect(() => {

          const onLoadKakaoMap = () => {
               window.kakao.maps.load(function () {
                    const container = document.getElementById("map");
                    const center = new window.kakao.maps.LatLng(myLocation?.latitude, myLocation?.longitude)
                    const options = {
                         center: center
                    };
                    const map = new window.kakao.maps.Map(container, options);
                    const markerPosition = new window.kakao.maps.LatLng(myLocation?.latitude, myLocation?.longitude);
                    const marker = new window.kakao.maps.Marker({
                         position: markerPosition,
                    });
                    marker.setMap(map);
                    setIsLoading(false)
               });
          }
          if (myLocation) {
               onLoadKakaoMap()
          }
     }, [myLocation])

     return {
          isLoading,
          myLocation,
     };
}

export default useMap;