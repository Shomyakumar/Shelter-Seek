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
import UpdateBuilding from './Pages/UpdateBuilding'
import UserListings from './Pages/UserListings'
import Bookings from './Pages/Bookings'
import PrivateRoute from './Components/Common/PrivateRoute'
import UserBookings from './Pages/UserBookings'

export default function App() {
  return (
    <div>
      <Navbar/>

      
      <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/findrooms" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Protected Routes */}
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile/settings"
                element={
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PrivateRoute>
                        <Register />
                    </PrivateRoute>
                }
            />
            <Route
                path="/register/upload-photos"
                element={
                    <PrivateRoute>
                        <UploadPhotos />
                    </PrivateRoute>
                }
            />
            <Route
                path="/rooms"
                element={
                    <PrivateRoute>
                        <FindRooms />
                    </PrivateRoute>
                }
            />
            <Route
                path="/rooms/roomDetails/:id"
                element={
                    <PrivateRoute>
                        <BuildingDetails />
                    </PrivateRoute>
                }
            />
            <Route
                path="/update/:id"
                element={
                    <PrivateRoute>
                        <UpdateBuilding />
                    </PrivateRoute>
                }
            />
            <Route
                path="/listings"
                element={
                    <PrivateRoute>
                        <UserListings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/building/bookings/:id"
                element={
                    <PrivateRoute>
                        <Bookings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/user/bookings"
                element={
                    <PrivateRoute>
                        <UserBookings />
                    </PrivateRoute>
                }
            />
        </Routes>
     
      <Footer/>
    </div>
  )
}