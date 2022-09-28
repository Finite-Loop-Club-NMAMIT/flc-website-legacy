import Image from "next/image";

export default function Modal({ visible, onClose, name, img, desc, type, date, attended, organizer }) {
  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };
  
  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="z-[60] pt-56 md:pt-0 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-lg flex justify-center items-center overflow-y-auto"
    >
      <div className="p-4">
        <div className="relative max-w-5xl p-6 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-sm">
          <button
            onClick={onClose}
            className="absolute p-1 text-black bg-white bg-opacity-70 borde rounded-full -top-1 -right-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Image
              alt="Laptop"
              src={img}
              className="w-full h-full rounded-xl"
              height={400}
              width={400}
            />
            <div className="flex flex-col gap-3 text-white">
              <h2 className="text-lg lg:text-2xl font-medium">{name}</h2>
              <a>Category: {type}</a>
              <a>Date: {date}</a>
              <a>Attended by: {attended}</a>
              <a>Organizers: {organizer}</a>
              <p className="mt-4 text-sm">
                <a className="text-lg text-white">Description</a>
                <div className="mt-2 pr-2">
                <a className="text-gray-200">
                {desc}
                </a>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
