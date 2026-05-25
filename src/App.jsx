import Navbar     from "./components/layout/Navbar";
import Hero       from "./components/sections/Hero";
import About      from "./components/sections/About";
import Skills     from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Education  from "./components/sections/Education";
import Projects   from "./components/sections/Projects";
import Contact    from "./components/sections/Contact";

export default function App() {
  return (
    <div style={{ backgroundColor: "#0e0e10", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Contact />
    </div>
  );
}