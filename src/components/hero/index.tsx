import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Button from "../button";
import { type FunctionComponent } from "react";
import Loader from "../loader";

const Hero: FunctionComponent = () => {
  const { status } = useSession();
  return (
    <section className="bg-white text-black transition-colors duration-500 dark:bg-gray-900/10 dark:text-white">
      <div className="max-w-screen-xl px-4 py-32 lg:flex lg:items-center lg:justify-center">
        <Fade triggerOnce cascade>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to
              <span className="heading block w-full py-2">
                Finite Loop Club!
              </span>
            </h1>

            <p className="mt-4 sm:text-xl sm:leading-relaxed">
              We are a Coding club of NMAMIT aiming at Realizing the idea and
              Inspiring the next!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:gap-8">
              {status === "loading" ? (
                <Loader />
              ) : "authenticated" ? (
                <>
                  <Link
                    href="/events"
                    className="block w-auto rounded bg-gray-50 px-8 py-2 font-medium text-black shadow duration-300 hover:scale-[1.03] hover:text-gray-600 focus:outline-none focus:ring active:text-yellow-500 lg:px-12 lg:py-3"
                  >
                    Explore Events
                  </Link>
                  <Link
                    href="/register"
                    className="block w-auto rounded bg-yellow-300 px-8 py-2 font-medium text-black shadow duration-300 hover:scale-[1.03] hover:text-gray-600 focus:outline-none focus:ring active:text-yellow-500 lg:px-12 lg:py-3"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <Button onClick={() => signIn("google")}>
                  <a>Sign In</a>
                </Button>
              )}
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Hero;
