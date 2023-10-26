import React, {useState, useEffect} from 'react'
import { doc, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { database } from '../firebase';

export const useAlbum = (albumId = null) => {
    const [folderNames, setFolderNames] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Firebase code to fetch folder names
      const fetchFolderNames = () => {
        try {
        // const q = query(database.album, orderBy("createdAt"))
        const q = query(database.album)
        const unsub = onSnapshot(q, (querySnapshot) => {
            const names = querySnapshot.docs.map(database.formattedDoc)
            setFolderNames(names);
            // console.log(names)
        });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching folder names:', error);
          setLoading(false);
        }
      };
  
      fetchFolderNames();
    }, [albumId]);

    useEffect(() => {
      // Firebase code to fetch folder names
      const fetchImages = () => {
        try {
        // const q = query(database.images, where("albumId", "==", albumId), orderBy("createdAt"))
        const q = query(database.images, where("albumId", "==", albumId))
        const unsub2 = onSnapshot(q, (querySnapshot) => {
            const images = querySnapshot.docs.map(database.formattedDoc)
            setImages(images);
            // console.log(images)
        });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching folder names:', error);
          setLoading(false);
        }
      };
  
      fetchImages();
    }, [albumId]);

  
    return { folderNames, images, loading };
  };
