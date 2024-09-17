import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css'
import Home from './pages/Home.js';
import About from './pages/About.js'
import Meals from './pages/Meals.js';
import Recipes from './pages/Recipes.js';
import Contact from './pages/Contact.js'
import Login from './pages/Login.js';
import OrderChoice from './pages/OrderChoice.js'
import Cart from './pages/cart.js'
import RegisterPage from "./pages/Register.js";
import Order from './pages/Order.js'
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Upload from "./pages/upload.js";


function App() {
  return (
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
          <Route path="/orderChoice" element={<OrderChoice/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/upload" element = {<Upload/>}/>
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;