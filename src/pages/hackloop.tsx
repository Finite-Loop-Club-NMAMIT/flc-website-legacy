// import { useState } from "react";
// import ConfettiExplosion from "react-confetti-explosion";
// import Button from "../components/button";
import RevealWinner from "../components/winnerReveal";
import { hackloopTeams1st, hackloopTeams2nd } from "../components/constants";

export default function Hacklooop() {
  return (
    <div className="flex flex-col items-center">
      <RevealWinner
        winners={hackloopTeams2nd}
        title="Top teams from 2nd years"
      />
      <RevealWinner
        winners={hackloopTeams1st}
        title="Top teams from 1st years"
      />
    </div>
  );
}
