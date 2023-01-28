import { type FunctionComponent, useState } from "react";
import { teamTabs } from "../constants";
import Image from "next/image";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import { type CoreFilter } from "@prisma/client";
import { api } from "../../utils/api";

const Core: FunctionComponent = () => {
  const [toggleState, setToggleState] = useState(3);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [filter, setFilter] = useState<CoreFilter>(
    teamTabs[toggleState] as CoreFilter
  );
  const members = api.coreRouter.getCoreMembers.useQuery({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
          {members.isLoading && (
            <svg
              aria-hidden="true"
              className="h-8 w-8 animate-spin fill-yellow-600 text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
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
                          />
                        </div>
                        <div className="mt-6 text-center">
                          <h1 className="mb-1 text-xl font-bold text-black dark:text-gray-200">
                            {member.name}
                          </h1>

                          <div className="textgray-600 mb-2 font-light dark:text-gray-300">
                            {member.role}
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
