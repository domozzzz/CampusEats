import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home.js';
import Meals from './pages/Meals.js';
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
          <Route path="/meals" element={<Meals />} />
          <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;