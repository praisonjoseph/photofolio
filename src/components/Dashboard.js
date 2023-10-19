import React from 'react'
import NavbarComponent from './Navbar'
import AddFolderButton from './AddFolderButton'
import { useAlbum } from '../hooks/useAlbum'
import Album from './Album'
export default function Dashboard() {
const {folderNames, loading}  = useAlbum()
console.log(folderNames)
  return (
    <div>
        <NavbarComponent />
        <AddFolderButton /> 
        <div className="d-flex flex-wrap">
        {folderNames.length > 0 && folderNames.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                <Album folder={childFolder} />
              </div>
            )
          )}
        </div>

    </div>
  )
}
