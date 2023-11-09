export const extractPathfromURL = (imageData) => {
    const pathFromURL = new URL(imageData.url).pathname;
    const searchString = "/images"
    const startIndex = pathFromURL.indexOf(searchString);
    if (startIndex !== -1) {
      const result = pathFromURL.substring(startIndex);
      const decodedpathURL = decodeURIComponent(result);
      return decodedpathURL;
    }
    else {
      console.log(searchString, "Search string not found.");
      return null;
    }
  }