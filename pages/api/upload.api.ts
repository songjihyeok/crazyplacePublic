import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore/lite";
import secret from "../../configs/secretkey";
import jwt from "jsonwebtoken";

const secretKey = secret.secretKey;
const options = secret.option;

const handler = async (req: NextApiRequest, res: any) => {
  const body = req.body;
  const gotData = req.body.body.data;
  const token = body.Headers.Authorization.split("Bearer ")[1];
  const gotUserId = getUserIdFromToken(token);
  console.log("gotData", gotData);
  const registering = await registerPlaceInUser(gotUserId, gotData);

  if (!registering) {
    res.status(400).json({ result: false });
  } else {
    res.status(200).json({ result: true });
  }
};

const getUserIdFromToken = (token) => {
  var decoded = jwt.verify(token, secretKey);
  return decoded;
};

const registerPlaceInUser = async (userId, gotData) => {
  try {
    const gotUserId = userId.userId;
    const usersAddRef = await addDoc(collection(db, "review"), {
      userId: gotUserId,
      placeId: gotData.id,
      reviewTitle: gotData.reviewTitle,
      reviewDescription: gotData.reviewDescription,
      ...gotData.placeInfo,
      instagramUrl: gotData.instagramUrl,
    });
    return usersAddRef;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handler;
