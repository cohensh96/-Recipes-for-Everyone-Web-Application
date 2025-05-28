const BASE_URL = "https://recipes-for-everyone-backend.onrender.com/";
//const BASE_URL = "http://localhost:3500";

/**
 * Custom hook for converting an image string to a full URL.
 * It appends the provided image string to the base URL.
 *
 * @param {string} ImageString - The image string or path to be converted.
 * @returns {string|undefined} The full URL of the image, or undefined if the input is null or undefined.
 */

// const oldUseImage = (ImageString) => {
//   if (ImageString === null || ImageString === undefined) {
//     return undefined;
//   }

//   const dataImage = ImageString;
//   const dataURL = BASE_URL + '/' + dataImage.replace('uploads', '');
//   return dataURL;
// }
const useImage = (ImageString) => {
  return ImageString;
}

export default useImage;
