import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useCallback, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';

function Team() {
  const { session, status } = useSession();
  const [teamData, setTeamData] = React.useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTeamData = async (status) => {
    if (status == 'authenticated') {
      const { data } = await fetchTeam();
      setTeamData(data[0]);
    }
  };
  useEffect(() => {
    fetchTeamData(status);
  }, [status]);
  return teamData ? (
    <div className="mt-10 p-5 mx-auto max-w-4xl  w-full bg-slate-400 dark:bg-slate-700 bg-opacity-10 dark:bg-opacity-10 rounded-xl backdrop-blur-md ">
      <h2 className="text-xl font-semibold heading w-full">{teamData.name}</h2>
      <p className="text-md text-gray-500 dark:text-gray-200 border-b-[0.5px] border-opacity-10 py-2">
        {teamData.description}
      </p>
      <div className="p-2 flex mt-2 transition-all flex-wrap justify-evenly items-center gap-5  ">
        {teamData.members.map((member, index) => (
          <Card
            key={index}
            name={member.name}
            img={member.image}
            teamLead={member.role === 'team-lead'}
          />
        ))}
      </div>
    </div>
  ) : null;
}

export default Team;

const Card = ({ teamLead, img, name }) => {
  return (
    <div className="w-48 cursor-pointer text-center p-3 bg-gray-200 dark:bg-black dark:bg-opacity-10  rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transform pointer ease-in-out duration-300 delay-50 h-[200px]">
      <Image
        alt={name}
        src={img}
        className=" rounded-[50%]"
        width={80}
        height={80}
      />
      <h5 className="font-semibold w-full">{name}</h5>
      {teamLead && (
        <div className="text-yellow-500 text-xl group inline-flex fixed top-1 left-1 ">
          <AiFillStar className="text-xl" />
          <span className="w-0 overflow-hidden transition-all group-hover:w-full text-xs whitespace-nowrap">
            Team Lead
          </span>
        </div>
      )}
    </div>
  );
};
const fetchTeam = async () => {
  const session = await getSession();
  const res = await axios.get('/api/read/teams?q=' + session.user.email);
  if (res.status == 200) {
    const data = await res.data;
    return data;
  } else {
    return null;
  }
};
