import { events, eventTabs } from '../../components/constants';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../../components/button';
import Modal from '../../components/modal';
import { Fade } from 'react-reveal';

export default function Events() {
  const [toggleState, setToggleState] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [year, setYear] = useState('All');
  const handleOnClose = () => setShowModal(false);
  useEffect(() => {
    showModal && (document.body.style.overflow = 'hidden');
    !showModal && (document.body.style.overflow = 'unset');
  }, [showModal]);
  return (
    <div className="">
      <ul className="flex border-b border-gray-100">
        {eventTabs.map((tab, index) => (
          <li className="flex-1" key={index}>
            <a
              onClick={() => {
                setToggleState(index);
                setYear(tab);
              }}
              className="relative block p-4 cursor-pointer"
            >
              {toggleState === index ? (
                <span className="absolute inset-x-0 w-full h-px bg-yellow-400 -bottom-px"></span>
              ) : null}
              <div className="flex items-center justify-center">
                <span className="ml-3 text-xs lg:text-sm md:text-lg font-light lg:font-medium text-black dark:text-white">
                  {' '}
                  {tab}{' '}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-5 justify-center items-stretch my-5">
        {events.map((event, index) =>
          event.year === year || year === 'All' ? (
            <Fade right>
              <div
                key={index}
                className="max-w-sm bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-md mx-5"
              >
                <a href="#">
                  <Image
                    className="rounded-t-lg"
                    src={event.image}
                    width={500}
                    height={400}
                    alt="event-pic"
                  />
                </a>
                <div className="flex flex-col text-center p-5">
                  <a href="#">
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
        img={modalData.image}
        name={modalData.name}
        desc={modalData.desc}
        attended={modalData.attended}
        date={modalData.date}
        organizer={modalData.organizer}
        type={modalData.type}
      />
    </div>
  );
}
