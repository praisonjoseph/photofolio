import React, { useEffect, useReducer } from 'react'
import {
  onSnapshot,
  query, orderBy, where, addDoc, deleteDoc,
  updateDoc, doc, getDoc
} from "firebase/firestore";
import { database } from '../firebase';
import {
  imageListReducer,
  initialImageState,
  SET_IMAGES,
  SET_IMAGE_LOADING,
  ADD_IMAGE,
  EDIT_IMAGE,
  DELETE_IMAGE

} from '../reducers/imageReducer';
import { deleteImageStorage } from '../utility/firebasestorage';
import { extractPathfromURL } from '../utility/common';

export const useImage = (albumId = null) => {

  const [state, dispatch] = useReducer(imageListReducer, initialImageState);

  useEffect(() => {
    // Firebase code to fetch folder names
    const fetchImages = () => {
      try {
        // const q = query(database.images, where("albumId", "==", albumId), orderBy("createdAt"))
        const q = query(database.images, where("albumId", "==", albumId))
        onSnapshot(q, (querySnapshot) => {
          const images = querySnapshot.docs.map(database.formattedDoc)
          setImages(images);
          // console.log(images)
          setImageLoading(false);
        });

      } catch (error) {
        console.error('Error fetching folder names:', error);
        setImageLoading(false);
      }
    };

    fetchImages();
  }, [albumId]);

  const addImage = (newImage) => {
    addDoc(database.images, newImage)
      .then((docRef) => {
        dispatch({ type: ADD_IMAGE, payload: { id: docRef.id, ...newImage } });
      });
  };
  const editImageName = (editedImage, imageId) => {
    const docRef = doc(database.images, imageId)
    updateDoc(docRef, editedImage)
      .then(() => {
        dispatch({ type: EDIT_IMAGE, payload: editedImage });
      })
  };

  // const deleteImage = (imageId) => {
  //   const docRef = doc(database.images, imageId)
  //   deleteDoc(docRef)
  //     .then(() => {
  //       dispatch({ type: DELETE_IMAGE, payload: imageId });
  //     })
  // };



  async function deleteImage(imageId) {
    try {
      // Get the document reference from Firestore
      const imageDocRef = doc(database.images, imageId);
      const imageSnapshot = await getDoc(imageDocRef);

      if (imageSnapshot.exists()) {
        // Retrieve the metadata from the Firestore document
        const imageData = imageSnapshot.data();
        if (imageData && imageData.url) {
          // Extract the path from the URL to construct the Storage reference
          const decodedpathURL = extractPathfromURL(imageData)
          if (decodedpathURL !== null) {
            console.log(decodedpathURL); 
            // Delete the image from Firebase storage
            await deleteImageStorage(decodedpathURL)
          }
          // Delete the document from Firestore
          await deleteDoc(imageDocRef)
          dispatch({ type: DELETE_IMAGE, payload: imageId });
          return true;
        } else {
          console.error('No valid URL found in Firestore document');
          return false;
        }
      } else {
        console.error('Document does not exist in Firestore');
        return false;
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  const setImages = (images) => {
    dispatch({ type: SET_IMAGES, payload: images });
  }
  const setImageLoading = (isTrue) => {
    dispatch({ type: SET_IMAGE_LOADING, payload: isTrue });
  }

  return { ...state, addImage, editImageName, deleteImage };
};
