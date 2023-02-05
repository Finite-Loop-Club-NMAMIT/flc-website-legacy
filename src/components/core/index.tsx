import { type FunctionComponent, useState } from "react";
import { teamTabs } from "../constants";
import Image from "next/image";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import { type CoreFilter } from "@prisma/client";
import { api } from "../../utils/api";
import Loader from "../loader";

const Core: FunctionComponent = () => {
  const [toggleState, setToggleState] = useState(3);

  const [filter, setFilter] = useState<CoreFilter>(
    teamTabs[toggleState] as CoreFilter
  );

  const members = api.coreRouter.getCoreMembers.useQuery({
    filter: filter,
  });

  return (
    <>
      <div className="mb-10">
        <div className="mb-10 flex flex-wrap justify-center text-center">
          <Fade>
            <div className="w-full px-4">
              <h1 className="heading mb-3 text-4xl font-bold">Meet the Team</h1>
              <p className="text-lg text-black dark:text-gray-200">
                Dynamic and Agile
              </p>
            </div>
          </Fade>
        </div>
        <ul className="flex flex-wrap justify-center">
          {teamTabs.map((tab, index) => (
            <li key={index}>
              <a
                onClick={() => {
                  setToggleState(index);
                  setFilter(tab as CoreFilter);
                }}
                className="relative block cursor-pointer p-4"
              >
                {toggleState === index ? (
                  <span className="absolute inset-x-0 -bottom-px h-px w-full bg-yellow-400"></span>
                ) : null}
                <div className="flex items-center justify-center">
                  <span className="ml-3 text-xs font-light text-black dark:text-gray-200 md:text-lg lg:text-sm lg:font-medium">
                    {tab.replace("Year", "").replace("to", " - ")}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap justify-center gap-10">
          {members.isLoading && <Loader />}
          {members.data &&
            members.data.map(
              (member, index) =>
                member.filter === filter && (
                  <div key={index}>
                    <div className="mb-6 w-full px-6 sm:px-6 lg:px-4">
                      <div className="flex flex-col">
                        <div className="mx-auto transition duration-500 hover:scale-[1.03]">
                          <Image
                            className="rounded-2xl object-cover drop-shadow-md transition-all delay-100 duration-200 hover:drop-shadow-2xl"
                            src={member.img}
                            width={350}
                            height={350}
                            alt={member.name}
                            style={{ objectFit: "cover", height: "350px" }}
                            blurDataURL={member.img}
                          />
                        </div>
                        <div className="mt-6 text-center">
                          <h1 className="mb-1 text-xl font-bold text-black dark:text-gray-200">
                            {member.name}
                          </h1>

                          <div className="textgray-600 mb-2 font-light dark:text-gray-300">
                            {member.role.replace(/([A-Z])/g, " $1")}
                          </div>
                          <div
                            className="flex items-center justify-center opacity-50 transition-opacity
                          duration-300 hover:opacity-100"
                          >
                            {member.linkedin && (
                              <Link
                                passHref
                                href={member.linkedin}
                                className="flex h-10 w-10  items-center justify-center rounded-full hover:bg-indigo-50 hover:text-blue-700"
                              >
                                <AiFillLinkedin className="text-2xl" />
                              </Link>
                            )}

                            {member.github && (
                              <Link
                                passHref
                                href={member.github}
                                className="flex h-10 w-10  items-center justify-center rounded-full hover:bg-gray-50 hover:text-black"
                              >
                                <AiFillGithub className="text-2xl" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
      <hr className="border-gray-500/50" />
    </>
  );
};

export default Core;
