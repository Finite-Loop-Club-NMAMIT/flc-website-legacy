import Image from "next/image";
import React, { useState, useEffect, type FunctionComponent } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import Button from "../button";

type TeamProps = {
  userRole: string;
  email: string;
};

type CardProps = {
  teamLead: boolean;
  name: string;
  img: string;
};

const Team: FunctionComponent<TeamProps> = ({ userRole, email }) => {
  const [teamData, setTeamData] = useState(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleEditClick = () => {
    setShowForm(true);
  };

  const fetchTeam = async () => {
    await fetch("/api/read/teams?q=" + email)
      .then((res) => res.json())
      .then((data) => {
        setTeamData(data.data[0]);
        setName(data.data[0].name);
        setDescription(data.data[0].description);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTeam = async (name, description) => {
    const res = await fetch("/api/update/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        teamName: teamData.name,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message === "Team Updated") {
      toast.success("Team Updated");
      fetchTeam();
      setShowForm(false);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    teamData && (
      <>
        <Toaster />
        <div className="mx-auto mt-10 w-full max-w-4xl  rounded-xl bg-slate-400 bg-opacity-10 p-5 backdrop-blur-md dark:bg-slate-700 dark:bg-opacity-10 ">
          <div className="flex">
            <h2 className="heading w-full text-xl font-semibold">
              {teamData.name}
            </h2>
            {!showForm && userRole === "team-lead" ? (
              <button onClick={handleEditClick}>
                <BsPencilSquare />
              </button>
            ) : null}
          </div>
          <p className="text-md py-2 text-gray-500 dark:text-gray-200">
            {teamData.description}
          </p>
          {userRole === "team-lead" ? (
            showForm ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateTeam(name, description);
                }}
                className="text-md mb-3"
              >
                <label htmlFor="name" className="text-md">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 shadow-sm"
                />
                <br />
                <label htmlFor="description" className="text-md">
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 shadow-sm"
                />
                <br />
                <Button type="submit">Update</Button>
              </form>
            ) : null
          ) : null}
          <div className="mt-2 flex flex-wrap items-center justify-evenly gap-5 p-2 transition-all ">
            {teamData?.members?.map((member, index) => (
              <Card
                key={index}
                name={member.name}
                img={member.image}
                teamLead={member.role === "team-lead"}
              />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default Team;

const Card: FunctionComponent<CardProps> = ({ teamLead, img, name }) => {
  return (
    <div className="pointer delay-50 h-[200px] w-48 transform cursor-pointer rounded-xl  bg-gray-200 p-3 text-center shadow-sm duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:bg-black dark:bg-opacity-10">
      <div className="mb-2 flex justify-center">
        <Image
          alt={name}
          src={img}
          className="rounded-[50%]"
          width={80}
          height={80}
        />
      </div>
      <h5 className="w-full font-semibold">{name}</h5>
      {teamLead && (
        <div className="group fixed top-1 left-1 inline-flex text-xl text-yellow-500 ">
          <AiFillStar className="text-xl" />
          <span className="w-0 overflow-hidden whitespace-nowrap text-xs transition-all group-hover:w-full">
            Team Lead
          </span>
        </div>
      )}
    </div>
  );
};
