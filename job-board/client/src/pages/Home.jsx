import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import FeaturedJobs from "../components/FeaturedJobs";
import Stats from "../components/Stats";
import TopCompanies from "../components/TopCompanies";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <SearchSection />
      <FeaturedJobs />
      <Stats />
      <TopCompanies />
      <Footer />
    </div>
  );
}

export default Home;