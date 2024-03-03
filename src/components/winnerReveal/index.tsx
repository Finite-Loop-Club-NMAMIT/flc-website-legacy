import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Button from "../button";

export default function RevealWinner({
  winners,
  title = "Top 15 Shortlisted teams",
}: {
  winners: { name: string; domain: string }[];
  title?: string;
}) {
  const [isExploding, setIsExploding] = useState(false);
  const [revealIndex, setRevealIndex] = useState(-1);

  const handleReveal = () => {
    for (let i = 0; i < winners.length; i++) {
      setTimeout(() => {
        setRevealIndex(i);
      }, i * 1000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isExploding && <ConfettiExplosion duration={5000} force={0.1} />}
      <h1 className="heading mb-3 text-center text-2xl font-bold lg:text-4xl">
        {title}
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
        {winners.map((team, index) => (
          <div
            key={index}
            className={`${
              index <= revealIndex
                ? "scale-100  text-yellow-500 blur-0"
                : "scale-110 blur-lg"
            } text-md m-2 w-96 max-w-xs rounded-xl border border-gray-500 p-5 font-bold duration-700 ease-in-out hover:scale-[1.05] lg:text-xl`}
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
    </div>
  );
}
