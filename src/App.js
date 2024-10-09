import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css'
import {HelmetProvider} from 'react-helmet-async'
import Home from './pages/Home.js';
import About from './pages/About.js'
import Login from './pages/Login.js';
import Order from './pages/Order.js';
import Marketplace from './pages/Marketplace.js';
import OrderMealKit from './pages/OrderMealKit.js';
import MapDisplay from './components/Map.js';
import Upload from "./pages/Upload.js";
import CustomiseV2 from "./pages/CustomiseV2.js";
import Cart from './pages/Cart.js';
import RegisterPage from "./pages/Register.js";
import Customise from "./pages/Customise.js";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import AuthProvider from "./components/AuthProvider.js";
import { CartProvider } from "./components/CartContext.js";
import ProfilePage from "./pages/Profile.js";
import Postcheckout from "./pages/Postcheck.js";


function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
      <CartProvider>
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage/>}/>

          <Route path="/order/:LID" element={<Order/>}/>
          <Route path='/orderSearchMap' element={<MapDisplay/>}/>
          <Route path="/orderSearchMealKit/:LID" element={<OrderMealKit/>}/>
          <Route path="/customMealKit/:LID" element={<Customise/>}/>
          <Route path="/customiseV2" element={<CustomiseV2/>}/>

          <Route path="/upload" element = {<Upload/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>

          <Route path="/marketplace" element={<Marketplace/>}/>

          <Route path="/payment" element={<Postcheckout/>}/>

          

      </Routes>
      <Footer />
    </Router>
    </CartProvider>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;