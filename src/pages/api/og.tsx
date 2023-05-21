import { ImageResponse } from "@vercel/og";
import { type NextApiRequest } from "next";
import { env } from "../../env/server.mjs";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextApiRequest) {
  const { searchParams } = new URL(req.url as string);
  const eventName = searchParams.get("event");
  const userName = searchParams.get("user");
  const eventDate = searchParams.get("date");
  const type = searchParams.get("type");
  const desc = searchParams.get("desc");

  return new ImageResponse(
    (
      <div tw="relative border-yellow-500 w-full h-full bg-gray-50 py-10 border-8 flex flex-col">
        <div tw="flex flex-col items-center justify-center">
          <div tw="mb-5 flex w-full flex-col-reverse items-center justify-between gap-5 md:w-1/2 md:flex-row md:gap-0">
            <div tw="flex">
              <img
                src={`${env.CLIENT_URL}/assets/flc_logo_crop.png`}
                width={70}
                height={70}
                alt="flc_logo"
                tw="h-10 w-10"
              />
              <a tw="ml-3 flex cursor-pointer items-center text-lg text-black dark:text-gray-100 md:text-xl">
                Finite Loop Club
              </a>
            </div>

            <img
              src={`${env.CLIENT_URL}/assets/nitte-nmamit-logo.png`}
              width={140}
              height={20}
              alt="nmamit_logo"
            />
          </div>

          <h1 tw="mt-5 text-lg font-bold text-yellow-500 sm:text-2xl lg:text-4xl">
            Certificate of{" "}
            {type === "Winner" || type === "RunnerUp"
              ? "Achievement"
              : type === "SpecialRecognition"
              ? "Special Recognition"
              : "Participation"}
          </h1>

          <p tw="text-gray-800 text-lg">This certifies that</p>
          <h2 tw="-mt-5 font-bold text-gray-900 text-xl">{userName}</h2>
          <p tw="text-gray-800 text-lg">
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
          <h3 tw="-mt-5 font-bold text-gray-900 text-xl">
            {eventName}{" "}
            <span tw="font-normal text-gray-800 dark:text-gray-300">
              {" "}
              {eventName === "Hackfest S01" ? "from" : "on"}{" "}
            </span>{" "}
            {eventName === "Hackfest S01"
              ? "11 November - 25 December, 2022"
              : eventDate}{" "}
          </h3>
        </div>

        <div tw="flex flex-col items-center justify-center">
          <div tw="flex flex-col items-center justify-center">
            <img
              src={`${env.CLIENT_URL}/assets/signature.png`}
              width={100}
              height={100}
              alt="signature"
              tw="h-10 w-10 bg-gray-50 md:h-20 md:w-20"
            />
            <div tw="flex flex-col items-center justify-center">
              <p tw="text-xs text-gray-800 sm:text-lg lg:text-xl">
                <span tw="border-b-2">Shashank Shetty</span>
              </p>
              <p tw="mt-1 text-xs text-gray-800">
                Faculty Coordinator, Finite Loop Club
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
