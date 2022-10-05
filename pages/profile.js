import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { Fade } from 'react-reveal';
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const res = await fetch(`/api/read/users?q=${data.user.email}`);
    const user = await res.json();
    setProfile(user);
  };

  /* Temporary fix for session not found and fetching issues after component mount */
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProfile();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {status != 'authenticated' ? (
        <div className="flex flex-col justify-center items-center gap-6 m-24 text-center lg:m-56">
          <h1 className="text-lg lg:text-2xl">
            You are not authorised, Please sign in.
          </h1>
          <Button>
            <Link href="/api/auth/signin">Sign In</Link>
          </Button>
        </div>
      ) : (
        <Fade top cascade>
          <div className="flex justify-center items-center flex-col gap-5 my-10">
            <Image
              className="rounded-lg"
              src={data.user.image}
              width={200}
              height={200}
            />
            <a className="heading text-2xl font-bold">{data.user.name}</a>
            {loading ? (
              <a>Loading...</a>
            ) : (
              <>
                <p className="font-bold dark:text-gray-300 text-gray-700">
                  Bio: {profile.data[0].bio}
                </p>
                <p className="font-bold dark:text-gray-300 text-gray-700">
                  Role: {profile.data[0].role}
                </p>
              </>
            )}
          </div>
        </Fade>
      )}
    </div>
  );
}

/* to reduce response time https://next-auth.js.org/configuration/nextjs#unstable_getServerSession */
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
