import Image from "next/image";
import { api } from "../../utils/api";
import Loader from "../loader";
import LoadingBox from "./loadingBox";
import { env } from "../../env/client.mjs";

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

  return (
    <div>
      <h2 className="heading text-center text-3xl font-bold sm:text-4xl">
        Certificates
      </h2>
      {certificatesQuery.isLoading && <LoadingBox />}
      {!certificatesQuery.isLoading && certificatesQuery.data?.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="text-lg font-semibold text-gray-500">
            No certificates yet.
          </p>
        </div>
      )}
      {certificatesQuery.isSuccess && certificatesQuery.data && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
          {certificatesQuery.data.map((certificate) => (
            <div
              key={certificate.id}
              className="flex flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-white p-5 shadow-md dark:border-gray-800 dark:bg-black"
            >
              <div className="flex flex-col items-center justify-center">
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
                  )}&desc=""`}
                  alt={certificate.event.name}
                  width={500}
                  height={500}
                  className="mb-2"
                />
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
