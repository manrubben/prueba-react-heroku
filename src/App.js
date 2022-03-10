import './App.css';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import MainHeader from "./components/MainHeader";
import Hola from "./components/Hola";

function App() {
  return (
      <Router>
        <MainHeader />
        <Routes>
          <Route path='/hola' element={<Hola/>} />
        </Routes>
      </Router>
  );
}

export default App;
