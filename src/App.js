import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard";
import ImageList from "./components/ImageList";

const App = () => { 
return ( 
	<Router>
		<Routes>
			<Route exact path="/" element={<Dashboard />} />
			<Route path="/album/:albumId" element={<Dashboard />} />
		</Routes>
	</Router>
	
); 
}; 

export default App;
