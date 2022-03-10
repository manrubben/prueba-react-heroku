import './App.css';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import MainHeader from "./components/MainHeader";
import Hola from "./components/Hola";
import Crud from "./components/Crud";
import Login from "./components/Login";

function App() {
    return (
        <Router>
            <MainHeader />
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/hola' element={<Hola/>} />
                <Route path='/crud' element={<Crud/>} />
            </Routes>
        </Router>
    );
}

export default App;
