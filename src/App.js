import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import ImageList from "./pages/ImageList";

const App = () => { 
return ( 
	<Router>
		<Routes>
			<Route exact path="/" element={<Dashboard />} />
			<Route path="/album/:albumId" element={<ImageList />} />
		</Routes>
	</Router>
	
); 
}; 

export default App;
