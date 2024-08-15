import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home.js';
import About from './pages/About.js'
import Meals from './pages/Meals.js';
import Recipes from './pages/Recipes.js';
import Contact from './pages/Contact.js'
import Login from './pages/Login.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import './App.css';


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
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;