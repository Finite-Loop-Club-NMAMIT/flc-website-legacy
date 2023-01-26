import { events, eventTabs } from "../../components/constants";
import { useState, useEffect, type FunctionComponent } from "react";
import Image from "next/image";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { Fade } from "react-awesome-reveal";

type ModalData = {
  image: string;
  name: string;
  desc: string;
  attended: string;
  date: string;
  organizer: string;
  type: string;
};

const Events: FunctionComponent = () => {
  const [toggleState, setToggleState] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({} as ModalData);
  const [year, setYear] = useState<string>("All");

  const handleOnClose = () => setShowModal(false);

  useEffect(() => {
    showModal && (document.body.style.overflow = "hidden");
    !showModal && (document.body.style.overflow = "unset");
  }, [showModal]);

  return (
    <div>
      <ul className="flex flex-wrap justify-center">
        {eventTabs.map((tab, index) => (
          <li key={index}>
            <a
              onClick={() => {
                setToggleState(index);
                setYear(tab);
              }}
              className="relative block cursor-pointer p-4"
            >
              {toggleState === index ? (
                <span className="absolute inset-x-0 -bottom-px h-px w-full bg-yellow-400"></span>
              ) : null}
              <div className="flex items-center justify-center">
                <span className="ml-3 text-xs font-light text-black dark:text-white md:text-lg lg:text-sm lg:font-medium">
                  {" "}
                  {tab}{" "}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="my-5 flex flex-wrap items-stretch justify-center gap-5">
        {events.map((event, index) =>
          event.year === year || year === "All" ? (
            <Fade cascade key={index}>
              <div className="mx-5 max-w-sm rounded-lg bg-white bg-opacity-30 shadow-md backdrop-blur-lg backdrop-filter">
                <a>
                  <Image
                    className="rounded-t-lg"
                    src={event.image}
                    width={500}
                    height={500}
                    alt="event-pic"
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
                      setModalData(event);
                    }}
                  >
                    <Button>Know more</Button>
                  </div>
                </div>
              </div>
            </Fade>
          ) : null
        )}
      </div>

      <Modal
        onClose={handleOnClose}
        visible={showModal}
        img={modalData?.image}
        name={modalData?.name}
        desc={modalData?.desc}
        attended={modalData?.attended}
        date={modalData?.date}
        organizer={modalData?.organizer}
        type={modalData?.type}
      />
    </div>
  );
};

export default Events;
