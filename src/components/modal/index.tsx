import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import { type FunctionComponent } from "react";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  name: string;
  img: string;
  desc: string;
  type: string;
  date: string;
  attended: string;
  organizer: string;
};

const Modal: FunctionComponent<ModalProps> = ({
  visible,
  onClose,
  name,
  img,
  desc,
  type,
  date,
  attended,
  organizer,
}) => {
  const handleOnClose = (element: HTMLDivElement) => {
    if (element.id === "container") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={(e) => handleOnClose(e.target as HTMLDivElement)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 pt-56 backdrop-blur-lg md:pt-0"
    >
      <Fade>
        <div className="p-4">
          <div className="relative max-w-5xl rounded-lg bg-white bg-opacity-30 p-6 shadow-sm backdrop-blur-lg backdrop-filter">
            <button
              onClick={onClose}
              className="borde absolute -top-1 -right-1 rounded-full bg-white bg-opacity-70 p-1 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Image
                alt="Laptop"
                src={img}
                className="h-full w-full rounded-xl"
                height={500}
                width={500}
              />
              <div className="flex flex-col gap-3 text-white">
                <h2 className="text-lg font-medium lg:text-2xl">{name}</h2>
                <a>Category: {type}</a>
                <a>Date: {date}</a>
                <a>Attended by: {attended}</a>
                <a>Organizers: {organizer}</a>
                <p className="mt-4 text-sm">
                  <a className="text-lg text-white">Description</a>
                  <div className="mt-2 pr-2">
                    <a className="text-gray-200">{desc}</a>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Modal;
