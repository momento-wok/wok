import imageCompression from 'browser-image-compression';
import { addDoc, collection } from 'firebase/firestore/lite';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import db from './db';
const async = require('async');
// const fs = require('fs');
// const https = require('https');
// const path = require("path");
// const createReadStream = require('fs').createReadStream
// const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const getDescription = async (url) => {
  const key = '42d55dd7cec3423cacb35c1da60daf09';
  const endpoint = 'https://imgdescription.cognitiveservices.azure.com/';

  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

  function computerVision() {
    async.series([
      async function () {},
      function () {
        return new Promise((resolve) => {
          resolve();
        })
      }
    ], (err) => {
      throw (err);
    });
  }
  
  computerVision();

  // Analyze URL image
  console.log('Analyzing URL image to describe...', url.split('/').pop());
  const caption = (await computerVisionClient.describeImage(url)).captions[0];
  console.log(`This may be ${caption.text} (${caption.confidence.toFixed(2)} confidence)`);

  return caption.text;
}

const resizeImg = async (file, maxSize) => {
  console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 3,
    maxWidthOrHeight: maxSize,
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
    // Create a root reference
    const storage = getStorage();
    
    // Create a reference
    const filename =  Date.now();
    const imgRef = ref(storage, `/${filename}.jpg`);
    await uploadBytes(imgRef, img)
    console.log('Uploaded a blob or file!');
  
    return {ref: imgRef, url: await getDownloadURL(imgRef)};
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

const uploadMemory = async (img, coordinates, incrementSteps) => {
  try {
    const thumbnail = await resizeImg(img, 800);
    incrementSteps();
    const forDescription = await resizeImg(img, 2000);
    incrementSteps();
    
    // upload original and thumbnail
    const imageUploadResult = await uploadPan(img);
    incrementSteps();
    const thumbnailUploadResult = await uploadPan(thumbnail);
    incrementSteps();
    const forDescriptionUploadResult = await uploadPan(forDescription);
    incrementSteps();

    // generate name
    let name = await getDescription(forDescriptionUploadResult.url);
    incrementSteps();

    console.log("description:", name)
  
    // upload memory
    await uploadDoc({
      imageUrl: imageUploadResult.url,
      thumbnailUrl: thumbnailUploadResult.url,
      coordinates,
      name: name
    });
    incrementSteps();

    // delete file used for description
    deleteObject(forDescriptionUploadResult.ref).then(() => {
      // File deleted successfully
      incrementSteps();
    }).catch((err) => {
      console.log("Error cleaning description file:", err)
    });
  }
  catch(err) {
    console.log("ERROR uploading memory:", err)
    return
  }

  console.log("Successfully uploaded memory.")
}

export { uploadMemory };
