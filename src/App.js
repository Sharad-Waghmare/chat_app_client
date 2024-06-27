import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import AvatarSet from './pages/AvatarSet';
import Chat from './pages/Chat';



function App() {
  return (
    <>
      <Router>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/avatar' element={<AvatarSet/>}/>
      <Route path='/' element={<Chat/>}/>
    </Routes>
   </Router>
    </>
  );
}

export default App;
