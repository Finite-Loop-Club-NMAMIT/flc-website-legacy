import Image from "next/image";

const ParticipationCertificate = ({
  name,
  eventName,
  date,
}: {
  name: string;
  eventName: string;
  date: Date;
}) => {
  return (
    <section className="pb-10 px-5 lg:px-10">
      <div className="border-4 lg:border-8 border-yellow-500 bg-gray-50 py-28 dark:bg-black">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/flc_logo_crop.png"
              width={70}
              height={70}
              alt="flc_logo"
              className="w-10 h-10 md:w-20 md:h-20"
              priority
            />
            <a className="ml-3 flex cursor-pointer items-center text-lg text-black dark:text-gray-100 md:text-xl">
              Finite Loop Club
            </a>
          </div>

          <h1 className="mt-5 text-lg sm:text-2xl lg:text-4xl font-bold text-yellow-500 dark:text-yellow-300">
            Certificate of Participation
          </h1>
        </div>
        <div className="flex flex-col justify-center text-center">
          <p className="mt-4 text-xs sm:text-lg lg:text-xl text-gray-800 dark:text-gray-300">
            This certifies that
          </p>
          <h2 className="mt-2 text-sm sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
            <span className="border-b-2">{name}</span>
          </h2>
          <p className="mt-4 text-xs sm:text-lg lg:text-xl text-gray-800 dark:text-gray-300">
            has successfully participated in
          </p>
          <h3 className="mt-2 text-sm sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
            {eventName}{" "}
            <span className="font-normal text-gray-800 dark:text-gray-300">
              on{" "}
            </span>
            {new Date(date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default ParticipationCertificate;
