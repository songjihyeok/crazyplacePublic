import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebaseConfig";
import axios from "axios";
import {
  collection,
  getDoc,
  doc,
  addDoc,
  query,
  where,
} from "firebase/firestore/lite";
import jwt from "jsonwebtoken";
import secret from "../../configs/secretkey";
const secretKey = secret.secretKey;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.body.body.id;
  const authorization = req.body.Headers.Authorization.split("Bearer ")[1];
  const gotUserId = await getUserIdFromToken(authorization);
  const gotPlaceDetail = await getPlaceDetail(gotUserId, postId);
  
if(!gotPlaceDetail){
     res.status(400).send({body: null, success:false})
}else{
     res.status(200).send({ body: gotPlaceDetail, success:true });
}
};

const getPlaceDetail = async (gotUserId, postId) => {
  const placeRef = doc(db, "review", postId);
  const placeSnap = await getDoc(placeRef);
  console.log("placeRef", placeSnap);
  if (placeSnap.exists()) {
    console.log("Document data:", placeSnap.data());
    return placeSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
};

const getUserIdFromToken = (token) => {
  var decoded = jwt.verify(token, secretKey);
  const userId = decoded.userId;

  return userId;
};

export default handler;
