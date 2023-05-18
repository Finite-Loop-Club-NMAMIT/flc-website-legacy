import Image from "next/image";
import { BsDownload } from "react-icons/bs";

const ParticipationCertificate = ({
  cid,
  name,
  eventName,
  date,
}: {
  cid: string;
  name: string;
  eventName: string;
  date: Date;
}) => {
  return (
    <section className="px-5 lg:px-10">
      <div className="relative border-4 border-yellow-500 bg-gray-50 py-28 dark:bg-black lg:border-8">
        <div className="absolute right-2 top-2 hidden bg-gray-50 p-2 text-xs text-gray-900 dark:bg-black dark:text-gray-300 sm:block sm:text-sm">
          Certificate ID: <span className="font-bold">{cid}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/flc_logo_crop.png"
              width={70}
              height={70}
              alt="flc_logo"
              className="h-10 w-10 md:h-20 md:w-20"
              priority
            />
            <a className="ml-3 flex cursor-pointer items-center text-lg text-black dark:text-gray-100 md:text-xl">
              Finite Loop Club
            </a>
          </div>

          <h1 className="mt-5 text-lg font-bold text-yellow-500 dark:text-yellow-300 sm:text-2xl lg:text-4xl">
            Certificate of Participation
          </h1>
        </div>
        <div className="flex flex-col justify-center text-center">
          <p className="mt-4 text-xs text-gray-800 dark:text-gray-300 sm:text-lg lg:text-xl">
            This certifies that
          </p>
          <h2 className="mt-2 text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-xl lg:text-2xl">
            <span className="border-b-2">{name}</span>
          </h2>
          <p className="mt-4 text-xs text-gray-800 dark:text-gray-300 sm:text-lg lg:text-xl">
            has successfully participated in
          </p>
          <h3 className="mt-2 text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-xl lg:text-2xl">
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

        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/assets/signature.png"
              width={100}
              height={100}
              alt="signature"
              className="h-10 w-10 bg-gray-50 dark:invert md:h-20 md:w-20"
              priority
            />

            <div className="flex flex-col items-center justify-center">
              <p className="text-xs text-gray-800 dark:text-gray-300 sm:text-lg lg:text-xl">
                <span className="border-b-2">Shashank Shetty</span>
              </p>
              <p className="mt-1 text-xs text-gray-800 dark:text-gray-300">
                Faculty Coordinator, Finite Loop Club
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipationCertificate;
