import compress from 'compress.js';

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

const uploadMemory = async (img, coordinates, name) => {
  console.log("uploadMemory")
}

export { resizeImg, uploadMemory };
