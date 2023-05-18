import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Button from "../../components/button";
import Link from "next/link";
import ParticipationCertificate from "../../components/certificates/participation";
import Loader from "../../components/loader";
import Image from "next/image";

const Certificate: NextPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  const CertificateQuery = api.certificateRouter.getCertificateById.useQuery(
    { id: cid as string },
    {
      enabled: !!cid,
    }
  );

  return (
    <div>
      {CertificateQuery.isLoading && (
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader />
        </div>
      )}
      {CertificateQuery.isSuccess && CertificateQuery.data && (
        <>
          <div>
            {(CertificateQuery.data.type === "TeamParticipation" ||
              CertificateQuery.data.type === "SoloParticipation") && (
              <ParticipationCertificate
                cid={cid as string}
                name={CertificateQuery.data.user.name as string}
                eventName={CertificateQuery.data.event.name}
                date={CertificateQuery.data.event.date}
              />
            )}
          </div>
          <section className="mx-5 mb-10 mt-5 lg:mx-10">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Certificate Recipient:
              </h1>
              <div className="mt-5 w-fit rounded-lg bg-gray-50 p-5 shadow-lg transition-transform duration-300 hover:scale-[1.05] dark:bg-gray-700">
                <Link
                  href={`/u/${CertificateQuery.data.user.username as string}`}
                  className="flex gap-5"
                >
                  <Image
                    src={CertificateQuery.data.user.image as string}
                    width={50}
                    height={50}
                    alt="user_image"
                    className="rounded-full"
                  />
                  <h2 className="mt-2 text-gray-900 dark:text-gray-100 lg:text-xl">
                    {CertificateQuery.data.user.name}
                  </h2>
                </Link>
              </div>
            </div>
            <div className="mt-5">
              This certificate above verifies that{" "}
              <Link
                href={`/u/${CertificateQuery.data.user.username as string}`}
                className="cursor-pointer font-bold text-yellow-500 hover:underline dark:text-yellow-300"
              >
                {CertificateQuery.data.user.name}
              </Link>{" "}
              {CertificateQuery.data.type === "TeamParticipation"
                ? "and their team"
                : ""}{" "}
              {CertificateQuery.data.type === "Winner"
                ? "has won"
                : CertificateQuery.data.type === "RunnerUp"
                ? "has been runner up"
                : CertificateQuery.data.type === "SpecialRecognition"
                ? `has been awarded a Special recognition for ${
                    CertificateQuery.data.desc as string
                  }`
                : "has participated"}{" "}
              <span className="font-bold text-yellow-500 dark:text-yellow-300">
                {CertificateQuery.data.event.name}
              </span>{" "}
              on{" "}
              <span className="font-bold text-yellow-500 dark:text-yellow-300">
                {new Date(CertificateQuery.data.event.date).toLocaleDateString(
                  "en-IN",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
                .
              </span>
            </div>
          </section>
        </>
      )}
      {!CertificateQuery.isLoading && !CertificateQuery.data && (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div className="mx-auto max-w-screen-sm text-center">
              <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                Invalid ID
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                The certificate ID is invalid.
              </p>
              <Link href="/">
                <Button>Back to Homepage</Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Certificate;
