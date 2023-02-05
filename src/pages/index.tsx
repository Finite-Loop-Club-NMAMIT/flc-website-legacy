import { type NextPage } from "next";
import About from "../components/about";
import Discord from "../components/discord";
import Hackfest from "../components/hackfest";
import Hero from "../components/hero";
import Perks from "../components/perks";
import DSAsprint from "../components/sprint";
import Tech from "../components/tech";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Hero />
        <hr className="border-gray-500/50" />
        <About />
        <hr className="border-gray-500/50" />
        <Hackfest />
        <hr className="border-gray-500/50" />
        <DSAsprint />
        <hr className="border-gray-500/50" />
        <Perks />
        <hr className="border-gray-500/50" />
        <Tech />
        <hr className="border-gray-500/50" />
        <Discord />
        <hr className="border-gray-500/50" />
      </div>
    </>
  );
};

export default Home;
