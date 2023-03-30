import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

const handler = async (
     req: NextApiRequest,
     res: any
) => {
     try {
          const query = req?.query?.query ?? ""

          const result = await axios.get("https://openapi.naver.com/v1/search/local.json", {
               params: {
                    query: query,
                    display: 5
               },
               headers: {
                    "X-Naver-Client-Id": "B1o3GfZASpWIe63MqVod",
                    "X-Naver-Client-Secret": "2oSlXLgHi6"
               }
          })
          const list = result?.data.items
          res.status(200).send({ data: list })
     }
     catch (error) {
          console.log(error)
     }


}

export default handler 