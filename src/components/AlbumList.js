import React from 'react'
import { useAlbum } from '../hooks/useAlbum';
import Album from './Album'
import AddFolderButton from './AddFolderButton'

export default function AlbumList() {
    const { folderNames, loading } = useAlbum()
    console.log(folderNames, loading)
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <AddFolderButton />
            <div className="d-flex flex-wrap">
                {folderNames.length > 0 && folderNames.map(childFolder => (
                    <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                        <Album album={childFolder} />
                    </div>
                )
                )}
            </div>
        </>
    )
}
