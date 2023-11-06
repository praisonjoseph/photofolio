import React, { useState, useEffect, useReducer } from 'react'
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
import { database } from '../firebase';
import { imageListReducer, 
    initialImageState, 
    SET_IMAGES,
    SET_IMAGE_LOADING,

} from '../reducers/imageReducer';

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

  const setImages = (images) => {
    dispatch({ type: SET_IMAGES, payload: images });
  }
  const setImageLoading = (isTrue) => {
    dispatch({ type: SET_IMAGE_LOADING, payload: isTrue });
  }

  return {...state };
};
