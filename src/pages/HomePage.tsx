import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import TechStack from '../components/sections/TechStack';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Footer from '../components/layout/Footer';

const HomePage = () => {
    return (
        <div className="bg-gray-950 min-h-screen text-white">
            <Navbar />
            <Hero />
            <TechStack />
            <Projects />
            <Experience />
            <Footer />
        </div>
    );
};

export default HomePage;
