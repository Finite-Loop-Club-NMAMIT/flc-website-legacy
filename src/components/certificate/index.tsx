import { type CertificateTypes } from "@prisma/client";
import Image from "next/image";

const CertificateTemplate = ({
  cid,
  name,
  eventName,
  date,
  type,
  desc,
}: {
  cid: string;
  name: string;
  eventName: string;
  date: Date;
  type: CertificateTypes;
  desc?: string;
}) => {
  return (
    <section className="px-5 lg:px-10">
      <div className="relative border-4 border-yellow-500 bg-gray-50 py-28 dark:bg-black lg:border-8">
        <div className="absolute right-2 top-2 hidden bg-gray-50 p-2 text-xs text-gray-900 dark:bg-black dark:text-gray-300 sm:block sm:text-sm">
          Certificate ID: <span className="font-bold">{cid}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-5 flex w-full flex-col-reverse items-center justify-between gap-5 md:w-1/2 md:flex-row md:gap-0">
            <div className="flex">
              <Image
                src="/assets/flc_logo_crop.png"
                width={70}
                height={70}
                alt="flc_logo"
                className="h-10 w-10"
                priority
              />
              <a className="ml-3 flex cursor-pointer items-center text-lg text-black dark:text-gray-100 md:text-xl">
                Finite Loop Club
              </a>
            </div>

            <Image
              src="/assets/nitte-nmamit-logo.png"
              width={200}
              height={200}
              alt="nmamit_logo"
              className="dark:brightness-200"
              priority
            />
          </div>

          <h1 className="mt-5 font-serif text-lg font-bold text-yellow-500 dark:text-yellow-300 sm:text-2xl lg:text-5xl">
            Certificate of{" "}
            {type === "Winner" || type === "RunnerUp"
              ? "Achievement"
              : type === "SpecialRecognition"
              ? "Special Recognition"
              : "Participation"}
          </h1>
        </div>
        <div className="flex flex-col justify-center text-center">
          <p className="mt-4 text-xs text-gray-800 dark:text-gray-300 sm:text-lg lg:text-xl">
            This certifies that
          </p>
          <h2 className="mt-2 text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-xl lg:text-2xl">
            <span className="border-b-2 font-serif">{name}</span>
          </h2>
          <p className="mt-4 text-xs text-gray-800 dark:text-gray-300 sm:text-lg lg:text-xl">
            has{" "}
            {type === "Winner" || type === "RunnerUp"
              ? "won"
              : type === "SpecialRecognition"
              ? "been awarded a Special Recognition"
              : "participated"}{" "}
            {type === "Winner"
              ? "First Place"
              : type === "RunnerUp"
              ? "Second Place"
              : ""}{" "}
            {type === "SpecialRecognition" && `for ${desc as string}`} in the
            event
          </p>
          <h3 className="mt-2 font-serif text-sm font-bold text-gray-900 dark:text-gray-100 sm:text-xl lg:text-2xl">
            {eventName}{" "}
            <span className="font-normal text-gray-800 dark:text-gray-300">
              on{" "}
            </span>
            <span className="font-serif">
              {new Date(date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
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

export default CertificateTemplate;
