import { eventTabs } from "../../components/constants";
import { useState, useEffect } from "react";
import BlurImage from "../blurImage";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { type FunctionComponent } from "react";
import { type EventFilter } from "@prisma/client";
import { api } from "../../utils/api";
import Loader from "../../components/loader";

import toast, { Toaster } from "react-hot-toast";
import RegisterEventBtn from "../registerEventBtn";
import { Slide } from "react-awesome-reveal";
import { extractStudentName } from "../../utils/name";
import { extractStudentDetailsFromEmail } from "../../utils/details";
import { useSession } from "next-auth/react";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  name: string;
  img: string;
  desc: string;
  type: string;
  date: Date;
  attended: number;
  organizer: string;
};

const EventList: FunctionComponent = () => {
  const [toggleState, setToggleState] = useState<number>(eventTabs.length - 1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalProps>({} as ModalProps);
  const [year, setYear] = useState(undefined as EventFilter | undefined);
  const handleOnClose = () => setShowModal(false);
  const { data:session, status } = useSession();
  const [showRegister,setShowRegister] = useState<boolean>(false);
  const [eventId,setEventId] = useState<number>(0);

  useEffect(() => {
    showModal && (document.body.style.overflow = "hidden");
    !showModal && (document.body.style.overflow = "unset");
  }, [showModal]);

  const events = api.eventRouter.getEvents.useQuery({
    filter: year as EventFilter,
  });

  return (
    <div className="">
      <ul className="flex flex-wrap justify-center">
        {eventTabs.map((tab, index) => (
          <li key={index}>
            <a
              onClick={() => {
                setToggleState(index);
                {
                  tab === "All"
                    ? setYear(undefined)
                    : setYear(tab as EventFilter);
                }
              }}
              className="relative block cursor-pointer p-4"
            >
              {toggleState === index ? (
                <span className="absolute inset-x-0 -bottom-px h-px w-full bg-yellow-400"></span>
              ) : null}
              <div className="flex items-center justify-center">
                <span className="ml-3 text-xs font-light text-black dark:text-white md:text-lg lg:text-sm lg:font-medium">
                  {" "}
                  {tab.replace("Year", "").replace("to", " - ")}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="my-5 flex flex-wrap items-stretch justify-center gap-5">
        {events.isLoading && <Loader />}
        {events.data &&
          events.data
            .filter((event) => event.filter === year || year === undefined)
            .sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return dateB - dateA;
            })
            .map((event, index) => (
              <div
                key={index}
                className="relative mx-5 w-[360px] rounded-lg bg-white bg-opacity-30 shadow-md backdrop-blur-lg backdrop-filter"
              >
                <a>
                  <BlurImage
                    src={event.image}
                    width={500}
                    height={500}
                    alt="event-pic"
                    style={{ width: "100%", height: "380px" }}
                    className="w-full rounded-t-lg"
                  />
                </a>

                <div className="flex flex-col p-5 text-center">
                  <a>
                    <h5 className="mb-5 text-xl font-bold tracking-tight text-black dark:text-white">
                      {event.name}
                    </h5>
                  </a>
                  { 
                    event.isAvailable &&
                    <RegisterEventBtn eventId={event.id} status={status} showModal={()=>setShowRegister(true)} setEventId={()=>setEventId(event.id)} />
                  }
                  <div
                    onClick={() => {
                      setShowModal(true);
                      setModalData({
                        visible: true,
                        onClose: handleOnClose,
                        name: event.name,
                        img: event.image,
                        desc: event.description,
                        type: event.type,
                        date: event.date,
                        attended: event.attended,
                        organizer: event.organizer,
                      });
                    }}
                  >
                    <Button>Know more</Button>
                  </div>
                </div>
              </div>
            ))}

        <Modal
          onClose={handleOnClose}
          visible={showModal}
          img={modalData.img}
          name={modalData.name}
          desc={modalData.desc}
          attended={modalData.attended}
          date={modalData.date}
          organizer={modalData.organizer}
          type={modalData.type}
        />
        <RegisterModal visible={showRegister} onClose={() => setShowRegister(false)} eventId={eventId} username={session?.user?.name} email={session?.user?.email} />
        <Toaster/>
      </div>
    </div>
  );
};

export default EventList;

type RegisterModalProps = {
  visible: boolean;
  onClose: () => void;
  eventId: number;
  username: string | null | undefined;
  email: string | null | undefined;
};


const RegisterModal: React.FC<RegisterModalProps> = ({ visible, onClose, username, email, eventId }) => {
  const handleOnClose = (element: HTMLDivElement) => {
      if (element.id === "container") onClose();
  };

  if (!visible) return null;

  const name = extractStudentName(username as string);
  const { branch, usn, year } = extractStudentDetailsFromEmail(email as string);
  const eventRegister = api.eventRouter.registerToEvent.useMutation();

  return (
      <div
          id="container"
          onClick={(e) => handleOnClose(e.target as HTMLDivElement)}
          className="fixed inset-0 flex justify-center bg-black bg-opacity-70 backdrop-blur-lg p-1 md:p-5 z-50 overflow-y-scroll "
      >
          <Slide triggerOnce direction="down" >
              <div className="p-4">
                  <div className="relative  max-w-5xl rounded-xl bg-white bg-opacity-30 p-6 shadow-sm backdrop-blur-lg backdrop-filter ">
                      <button
                          onClick={onClose}
                          className=" border absolute  top-0 right-0 rounded-full bg-opacity-70 p-1 text-white"
                      >
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                          >
                              <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                              />
                          </svg>
                      </button>

                      <h1 className="text-3xl text-yellow-400 text-center mb-8 mx-4">Confirm Registration</h1>
                      <p className="text-gray-200 mb-4 max-w-sm">
                          Confirm that the below details are correct before submit.
                          Any changes in the personal information, update your profile!!
                      </p>
                      <div className="grid grid-cols-4 gap-2 items-center">
                          <span className="text-white col-span-1">Name:</span>
                          <input className="rounded-lg border-2 border-gray-300 p-2 col-span-3" type="text" value={name} disabled />
                          <span className="text-white col-span-1">USN:</span>
                          <input className="rounded-lg border-2 border-gray-300 p-2 col-span-3" type="text" value={usn} disabled />
                          <span className="text-white col-span-1">Branch:</span>
                          <input className="rounded-lg border-2 border-gray-300 p-2 col-span-3 uppercase" type="text" value={branch} disabled />
                          <span className="text-white col-span-1">Year:</span>
                          <input className="rounded-lg border-2 border-gray-300 p-2 col-span-3" type="text" value={'20' + year} disabled />
                      </div>

                      <Button className="flex mx-auto mt-4"
                          onClick={() => {
                              eventRegister.mutate({
                                  eventId
                              },
                                  {
                                      onSuccess: () => {
                                          toast.success("Registered to event successfully!!");
                                          onClose();
                                      },
                                      onError: () => {
                                          toast.error("Couldnot register to the event!!")
                                      }
                                  })
                          }}
                      >Confirm Registration</Button>
                  </div>
              </div>
          </Slide>
      </div>
  )
}
