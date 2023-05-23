import Image from "next/image";
import { api } from "../../utils/api";
import LoadingBox from "./loadingBox";
import { env } from "../../env/client.mjs";
import { AiFillEye } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";

const Certificates = ({ userId }: { userId: string }) => {
  const certificatesQuery =
    api.certificateRouter.getCertificatesByUserId.useQuery(
      {
        userId: userId,
      },
      {
        enabled: !!userId,
      }
    );

  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(true);

  return (
    <div>
      <h2 className="heading text-center text-3xl font-bold sm:text-4xl">
        Certificates
      </h2>
      {certificatesQuery.isLoading && <LoadingBox />}
      {!certificatesQuery.isLoading && certificatesQuery.data?.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="mt-2 text-sm text-center lg:text-lg font-semibold text-gray-500">
            No certificates yet. Participate in events to get certificates.
          </p>
          <div className="mt-5 border p-5">
            <Image
              src={`${env.NEXT_PUBLIC_URL}/api/og?event=${encodeURIComponent(
                "Sample Event"
              )}&user=${encodeURIComponent(
                "Member Name"
              )}&date=${encodeURIComponent(
                "01/01/2021"
              )}&type=${encodeURIComponent("TeamParticipation")}`}
              alt={"Sample certificate"}
              width={500}
              height={500}
              className="blur-sm"
            />
          </div>
        </div>
      )}
      {certificatesQuery.isSuccess && certificatesQuery.data && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
          {certificatesQuery.data.map((certificate) => (
            <div
              key={certificate.id}
              onClick={async () => {
                await router.push(
                  `${env.NEXT_PUBLIC_URL}/certificate/${certificate.id}`
                );
              }}
              className="flex transform flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.03] dark:border-gray-800 dark:bg-black"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  {isGenerating && <LoadingBox />}

                  <Image
                    src={`${
                      env.NEXT_PUBLIC_URL
                    }/api/og?event=${encodeURIComponent(
                      certificate.event.name
                    )}&user=${encodeURIComponent(
                      certificate.user.name as string
                    )}&date=${encodeURIComponent(
                      new Date(certificate.event.date).toLocaleDateString(
                        "en-IN",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    )}&type=${encodeURIComponent(
                      certificate.type as string
                    )}&desc=${encodeURIComponent(certificate.desc as string)}`}
                    alt={certificate.event.name}
                    width={500}
                    height={500}
                    className="mb-2"
                    onLoad={() => {
                      setIsGenerating(false);
                    }}
                  />
                  <button
                    onClick={async () => {
                      await router.push(
                        `${env.NEXT_PUBLIC_URL}/certificate/${certificate.id}`
                      );
                    }}
                    className="absolute bottom-5 right-5 rounded-full bg-white p-2 shadow-md transition-colors duration-300 hover:bg-gray-50 dark:bg-yellow-500 dark:text-white dark:hover:bg-yellow-400"
                  >
                    <AiFillEye />
                  </button>
                  <button
                    onClick={async (event) => {
                      event.stopPropagation();
                      await navigator.clipboard.writeText(
                        `${env.NEXT_PUBLIC_URL}/certificate/${certificate.id}`
                      );
                      toast.success("Link copied to clipboard");
                    }}
                    className="absolute bottom-5 left-5 rounded-full bg-white p-2 shadow-md transition-colors duration-300 hover:bg-gray-50 dark:bg-yellow-500 dark:text-white dark:hover:bg-yellow-400"
                  >
                    <BsFillShareFill />
                  </button>
                </div>
                <p className="text-xl font-semibold">
                  {certificate.event.name}
                </p>
                <p className="text-lg font-semibold text-gray-500">
                  {certificate.type.toLowerCase().includes("participation")
                    ? "Participation"
                    : certificate.type.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
