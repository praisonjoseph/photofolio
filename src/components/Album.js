import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Album({ album }) {
    // console.log(folder)
    const albumStyles = {
        border: '1px solid #ccc',
        padding: '40px',
        display: 'grid',
        placeItems: 'center'
    };

    return (
        <Button
            to={`/album/${album.id}`}
            state={{album}}
            as={Link}
            variant='outline-secondary'
            style={albumStyles}
        >
            <FontAwesomeIcon icon={faFolder} className='pb-2 fs-1' />
            {album.name}
        </Button>
    )
}
