import Link from "next/link";
import Button from "../button";
import { type FunctionComponent } from "react";

const Error: FunctionComponent = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="gradient mb-4 text-7xl font-extrabold tracking-tight text-yellow-500 dark:text-yellow-500 lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.{" "}
          </p>
          <Link href="/">
            <Button>Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
