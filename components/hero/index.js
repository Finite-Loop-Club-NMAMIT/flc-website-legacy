import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '../button';

export default function Hero() {
  const { data, status } = useSession();
  return (
    <section className="text-black dark:text-white bg-white dark:bg-gray-900/10 transition-colors duration-500">
      <div className="px-4 py-32 mx-auto max-w-screen-xl lg:items-center lg:flex">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to
            <span className="block w-full py-2 heading">Finite Loop Club!</span>
          </h1>

          <p className="mt-4 sm:leading-relaxed sm:text-xl">
            We are a Coding club of NMAMIT aiming at Realizing the idea and
            Inspiring the next!
          </p>
          <div className="flex flex-wrap justify-center mt-8">
            {status != 'authenticated' ? (
              <Link href="/api/auth/signin">
                <a className="block w-auto px-12 py-3 font-medium text-white bg-yellow-400 rounded shadow active:bg-yellow-500 hover:bg-yellow-300 focus:outline-none focus:ring duration-300">
                  Sign In
                </a>
              </Link>
            ) : (
              <Link href="/events">
                <a className="block bg-gray-50 w-auto px-12 py-3 font-medium text-black rounded shadow hover:text-gray-600 active:text-yellow-500 focus:outline-none focus:ring duration-300">
                  Explore Events
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
