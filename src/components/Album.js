import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Album({ folder }) {
  // console.log(folder)
  return (
    <Button
      variant='outline-dark'
      className='text-truncate w-100'
      as={Link}
    >
      
      <FontAwesomeIcon icon={faFolder} className='mr-2' />
      {folder.name}
    </Button>
  )
}
