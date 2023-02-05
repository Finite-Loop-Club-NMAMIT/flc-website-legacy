import { eventTabs } from "../../components/constants";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { type FunctionComponent } from "react";
import { type EventFilter } from "@prisma/client";
import { api } from "../../utils/api";

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
  const [toggleState, setToggleState] = useState<number>(4);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalProps>({} as ModalProps);
  const [year, setYear] = useState(undefined as EventFilter | undefined);
  const handleOnClose = () => setShowModal(false);

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
        {events.data &&
          events.data.map((event, index) =>
            event.filter === year || year === undefined ? (
              <div
                key={index}
                className="mx-5 max-w-sm rounded-lg bg-white bg-opacity-30 shadow-md backdrop-blur-lg backdrop-filter"
              >
                <a>
                  <Image
                    className="rounded-t-lg"
                    src={event.image}
                    width={500}
                    height={500}
                    alt="event-pic"
                    style={{ objectFit: "cover", height: "500px" }}
                    blurDataURL={event.image}
                  />
                </a>
                <div className="flex flex-col p-5 text-center">
                  <a>
                    <h5 className="mb-5 text-xl font-bold tracking-tight text-black dark:text-white">
                      {event.name}
                    </h5>
                  </a>
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
            ) : null
          )}
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
      </div>
    </div>
  );
};

export default EventList;
