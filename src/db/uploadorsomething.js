import compress from 'compress.js';
import { getStorage, ref, uploadBytes } from "firebase/storage";


const resizeImg = async (file) => {
  const resizedImage = await compress.compress([file], {
    size: 2, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: 600, // the max width of the output image, defaults to 1920px
    maxHeight: 300, // the max height of the output image, defaults to 1920px
    resize: true // defaults to true, set false if you do not want to resize the image width and height
  })
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFile = compress.convertBase64ToFile(base64str, imgExt);
  return resizedFile;
}

const uploadMemory = async (img) => {
  console.log("uploadMemory")
  // Create a root reference
  const storage = getStorage();
  
  // Create a reference to 'mountains.jpg'
  const imgRef = ref(storage, 'uploaded_img_name');
  uploadBytes(imgRef, img).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

export { resizeImg, uploadMemory };
