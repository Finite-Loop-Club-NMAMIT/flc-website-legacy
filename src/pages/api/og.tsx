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

  return new ImageResponse(
    (
      <div tw="relative border-yellow-500 w-full h-full bg-gray-50 py-10 border-8 flex flex-col">
        <div tw="flex flex-col items-center justify-center">
          <div tw="flex items-center justify-center">
            <img
              src={`${env.CLIENT_URL}/assets/flc_logo_crop.png`}
              width="100"
              height="100"
              alt="flc_logo"
            />
            <a tw="ml-3 flex cursor-pointer items-center text-lg text-black md:text-xl">
              Finite Loop Club
            </a>
          </div>

          <h1 tw="mt-5 text-lg font-bold text-yellow-500 sm:text-2xl lg:text-4xl">
            Certificate of Participation
          </h1>

          <p tw="text-gray-800 text-lg">
            This certifies that
          </p>
          <h2 tw="-mt-5 font-bold text-gray-900 text-xl">
            {userName}
          </h2>
          <p tw="text-gray-800 text-lg">
            has successfully participated in
          </p>
          <h3 tw="-mt-5 font-bold text-gray-900 text-xl">
            {eventName}{" "}
          </h3>
        </div>

        <div tw="flex flex-col items-center justify-center">
          <div tw="flex flex-col items-center justify-center">
            <img
              src="https://finiteloop.co.in/assets/signature.png"
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
