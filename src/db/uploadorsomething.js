import imageCompression from 'browser-image-compression';
import { addDoc, collection } from 'firebase/firestore/lite';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import db from './db';

const resizeImg = async (file) => {
  console.log('originalFile instanceof Blob', file instanceof Blob); // true
  console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 3,
    maxWidthOrHeight: 500,
    useWebWorker: true
  }
  try {
    const compressedFile = await imageCompression(file, options);
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}

const uploadPan = async (img) => {
  try {
    console.log("uploadMemory")
    // Create a root reference
    const storage = getStorage();
    
    // Create a reference
    const filename =  Date.now();
    const imgRef = ref(storage, `/${filename}.jpg`);
    await uploadBytes(imgRef, img)
    console.log('Uploaded a blob or file!');
  
    // TODO: get the URL.
    let downloadURL = await getDownloadURL(imgRef);
    return downloadURL;
  }
  catch(err) {
    console.log(err)
    console.log("code: ", err.code)
    console.log("serverResponse: ", err.serverResponse)
  }
}

const uploadDoc = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "memory"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const uploadMemory = async (img, coordinates, name) => {
  try {
    const resizedImg = await resizeImg(img);
    
    // upload original and thumbnail
    const imageUrl = await uploadPan(img);
    const thumbnailUrl = await uploadPan(resizedImg);
  
    console.log(imageUrl)
    console.log(thumbnailUrl)
  
    // upload memory
    await uploadDoc({imageUrl, thumbnailUrl, coordinates, name});
  }
  catch(err) {
    console.log("ERROR uploading memory:", err)
    return
  }

  console.log("Successfully uploaded memory.")
}

export { uploadMemory };
