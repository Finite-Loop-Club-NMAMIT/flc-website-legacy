import Link from "next/link";
import React, { useState, type FunctionComponent } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { api } from "../../utils/api";
import Button from "../button";
import { type User } from "@prisma/client";
import BlurImage from "../blurImage";

type TeamProps = {
  userRole: string;
  email: string;
};

type CardProps = {
  teamLead: boolean;
  name: string;
  img: string;
  username: string;
};

type Team = {
  id: number;
  name: string;
  description: string;
  members: User[];
};

const Team: FunctionComponent<TeamProps> = ({ userRole, email }) => {
  const [teamData, setTeamData] = useState<Team>({} as Team);
  const [name, setName] = React.useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleEditClick = () => {
    setShowForm(true);
  };

  const getTeamMembers = api.teamRouter.getTeamMembers.useQuery(
    {
      email: email,
    },
    {
      onSuccess: (data) => {
        if (data != undefined) setTeamData(data[0] as Team);
      },
    }
  );

  const updateTeam = api.teamRouter.updateTeamInfo.useMutation();

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
          {userRole === "team-lead" && showForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTeam.mutate(
                  {
                    teamId: teamData.id,
                    name: name,
                    description: description,
                  },
                  {
                    onSuccess: () => {
                      getTeamMembers
                        .refetch()
                        .then(() => {
                          toast.success("Team Updated");
                          setShowForm(false);
                        })
                        .catch(() => {
                          toast.error("Error fetching members");
                          setShowForm(false);
                        });
                    },
                    onError: () => {
                      toast.error("Error Updating Team");
                    },
                  }
                );
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
                defaultValue={teamData.name}
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
                defaultValue={teamData.description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pr-12 shadow-sm"
              />
              <br />
              <Button>Update</Button>
            </form>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-evenly gap-5 p-2 transition-all ">
            {teamData?.members?.map((member, index) => (
              <Card
                key={index}
                name={member.name as string}
                img={member.image as string}
                teamLead={member.role === "team-lead"}
                username={member.username as string}
              />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default Team;

const Card: FunctionComponent<CardProps> = ({
  teamLead,
  img,
  name,
  username,
}) => {
  return (
    <div className="pointer delay-50 h-[200px] w-48 transform cursor-pointer rounded-xl  bg-gray-200 p-3 text-center shadow-sm duration-300 ease-in-out hover:scale-105 hover:shadow-lg dark:bg-black dark:bg-opacity-10">
      <div className="mb-2 flex justify-center">
        <BlurImage
          alt={name}
          src={img}
          className="rounded-[50%]"
          width={80}
          height={80}
        />
      </div>
      <Link href={`/u/${username}`} className="w-full font-semibold">
        {name}
      </Link>
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
