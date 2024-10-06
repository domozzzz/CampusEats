import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css'
import {HelmetProvider} from 'react-helmet-async'
import Home from './pages/Home.js';
import About from './pages/About.js'
import Login from './pages/Login.js';
import Order from './pages/Order.js';
import Marketplace from './pages/marketplace.js';
import OrderMealKit from './pages/OrderMealKit.js';
import Cart from './pages/Cart.js';
import RegisterPage from "./pages/Register.js";
import Customise from "./pages/Customise.js";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import MapDisplay from "./components/Map.js";
import Upload from "./pages/Upload.js";
import AuthProvider from "./components/AuthProvider.js";
import ProfilePage from "./pages/Profile.js";


function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage/>}/>

          <Route path="/order" element={<Order/>}/>
          <Route path='/orderSearchMap' element={<MapDisplay/>}/>
          <Route path="/orderSearchMealKit/:LID" element={<OrderMealKit/>}/>
          <Route path="/customMealKit" element={<Customise/>}/>

          <Route path="/upload" element = {<Upload/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>

          <Route path="/marketplace" element={<Marketplace/>}/>

          

      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;