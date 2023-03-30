import { NextApiRequest, NextApiResponse } from "next";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "@/firebaseConfig";
import multer from "multer";
const multerUpload = multer({ storage: multer.memoryStorage() });

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const data = _req.body ?? null;
  if (!data) res.status(200).json({ message: "No request body found" });

  const storageRef = ref(storage, "/images/imagename");
  uploadBytes(storageRef, data).then((snapshot) => {
    console.log(snapshot);
    getDownloadURL(snapshot.ref).then((url) => {
      console.log("url", url);
    });
  });
  // const uploadTask = uploadBytesResumable(storageRef, reqBody);
  // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //   console.log("File available at", downloadURL);
  // });

  res.status(200).json({ data: "OK" });
};

export default handler;
