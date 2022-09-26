import { events, eventTabs } from '../../components/constants';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../../components/button';
import Modal from '../../components/modal';

export default function Events() {
  const [toggleState, setToggleState] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [year, setYear] = useState('All');
  const handleOnClose = () => setShowModal(false);
  return (
    <div className="mt-32">
      <ul className="flex border-b border-gray-100">
        {eventTabs.map((tab, index) => (
          <li className="flex-1" key={index}>
            <a
              onClick={() => {setToggleState(index); setYear(tab)}}
              className="relative block p-4 cursor-pointer"
            >
              {toggleState === index ? (
                <span className="absolute inset-x-0 w-full h-px bg-yellow-400 -bottom-px"></span>
              ) : null}
              <div className="flex items-center justify-center">
                <span className="ml-3 text-sm md:text-lg font-medium text-gray-900">
                  {' '}
                  {tab}{' '}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-5 justify-center items-stretch my-5">
        {events.map((event, index) => (
          event.year === year || year === 'All'? (
          <div
            key={index}
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md"
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
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
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
        ): null))}
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
