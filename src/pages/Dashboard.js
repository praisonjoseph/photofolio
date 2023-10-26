import React from 'react'
import NavbarComponent from '../components/Navbar'
import AlbumList from '../components/AlbumList'

export default function Dashboard() {
    
    return (
        <div>
            <NavbarComponent />
            {/* {albumId ? <ImageList albumId={albumId} album={state && state.album} />: <AlbumList />} */}
            <AlbumList />
        </div>
    )
}
