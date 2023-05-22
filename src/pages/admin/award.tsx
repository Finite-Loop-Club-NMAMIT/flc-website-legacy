import { type NextPage } from "next";
import withAdminRoute from "../../components/hoc/withAdminRoute";
import { Toaster } from "react-hot-toast";
import { CertificateTypes } from "@prisma/client";
import { api } from "../../utils/api";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "../../components/loader";
import Button from "../../components/button";

const AwardCertificates: NextPage = () => {
  const events = api.eventRouter.getAllEvents.useQuery();
  const [selectedEvent, setSelectedEvent] = useState(events.data?.[0]?.id);
  const [selectedAward, setSelectedAward] = useState<CertificateTypes>(
    CertificateTypes.TeamParticipation
  );
  const [selectedSpecialRecognition, setSelectedSpecialRecognition] =
    useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(0);

  const { data, fetchNextPage, isLoading } =
    api.userRouter.getMembers.useInfiniteQuery(
      {
        limit: 10,
        searchTerms: searchTerm,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const members = data?.pages.flatMap((page) => page.users);

  return (
    <div className="mb-5">
      <Toaster />
      <h4 className="heading mb-5 text-center text-2xl font-bold">
        Award Certificates
      </h4>
      <div className="mx-10 mb-5 flex flex-col items-center justify-between rounded-md border border-gray-300 p-5 md:flex-row">
        <label className="flex flex-col text-center">
          Event
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(Number(e.target.value))}
            className="ml-5 mt-2 w-32 rounded-md border border-gray-400 px-2 py-1 md:w-64"
          >
            {events.data
              ?.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
              })
              .map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
          </select>
        </label>
        <label className="mt-3 flex flex-col text-center md:mt-0">
          Award
          <select
            value={selectedAward}
            onChange={(e) =>
              setSelectedAward(e.target.value as CertificateTypes)
            }
            className="ml-5 mt-2 w-32 rounded-md border border-gray-400 px-2 py-1 md:w-64"
          >
            {Object.values(CertificateTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        {selectedAward === CertificateTypes.SpecialRecognition && (
          <label className="mt-3 flex flex-col text-center">
            Special Recognition for
            <input
              value={selectedSpecialRecognition}
              onChange={(e) => setSelectedSpecialRecognition(e.target.value)}
              type="text"
              className="w-full rounded-md border border-gray-400 px-2 py-1 md:w-64"
              disabled={selectedAward !== CertificateTypes.SpecialRecognition}
            />
          </label>
        )}
      </div>

      <div className="mx-10 mb-5 flex flex-col items-center justify-between rounded-md border border-gray-300 p-5">
        {/* Users Paginated table with Search bar */}

        <div className="relative flex w-full items-center justify-between">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <AiOutlineSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            className="block w-96 rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search Users by their Name, Username or Email"
            required
          />
          <p>Showing {members?.length} users.</p>
        </div>

        <div className="flex w-full flex-col">
          {members?.map((member, i) => (
            <div
              key={member.id}
              className="mt-5 flex items-center justify-between rounded-md border border-gray-300 p-5"
            >
              <p className="basis-1/12 text-center text-lg font-bold">
                {i + 1}
              </p>
              <p className="basis-3/12 text-center text-lg font-bold">
                {member.username}
              </p>
              <p className="basis-4/12 text-center text-lg font-bold">
                {member.name}
              </p>
              <p className="basis-3/12 text-center text-lg font-bold">
                {member.email}
              </p>
              <input type="checkbox" className="h-5 w-5 basis-1/12" />
            </div>
          ))}
          {members?.length === 0 && (
            <p className="text-center text-lg font-bold">No Users Found</p>
          )}

          <div className="mt-5">
            <Button onClick={handleFetchNextPage}>
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          </div>

          {isLoading && (
            <div className="mt-5 flex justify-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAdminRoute(AwardCertificates);
