import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ImageList from "./pages/ImageList";
import AlbumList from "./pages/AlbumList";

const App = () => { 
return ( 
	<Router>
		<Routes>
			<Route exact path="/" element={<AlbumList />} />
			<Route path="/album/:albumId" element={<ImageList />} />
		</Routes>
	</Router>
	
); 
}; 

export default App;
