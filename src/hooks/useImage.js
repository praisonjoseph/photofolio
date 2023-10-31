import React, { useState, useEffect, useReducer } from 'react'
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
import { database } from '../firebase';
import { imageListReducer, 
    initialImageState, 
    SET_OPEN_ADD_IMAGE,
    SET_SELECTED_IMAGE_INDEX,
    SET_IMAGE_ID,
    SET_SHOW_CAROUSEL_MODAL,
    SET_SEARCH_TERM,
    SET_IMAGES,
    SET_IMAGE_LOADING,

} from '../reducers/imageReducer';

export const useImage = (albumId = null) => {

  // const [images, setImages] = useState([]);
  // const [imageloading, setImageLoading] = useState(true);
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

  const setSelectedImageIndex = (index) => {
    dispatch({ type: SET_SELECTED_IMAGE_INDEX, payload: index });
  };

  const setOpenAddImage = (isOpen) => {
    dispatch({ type: SET_OPEN_ADD_IMAGE, payload: isOpen });
  };

  const setImageId = (imageId) => {
    dispatch({ type: SET_IMAGE_ID, payload: imageId });
  }
  const setShowCarouselModal = (isOpen) => {
    dispatch({ type: SET_SHOW_CAROUSEL_MODAL, payload: isOpen });
  }
  const setSearchTerm = (value) => {
    dispatch({ type: SET_SEARCH_TERM, payload: value });
  }
  return {...state, 
    // images,
    // imageloading,
    setSelectedImageIndex,
    setOpenAddImage,
    setImageId,
    setShowCarouselModal,
    setSearchTerm,
 };
};
