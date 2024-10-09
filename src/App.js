import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css'
import {HelmetProvider} from 'react-helmet-async'
import Home from './pages/Home.js';
import About from './pages/About.js'
import Recipes from './pages/Recipes.js';
import Contact from './pages/Contact.js'
import Login from './pages/Login.js';
import Order from './pages/Order.js';
import Community from './pages/Community.js';
import Cart from './pages/Cart.js';
import RegisterPage from "./pages/Register.js";
import Customise from "./pages/Customise.js";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import MapDisplay from "./components/Map.js";
import Upload from "./pages/Upload.js"; 
import AuthProvider from "./components/AuthProvider.js";
import ProfilePage from "./pages/Profile.js";
import LocationSearch from "./pages/LocationSearch.js";
import OrderSearch from "./pages/OrderSearch.js";
import TermsAndConditions from './pages/TermsAndConditions.js';


function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/order" element={<Order/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/map' element={<MapDisplay />} />
          <Route path="/upload" element = {<Upload />}/ >
          <Route path="/customise" element={<Customise />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orderSearch" element={<OrderSearch />} />
          <Route path='TermsAndConditions' element={<TermsAndConditions />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;