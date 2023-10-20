import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileUpload} from '@fortawesome/free-solid-svg-icons'
import { database, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, serverTimestamp } from "firebase/firestore";

export default function AddImage({albumId, album}) {

    const handleUpload = (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (albumId == null || file == null) return

        const storageRef = ref(storage, `/images/${album.name}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            await addDoc(database.images, {
              name: file.name,
              albumId: album.id,
              url: downloadURL,
              createdAt: serverTimestamp()
            });
          });
        }
      );
    }
    return (
        <label className='btn btn-outline-dark btn-lg m-2 ms-auto'>
            <FontAwesomeIcon  style={{paddingRight:'10px'}} icon={faFileUpload}/>
            Add Image
            <input 
            type="file" 
            onChange={handleUpload} 
            style={{opacity: 0, position: 'absolute', left: "-9999px"}} 
            />
        </label>
      )
}
