import React, { useState, useEffect } from 'react'
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
import { database } from '../firebase';

export const useAlbum = (albumId = null) => {
  const [folderNames, setFolderNames] = useState([]);
  const [albumloading, setAlbumLoading] = useState(true);

  useEffect(() => {
    // Firebase code to fetch folder names
    const fetchFolderNames = () => {
      try {
        // const q = query(database.album, orderBy("createdAt"))
        const q = query(database.album)
        onSnapshot(q, (querySnapshot) => {
          const names = querySnapshot.docs.map(database.formattedDoc)
          setFolderNames(names);
          setAlbumLoading(false);
          // console.log(names)
        });
        
      } catch (error) {
        console.error('Error fetching folder names:', error);
        setAlbumLoading(false);
      }
    };

    fetchFolderNames();
  }, []);



  return { folderNames, albumloading };
};
