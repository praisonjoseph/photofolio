import React from 'react'
import NavbarComponent from './Navbar'
import AlbumList from './AlbumList'
import { useParams } from 'react-router-dom'
import ImageList from './ImageList'
import { useLocation } from 'react-router-dom'


export default function Dashboard() {
    const { albumId } = useParams()
    const { state={} } = useLocation()
    console.log(albumId, state)
    
    // const albumId = 1
    return (
        <div>
            <NavbarComponent />
            {albumId ? <ImageList albumId={albumId} album={state && state.album} />: <AlbumList />}
        </div>
    )
}
