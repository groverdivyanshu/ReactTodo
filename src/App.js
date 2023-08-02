
import { Routes,Route } from 'react-router-dom';
import './App.css';

import Edit from './Components/Edit';
import HomePage from './Components/HomePage';


function App() {
  return (
    <>
    <Routes>

    <Route path="/" element={<HomePage/>}/>
    <Route path="/edit/:id" element={<Edit/>}/>
    </Routes>

  </>
  );
}

export default App;
