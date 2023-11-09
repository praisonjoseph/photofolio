import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getMetadata } from "firebase/storage";
import {storage} from '../firebase';

export async function getImageURLonUpload(album, file, setProgress) {
    const storageRef = ref(storage, `/images/${album.name}/${file.name}`);
    try {
        // Check if the file already exists
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL
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

export const deleteImageStorage = async (pathFromURL) => {
    const storageRef = ref(storage, pathFromURL);
    // const storageRef = ref(storage, `/images/${album.name}/${file.name}`);
    try {
        const metadata = await getMetadata(storageRef);
        await deleteObject(storageRef);
        console.log('Image deleted from firebase storage successfully');
        console.log('Metadata:', metadata);
    } catch (error) {
        console.error('Error deleting the image:', error);
    }
}
