import { type NextPage } from "next";
import withAdminRoute from "../../components/hoc/withAdminRoute";
import { Toaster } from "react-hot-toast";
import { api } from "../../utils/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "../../components/loader";
import Button from "../../components/button";
import { extractStudentDetailsFromEmail } from "../../utils/details";

interface FormType {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  isMember: boolean;
  languages: string[];
  skills: string[];
  expectations: string;
  whyJoin: string;
  yearOfReg: number;
}

const Registrations: NextPage = () => {
  const count = api.registrationRouter.getRegistrationCount.useQuery({
    yearOfReg: 2023,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(0);

  const { data, fetchNextPage, isLoading } =
    api.registrationRouter.getFormResponses.useInfiniteQuery(
      {
        limit: 10,
        searchTerms: searchTerm,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const forms = data?.pages.flatMap((page) => page.forms);

  const [isFetching, setIsFetching] = useState(false);

  const [selectedForm, setSelectedForm] = useState<FormType>();

  const [showModal, setShowModal] = useState(false);

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
    [data, page],
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
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          selectedForm={selectedForm as FormType}
        />
      )}
      <Toaster />
      <h4 className="heading mb-5 text-center text-2xl font-bold">
        Registrations
      </h4>

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
          <p className="font-bold">{count.data ?? 0} Registrations completed</p>
          <p className="font-bold">Showing {forms?.length} Form Responses</p>
        </div>

        <div className="flex h-[40rem] w-full flex-col overflow-y-scroll">
          <div className="mt-5 flex items-center justify-between rounded-md border border-gray-300 p-5">
            <p className="w-1/12 text-center text-lg font-bold">No.</p>
            <p className="w-3/12 text-center text-lg font-bold">Name</p>
            <p className="w-2/12 text-center text-lg font-bold">Year</p>
            <p className="w-2/12 text-center text-lg font-bold">Branch</p>
            <p className="w-2/12 text-center text-lg font-bold">
              Payment Status
            </p>
            <p className="w-2/12 text-center text-lg font-bold">
              View Response
            </p>
          </div>
          {forms?.map((form, i) => (
            <div
              ref={forms?.length === i + 1 ? lastItemRef : null}
              key={form.id}
              className={`mt-5 flex items-center justify-between rounded-md border border-gray-300 p-5 `}
            >
              <p className="basis-1/12 text-center text-lg font-bold">
                {i + 1}
              </p>
              <p className="basis-3/12 text-center text-lg font-bold">
                {form.User.name}
              </p>
              <p className="basis-2/12 text-center text-lg font-bold">
                {extractStudentDetailsFromEmail(form.User.email as string).year}
              </p>
              <p className="basis-2/12 text-center text-lg font-bold">
                {extractStudentDetailsFromEmail(
                  form.User.email as string,
                ).branch.toUpperCase()}
              </p>
              <p
                className={`basis-2/12 rounded-lg border text-center text-lg font-bold ${
                  form.User.isMember ? "border-green-300" : "border-red-400"
                }`}
              >
                {form.User.isMember ? "Paid" : "Not Paid"}
              </p>
              <p className="basis-2/12 text-center text-lg font-bold">
                <Button
                  onClick={() => {
                    setSelectedForm({
                      email: form.User.email!,
                      name: form.User.name!,
                      phone: form.User.phone!,
                      //eslint-disable-next-line
                      github: JSON.parse(form.User.links!).find(
                        (link: { platform: string; link: string }) =>
                          link.platform === "Github",
                      )?.link,
                      //eslint-disable-next-line
                      linkedin: JSON.parse(form.User.links!).find(
                        (link: { platform: string; link: string }) =>
                          link.platform === "LinkedIn",
                      )?.link,
                      isMember: form.User.isMember,
                      expectations: form.expectations,
                      languages: form.languages as string[],
                      skills: form.skills as string[],
                      whyJoin: form.whyJoin,
                      yearOfReg: form.yearOfReg,
                    });
                    setShowModal(true);
                  }}
                >
                  View
                </Button>
              </p>
            </div>
          ))}

          {forms?.length === 0 && (
            <p className="mt-5 text-center text-lg font-bold">
              No Responses Found
            </p>
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

const Modal = ({
  setShowModal,
  selectedForm,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedForm: FormType;
}) => {
  return (
    <div className="fixed inset-0 z-10 mt-20 h-[100%] overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-30 dark:opacity-70"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-white bg-opacity-50 p-4 shadow-lg backdrop-blur-lg backdrop-filter">
          <Button
            className="fixed right-0 top-0 m-2 rounded-full bg-opacity-70 text-white"
            onClick={() => setShowModal(false)}
          >
            X
          </Button>
          <div className="flex flex-col gap-4">
            <p>
              <span className="font-bold">Name:</span> {selectedForm.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {selectedForm.email}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {selectedForm.phone}
            </p>
            <p>
              <span className="font-bold">Paid:</span>{" "}
              <span
                className={
                  selectedForm.isMember ? "text-green-500" : "text-red-500"
                }
              >
                {selectedForm.isMember ? "Yes" : "No"}
              </span>
            </p>
            <a className="underline" href={selectedForm.github}>
              Github Profile
            </a>
            <a className="underline" href={selectedForm.linkedin}>
              LinkedIn Profile
            </a>
            <p>
              <span className="font-bold">Skills:</span>
              {selectedForm.skills.join(', ')}
            </p>
            <p>
              <span className="font-bold">Programming Languages known:</span>{" "}
              {selectedForm.languages.join(', ')}
            </p>
            <p>
              <span className="font-bold">
                What are your expectations from FLC?
              </span>
              <br /> {selectedForm.expectations}
            </p>
            <p>
              <span className="font-bold">Why did you want to join FLC?</span>
              <br />
              {selectedForm.whyJoin}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAdminRoute(Registrations);
