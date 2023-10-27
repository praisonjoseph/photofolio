import React, { useEffect, useState } from 'react'
import { useAlbum } from '../hooks/useAlbum';
import Album from '../components/Album'
import AddFolderButton from '../components/AddFolderButton'
import NavbarComponent from '../components/Navbar';
import { Spinner } from 'react-bootstrap';

export default function AlbumList() {
    const { folderNames, albumloading } = useAlbum()
    console.log(folderNames, albumloading)

    return (
        <div>
            <NavbarComponent />
            {albumloading ? (
                <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
                    <Spinner animation="border" />
                </div>
            ) : (
                <div>
                <AddFolderButton />
                <div className="d-flex flex-wrap">
                    {folderNames.length > 0 && folderNames.map(childFolder => (
                        <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                            <Album album={childFolder} />
                        </div>
                    )
                    )}
                </div>
                </div>
            )}

        </div>
    )
}
