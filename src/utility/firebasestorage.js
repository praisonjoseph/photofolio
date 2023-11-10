import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getMetadata } from "firebase/storage";
import { storage } from '../firebase';
import { extractPathfromURL } from '../utility/common';
import {doc, getDoc } from "firebase/firestore";
  import { database } from '../firebase';

export async function getImageURLonUpload(file, filePath,fileName, setProgress) {
    
    const fullPath = `${filePath}${fileName}`
    console.log('initial file path', fullPath)
    const storageRef = ref(storage, fullPath);
    try {
        await getDownloadURL(storageRef)
        const extension = file.name.split('.').pop(); // Get the file extension
        const newFileName = `${file.name.split('.')[0]}_${Date.now()}.${extension}`;
        console.log('New file path', newFileName)
        return await getImageURLonUpload(file, filePath, newFileName, setProgress); // Retry with the new name
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
            // File doesn't exist, proceed with the upload
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress); // hook to report progress
                },
                (error) => {
                    throw error;
                }
            );
            // Wait for the upload to complete
            await uploadTask;
            // Once the upload is complete, get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } else {
            throw error;
        }
    }
}


export async function editImageStorage( imageId, file, filePath,fileName, setProgress) {
    try {
      // Get the document reference from Firestore
      const imageDocRef = doc(database.images, imageId);
      const imageSnapshot = await getDoc(imageDocRef);
      
      if (imageSnapshot.exists()) {
        const imageData = imageSnapshot.data();
  
        // Update the image file in Firebase Storage if a new file is provided
        if (imageData && imageData.url) {
          const decodedpathURL = extractPathfromURL(imageData.url)
          if (decodedpathURL !== null) {
              console.log(decodedpathURL); 
              // Delete the image from Firebase storage
              await deleteImageStorage(decodedpathURL)
            }
            // Upload the new image
          const downloadURL = await getImageURLonUpload(file, filePath,fileName, setProgress)
          return downloadURL
        }
      } else {
        console.error('Document does not exist in Firestore');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  }

export const deleteImageStorage = async (pathFromURL) => {
    const storageRef = ref(storage, pathFromURL);
    try {
        const metadata = await getMetadata(storageRef);
        await deleteObject(storageRef);
        console.log('Image deleted from firebase storage successfully');
        console.log('Metadata:', metadata);
    } catch (error) {
        console.error('Error deleting the image:', error);
    }
}
