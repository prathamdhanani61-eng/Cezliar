import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/fragrance-world" element={<Category mainCategory="Fragrance World" />} />
            <Route path="/fragrance-world/attar" element={<Category mainCategory="Fragrance World" subCategory="Attar" />} />
            <Route path="/fragrance-world/dhoop" element={<Category mainCategory="Fragrance World" subCategory="Dhoop" />} />
            
            <Route path="/home-care" element={<Category mainCategory="Home Care" />} />
            <Route path="/home-care/drain-opener" element={<Category mainCategory="Home Care" subCategory="Drain Opener" />} />
            <Route path="/home-care/water-filter" element={<Category mainCategory="Home Care" subCategory="Water Filter" />} />
            
            <Route path="/product/:id" element={<ProductDetail />} />
            
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
