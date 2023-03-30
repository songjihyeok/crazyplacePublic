import { useState } from 'react';

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import styled from "styled-components"
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "@/firebaseConfig";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [files, setFiles] = useState<any[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  const handleUpload = async (fileItems) => {
    setFiles(fileItems.map((fileItems => fileItems.file)))


  }


  const server = {
    process: (fieldName, file, metadata, load, error, progress) => {
      const newDATE = new Date().getTime()
      console.log("newDate", newDATE)
      const storageRef = ref(storage, "/images/" + file.name + newDATE);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("url", url);
          setImageUrls([...imageUrls, url])
          load()
          return
        });

      });
    },
    load: (uniqueFileId, load, error, progress, abort, headers) => {
      load()
    }
  }




  const onFileLoad = (e, file) => console.log(e.target.result, file.name);

  return (
    <FilPondWrapper>

      <FilePond
        files={files}
        onupdatefiles={handleUpload}
        allowMultiple={true}
        maxFiles={1}
        instantUpload={true}
        server={server}
        // server={{
        //   process: {
        //     url: "/api/uploadImage",
        //     method: "POST",
        //     // headers: {
        //     //   "Content-Type": "mutlipart/form-data"
        //     // },
        //     ondata: formData => {
        //       formData.append('image', "test-image");
        //       return formData;
        //     }
        //   }
        // }}
        name="file" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'

      />
    </FilPondWrapper>
  );
};

const FilPondWrapper = styled.div`
    width: 100%;
    height: 100%;
`




export default UploadImage


// if (!image) return;
// const storageRef = ref(storage, `images/${image.name}`);
// const uploadTask = uploadBytesResumable(storageRef, image);
// uploadTask.on('state_changed',
// (snapshot) => {
//   // Observe state change events such as progress, pause, and resume
//   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('Upload is ' + progress + '% done');
//   switch (snapshot.state) {
//     case 'paused':
//       console.log('Upload is paused');
//       break;
//     case 'running':
//       console.log('Upload is running');
//       break;
//   }
// },
// (error) => {
//   // Handle unsuccessful uploads
// },
// () => {
//   // Handle successful uploads on complete
//   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//     console.log('File available at', downloadURL);
//   });
// }
// )