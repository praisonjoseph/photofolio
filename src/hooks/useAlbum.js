import React, {useState, useEffect} from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { database } from '../firebase';

export const useAlbum = () => {
    const [folderNames, setFolderNames] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Firebase code to fetch folder names
      const fetchFolderNames = () => {
        try {
        
        const unsub = onSnapshot(database.album, (querySnapshot) => {
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
    }, []);
  
    return { folderNames, loading };
  };
