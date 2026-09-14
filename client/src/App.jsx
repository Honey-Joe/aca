import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import OfficeBearers from './components/OfficeBearers';
import Events from './components/Events';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <OfficeBearers />
      </main>
      <Footer />
    </>
  );
}
