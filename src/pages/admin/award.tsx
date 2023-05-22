import { type NextPage } from "next";
import withAdminRoute from "../../components/hoc/withAdminRoute";
import { Toaster, toast } from "react-hot-toast";
import { CertificateTypes } from "@prisma/client";
import { api } from "../../utils/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "../../components/loader";
import Button from "../../components/button";

const AwardCertificates: NextPage = () => {
  const events = api.eventRouter.getAllEvents.useQuery();
  const [selectedEvent, setSelectedEvent] = useState(events.data?.[0]?.id);
  const [selectedAward, setSelectedAward] = useState<CertificateTypes>(
    CertificateTypes.TeamParticipation
  );
  const [desc, setDesc] = useState("");

  const awardCertificates =
    api.certificateRouter.awardCertificates.useMutation();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const handleUserSelection = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleAwardCertificates = async () => {
    if (!selectedEvent) return toast.error("Please select an event");
    if (!selectedAward) return toast.error("Please select an award");
    if (!selectedUsers.length)
      return toast.error("Please select atleast one user");
    if (selectedAward === CertificateTypes.SpecialRecognition && !desc)
      return toast.error("Please enter a reason for special recognition");
    const loadingToast = toast.loading("Awarding certificates...");
    try {
      const input = {
        userIds: selectedUsers,
        eventId: selectedEvent,
        desc: selectedAward === CertificateTypes.SpecialRecognition ? desc : "",
        type: selectedAward,
      };

      await awardCertificates.mutateAsync(input);

      // Clear the selected users after successful awarding of certificates
      setSelectedUsers([]);
      toast.dismiss(loadingToast);
      toast.success("Certificates awarded successfully");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error awarding certificates");
    }
  };

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

  const members = data?.pages.flatMap((page) => page.users);

  const [isFetching, setIsFetching] = useState(false);

  const handleFetchNextPage = async () => {
    setIsFetching(true);
    await fetchNextPage();
    setIsFetching(false);
    setPage((prev) => prev + 1);
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target?.isIntersecting && data?.pages[page]?.nextCursor) {
        handleFetchNextPage().catch((error) => {
          console.error("Error fetching next page:", error);
        });
      }
    },
    [data, page]
  );

  const lastItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    let currentRef = lastItemRef.current;

    // Observe changes to the lastItemRef.current value and update the observer accordingly, because initial value will be null
    const updateObserver = () => {
      if (currentRef !== lastItemRef.current) {
        if (currentRef) {
          observer.unobserve(currentRef);
        }

        if (lastItemRef.current) {
          observer.observe(lastItemRef.current);
          currentRef = lastItemRef.current;
        }
      }
    };

    const timeoutId = setInterval(updateObserver, 1000);

    // Return cleanup function that clears the intrval and disconnects observer.
    return () => {
      clearInterval(timeoutId);
      observer.disconnect();
    };
  }, [handleObserver, lastItemRef]);

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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              className="w-full rounded-md border border-gray-400 px-2 py-1 md:w-64"
              disabled={selectedAward !== CertificateTypes.SpecialRecognition}
            />
          </label>
        )}
      </div>

      <div className="mx-10 mb-5 flex flex-col items-center justify-between rounded-md border border-gray-300 p-5">
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
          <Button onClick={handleAwardCertificates}>Award Certificates</Button>
          <p>Showing {members?.length} users.</p>
        </div>

        <div className="flex h-[40rem] w-full flex-col overflow-y-scroll">
          <div className="mt-5 flex items-center justify-between rounded-md border border-gray-300 p-5">
            <p className="w-1/12 text-center text-lg font-bold">No.</p>
            <p className="w-3/12 text-center text-lg font-bold">Username</p>
            <p className="w-4/12 text-center text-lg font-bold">Name</p>
            <p className="w-3/12 text-center text-lg font-bold">Email</p>
            <p className="w-1/12 text-center text-lg font-bold">Select</p>
          </div>
          {members?.map((member, i) => (
            <div
              ref={members?.length === i + 1 ? lastItemRef : null}
              key={member.id}
              onClick={() => handleUserSelection(member.id)}
              className={`mt-5 flex items-center justify-between rounded-md border border-gray-300 p-5 ${
                selectedUsers.includes(member.id)
                  ? "bg-yellow-300 dark:bg-gray-900"
                  : "hover:bg-gray-50 hover:dark:bg-gray-900"
              }`}
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
              <input
                type="checkbox"
                className="h-5 w-5 basis-1/12 rounded-md border border-gray-400 [checked:bg-yellow-600]"
                onChange={() => handleUserSelection(member.id)}
                checked={selectedUsers.includes(member.id)}
              />
            </div>
          ))}

          {members?.length === 0 && (
            <p className="text-center text-lg font-bold">No Users Found</p>
          )}

          {(isLoading || isFetching) && (
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
