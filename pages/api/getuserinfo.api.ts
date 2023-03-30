// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../firebaseConfig'
import axios from "axios"
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore/lite';
import randToken from 'rand-token'
import jwt from "jsonwebtoken";
import secret from '../../configs/secretkey'

const secretKey = secret.secretKey
const options = secret.option
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const handler = async (
  req: NextApiRequest,
  res: any
) => {
  const { access_token } = req.body;
  const getUserData = async () => {
    try {
      const data = await axios({
        url: "https://kapi.kakao.com/v2/user/me",
        method: "get",
        params: {
          secure_resource: true,
          property_key: ["kakao_account.email", "kakao_account.ci"],
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      const userId = data?.data?.id ?? null
      return userId
    }
    catch (err) {
      // console.log("error", err)
    }
  }



  const userId = await getUserData()
  if (!userId) {
    res.status(400).json({ result: false })
    return
  }

  const userIdInFirebaseDB = await getUserInFirebaseDB(userId)
  const firebaseUserId = await checkUser(userIdInFirebaseDB, userId)
  const gotJWTToken = await createJWTToken(firebaseUserId)

  if (!gotJWTToken.result) {
    res.status(400).json(gotJWTToken)
    return
  }

  res.status(200).json(gotJWTToken)
}


const checkUser = async (userIdInFirebaseDB, userId) => {
  if (userIdInFirebaseDB.length === 0) {
    const usersAddRef = await addDoc(collection(db, "users"), {
      userId
    });
    return usersAddRef.id
  } else {
    const currentUserRef = userIdInFirebaseDB[0]
    return currentUserRef
  }
}



const getFindResult = (querySnapshot: any) => {
  let result: any[] = []
  querySnapshot.forEach((doc: any) => {
    result.push(doc.id)
  });
  return result
}

const getUserInFirebaseDB = async (userId) => {
  const userRef = collection(db, "users")
  const q = query(userRef, where("userId", "==", userId))
  const querySnapshot = await getDocs(q);
  const findResult = getFindResult(querySnapshot)
  return findResult
}


const createJWTToken = (id) => {

  if (!id) {
    return {
      result: false
    }
  }

  const payload = {
    userId: id
  }


  //   token: jwt.sign(payload, secretKey, options),
  //   refreshToken: randToken.uid(256)
  // })

  const result = {
    token: jwt.sign(payload, secretKey, options),
    result: true
  };
  return result
}


export default handler