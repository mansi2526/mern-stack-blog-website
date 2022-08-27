import './App.css';

//react router dom
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//components
import Home from '../src/pages/home/Home';
import SingleBlogPost from '../src/pages/singleBlogPost/SingleBlogPost';
import Navbar from './components/navbar/Navbar';
import NewPost from '../src/pages/newPost/NewPost';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import About from './pages/about/About';
import {Context, ContextProvider} from "./context/Context";
import { useContext } from 'react';

function App() {
  const {user} = useContext(Context);
  
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route path='/register' element={user ? <Home/> : <Register/>}/>
      <Route path='/login' element={user ? <Home/> : <Login/>}/>
      <Route path='/create' element={user ? <NewPost/> : <Register/>}/>
      <Route path='/settings' element={user ? <Settings/> : <Register/>}/>
      <Route path='/posts/:postid' element={<SingleBlogPost/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
