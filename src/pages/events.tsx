import EventList from "../components/event";
import { Fade } from "react-awesome-reveal";
import { type NextPage } from "next";

const Events: NextPage = () => {
  return (
    <>
      <Fade>
        <div className="flex flex-col items-center justify-center gap-3 px-10 pb-5">
          <h1 className="heading text-5xl font-bold">Events</h1>
          <p className="text-center text-black dark:text-gray-50 lg:w-1/2 lg:text-xl">
            We have successfully reached out many technical workshops. As we
            reflect back, here are some of the events organized by the club!
          </p>
        </div>
      </Fade>
      <EventList />
      <hr className="border-gray-500/50" />
    </>
  );
};

export default Events;
