import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css'
import {HelmetProvider} from 'react-helmet-async'
import Home from './pages/Home.js';
import About from './pages/About.js'
import Meals from './pages/Meals.js';
import Recipes from './pages/Recipes.js';
import Contact from './pages/Contact.js'
import Login from './pages/Login.js';
import Order from './pages/Order.js'
import Community from './pages/Community.js';
import OrderMealKit from './pages/OrderMealKit.js'
import OrderPreMade from './pages/OrderPreMade.js'
import Cart from './pages/cart.js'
import RegisterPage from "./pages/Register.js";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Upload from "./pages/upload.js";


function App() {
  return (
    <HelmetProvider>
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/orderPreMade" element={<OrderPreMade/>}/>
          <Route path="/orderMealKit" element={<OrderMealKit/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/upload" element = {<Upload/>}/>
      </Routes>
      <Footer />
    </Router>
    </HelmetProvider>
  );
}

export default App;