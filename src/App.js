import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Common/Navbar'
import LoginForm from './Components/Auth/Login'
import Footer from './Components/Common/Footer'
import SignupForm from './Components/Auth/Signup'
import About from './Pages/About'
import VerifyEmail from './Pages/VerifyEmail'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import Register from './Pages/Register'
import UploadPhotos from './Pages/UploadPhotos'
import FindRooms from './Pages/FindRooms'
import BuildingDetails from './Pages/BuildingDetails'
export default function App() {
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/findrooms" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignupForm/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/settings' element={<Settings/>}/>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/register/upload-photos' element={<UploadPhotos/>}></Route>
        <Route path='/rooms' element={<FindRooms/>}/>
        <Route path='/rooms/roomDetails/:id' element={<BuildingDetails/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}