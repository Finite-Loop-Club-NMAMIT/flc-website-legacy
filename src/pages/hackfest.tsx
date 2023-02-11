import React, { type FunctionComponent, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Button from "../components/button";
import { hackfestFAQ, hackfestTeams } from "../components/constants";

const Teams = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [revealIndex, setRevealIndex] = useState(-1);

  const handleReveal = () => {
    for (let i = 0; i < hackfestTeams.length; i++) {
      setTimeout(() => {
        setRevealIndex(i);
      }, i * 1000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isExploding && <ConfettiExplosion duration={5000} force={0.1} />}
      <h1 className="heading mb-3 text-center text-2xl font-bold lg:text-4xl">
        Top 15 Shortlisted teams
      </h1>
      {!isExploding && (
        <Button
          onClick={() => {
            setIsExploding(true);
            handleReveal();
          }}
        >
          Reveal
        </Button>
      )}
      <div className="my-6 flex flex-wrap justify-center text-center">
        {hackfestTeams.map((team, index) => (
          <div
            key={index}
            className={`${
              index <= revealIndex
                ? "scale-100  text-yellow-500 blur-0"
                : "scale-110 blur-lg"
            } text-md m-2 w-96 max-w-xs rounded-xl border border-gray-500 p-5 font-bold duration-700 ease-in-out lg:text-xl`}
          >
            {team.name}
            <span
              className="absolute bottom-2 right-2 rounded-lg border border-yellow-500"
              style={{
                fontSize: "0.5rem",
                padding: "0.2rem 0.4rem",
                lineHeight: "0.5",
              }}
            >
              {team.domain}
            </span>
          </div>
        ))}
      </div>
      <div className="my-6">
        <div className="heading mb-3 text-center text-2xl font-bold">FAQ</div>
        {hackfestFAQ.map((faq, index) => (
          <FAQ key={index} title={faq.title}>
            {faq.answer}
          </FAQ>
        ))}
      </div>
    </div>
  );
};

const FAQ: FunctionComponent<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`mt-3 flex w-[30vh] items-center justify-between rounded-lg border border-gray-400 py-3 px-4 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:w-[50vh] lg:w-[80vh] ${
          isExpanded ? "bg-gray-50 dark:bg-gray-800" : ""
        }`}
      >
        <h2 className="font-medium lg:text-lg">{title}</h2>
        <div>
          {isExpanded ? <BiChevronUp size={30} /> : <BiChevronDown size={30} />}
        </div>
      </button>
      {isExpanded && (
        <div className="w-[30vh] rounded-xl border border-t-0 border-gray-400 p-4 text-center sm:w-[50vh] lg:w-[80vh]">
          <p className="text-sm text-gray-500">{children}</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
