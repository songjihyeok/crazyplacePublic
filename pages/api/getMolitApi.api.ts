import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"



const handler = async (
     req: NextApiRequest,
     res: any
) => {
     const url = "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade"
     const LAWD_CD = req.query?.LAWD_CD ?? 11650
     const DEAL_YMD = req.query?.DEAL_YMD ?? 202205
     const key = 'Beovx/ZaM7OfGbg6iZ+06xFcFQSEdOQHVjYLQ6oaun/Nd7kcl9OdhAGIoHEtqq7z9ipubaB6aOYFYYW3OqHUzA==';
     const params = {
          serviceKey: key,
          LAWD_CD,
          // numOfRows : 200,
          DEAL_YMD,
     };


     // console.log(req)
     const getData = await axios.get(url, {
          params
     })

     res.status(200).send({ data: getData.data.response.body })
}

export default handler 