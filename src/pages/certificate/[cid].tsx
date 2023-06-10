import { type GetStaticProps, type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Button from "../../components/button";
import Link from "next/link";
import CertificateTemplate from "../../components/certificate";
import Image from "next/image";
import Head from "next/head";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../../server/api/root";
import { prisma } from "../../server/db";
import superjson from "superjson";
import { env } from "../../env/client.mjs";
import { extractStudentName } from "../../utils/name";

const Certificate: NextPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  const CertificateQuery = api.certificateRouter.getCertificateById.useQuery(
    { id: cid as string },
    {
      enabled: !!cid,
    }
  );

  const getCertificateTypeText = () => {
    const { data } = CertificateQuery;
    if (!data) return "";

    const { type, desc } = data;

    switch (type) {
      case "TeamParticipation":
        return `and their team has participated`;
      case "Winner":
        return `has won`;
      case "RunnerUp":
        return `has been runner up`;
      case "SpecialRecognition":
        return `has been awarded a Special recognition for ${desc as string}`;
      default:
        return `has participated`;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const metaDesc = `This certificate verifies that ${extractStudentName(
    CertificateQuery.data?.user.name as string
  )} ${getCertificateTypeText()} ${
    CertificateQuery.data?.event.name as string
  } on ${formatDate(CertificateQuery.data?.event.date as Date)}.`;

  const eventName = encodeURIComponent(
    CertificateQuery.data?.event.name as string
  );
  const userName = encodeURIComponent(
    extractStudentName(CertificateQuery.data?.user.name as string)
  );
  const eventDate = encodeURIComponent(
    formatDate(CertificateQuery.data?.event.date as Date)
  );
  const type = encodeURIComponent(CertificateQuery.data?.type as string);
  const desc = encodeURIComponent(
    CertificateQuery.data?.desc ? CertificateQuery.data?.desc : ""
  );

  return (
    <div>
      <Head>
        <meta
          property="og:title"
          content={`Certificate of ${extractStudentName(
            CertificateQuery.data?.user.name as string
          )} - ${CertificateQuery.data?.event.name as string}`}
        />
        <meta property="og:description" content={metaDesc} />
        <meta
          property="og:image"
          content={`${env.NEXT_PUBLIC_URL}/api/og?event=${eventName}&user=${userName}&date=${eventDate}&type=${type}&desc=${desc}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      {CertificateQuery.isSuccess && CertificateQuery.data && (
        <>
          <CertificateTemplate
            cid={cid as string}
            name={extractStudentName(CertificateQuery.data.user.name as string)}
            eventName={CertificateQuery.data.event.name}
            date={CertificateQuery.data.event.date}
            type={CertificateQuery.data.type}
            desc={CertificateQuery.data.desc as string}
          />
          <section className="mx-5 mb-10 mt-5 lg:mx-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Certificate Recipient:
            </h1>
            <div className="mt-5 w-fit rounded-lg bg-gray-50 p-5 shadow-lg transition-transform duration-300 hover:scale-[1.05] dark:bg-gray-700">
              <Link
                href={`/u/${CertificateQuery.data.user.username as string}`}
                className="flex gap-5 items-center"
              >
                <div className="h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={CertificateQuery.data.user.image as string}
                    alt="user_image"
                    className="h-full w-full object-cover object-center"
                    width={64}
                    height={64} 
                  />
                </div>
                <h2 className="mt-2 text-gray-900 dark:text-gray-100 lg:text-xl">
                  {CertificateQuery.data.user.name}
                </h2>
              </Link>
            </div>
            <div className="mt-5">
              This certificate above verifies that{" "}
              <Link
                href={`/u/${CertificateQuery.data.user.username as string}`}
                className="cursor-pointer font-bold text-yellow-500 hover:underline dark:text-yellow-300"
              >
                {extractStudentName(CertificateQuery.data.user.name as string)}
              </Link>{" "}
              {getCertificateTypeText()}{" "}
              <span className="font-bold text-yellow-500 dark:text-yellow-300">
                {CertificateQuery.data.event.name}
              </span>{" "}
              {CertificateQuery.data.event.name === "Hackfest S01"
                ? "from"
                : "on"}{" "}
              <span className="font-bold text-yellow-500 dark:text-yellow-300">
                {CertificateQuery.data.event.name === "Hackfest S01"
                  ? "11 November - 25 December, 2023"
                  : formatDate(CertificateQuery.data.event.date)}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: {
        user: {
          id: "",
          name: null,
          image: null,
          email: null,
        },
        expires: "",
      },
    },
    transformer: superjson,
  });

  const cid = context.params?.cid as string;

  if (typeof cid !== "string") {
    throw new Error("Invalid Certificate ID");
  }

  await ssg.certificateRouter.getCertificateById.prefetch({ id: cid });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 60 * 5, // 5 minutes
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Certificate;
