import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebaseConfig";
import axios from "axios";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore/lite";
import jwt from "jsonwebtoken";
import secret from "../../configs/secretkey";
const secretKey = secret.secretKey;

const handler = async (req: NextApiRequest, res: any) => {
  try {
    const token = req?.headers?.authorization?.split("Bearer ")[1];
    const userId = await getUserIdFromToken(token);
    const gotPlacesList = await getPlaceList(userId);

    res.status(200).send(gotPlacesList);
  } catch (error) {
    res.status(401).send([]);
  }
};

const getPlaceList = async (userId) => {
  const gotUserId = userId.userId;
  const placeRef = collection(db, "review");
  const q = query(placeRef, where("userId", "==", gotUserId));
  const placesDocs = await getDocs(q);
  const placesList = getFindResult(placesDocs);
  return placesList;
};

const getFindResult = (querySnapshot: any) => {
  let result: any[] = [];
  querySnapshot.forEach((doc: any) => {
    const docData = {
      id: doc.id,
      data: doc.data(),
    };
    result.push(docData);
  });
  return result;
};

const getUserIdFromToken = (token) => {
  var decoded = jwt.verify(token, secretKey);
  return decoded;
};
export default handler;
