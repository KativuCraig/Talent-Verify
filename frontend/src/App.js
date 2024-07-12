
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Companies from "./components/Companies"
import ManageCompanies from "./components/ManageCompany";
import Manage from "./components/ManageEmployee";
import Employees from "./components/Employees";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
    <Navigation />
    <Routes>
       <Route exact path="/" element={<Home/>} />
       <Route path="/Companies" element={<Companies/>} />
       <Route path="/Employees" element={<Employees/>} />
       <Route path="/ManageCompany" element={<ManageCompanies/>} />
        <Route path="/ManageEmployee" element={<Manage/>} />
     </Routes>
  </BrowserRouter>
         
    
   
  );
}

export default App;
