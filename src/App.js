import React from 'react';
import './App.css';
import { BrowserRouter as Router ,Route, Routes} from 'react-router-dom';
import Join from './Components/Join/Join';
import Chat from './Components/Chat/Chat';


function App() {
  
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path='/' element={<Join/>}/>
      <Route path='/chat' element={<Chat/>} />

      </Routes>
     </Router>
    </div>
  );
}

export default App;
