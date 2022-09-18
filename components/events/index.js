import { events, eventTabs} from "../../components/constants";
import { useState } from "react";

export default function Events() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <div className="mt-[10%]">
        {eventTabs.map((tab, index) => (
            <button
            key={index}
            className={`py-2 ml-5 border-b-4 transition-colors duration-300 ${
              index === activeTabIndex
                ? "border-teal-500"
                : "border-transparent hover:border-gray-200"
            }`}
            onClick={() => setActiveTabIndex(index)}>
            {tab}
          </button>
        ))}
        {events.map((event, index) => (
            eventTabs[activeTabIndex] === event.year? (
            <div key={index}>
                {event.year}
            </div>
            ): eventTabs[activeTabIndex] === "All"?(
            <div key={index}>
              {event.year}
            </div>
            ): null
        ))}
    </div>
  );
}