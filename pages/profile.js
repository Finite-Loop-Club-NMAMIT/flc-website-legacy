import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { Fade } from 'react-reveal';
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import { AiFillInstagram } from 'react-icons/ai';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleSave = async (e) => {
    fetch('/api/update/user', {
      body: JSON.stringify({
        name: e.target[0].value,
        bio: e.target[1].value,
        links: e.target[2].value,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

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
                  Bio:{' '}
                  <span className="text-black dark:text-white">
                    {profile.data[0].bio}
                  </span>
                </p>
                <p className="font-bold dark:text-gray-300 text-gray-700">
                  Role:{' '}
                  <span className="text-black dark:text-white">
                    {profile.data[0].role}
                  </span>
                </p>
                <p className="font-bold dark:text-gray-300 text-gray-700 flex flex-row items-center gap-2">
                  Instagram:{' '}
                  <Link href={profile.data[0].links}>
                    <AiFillInstagram className="cursor-pointer text-2xl text-black dark:text-white" />
                  </Link>
                </p>
                <Button onClick={() => setShowModal(true)}>Edit Profile</Button>
                {showModal ? (
                  <form
                    className="flex flex-col gap-5 bg-black bg-opacity-30 dark:bg-white dark:bg-opacity-30 backdrop-filter backdrop-blur-lg p-5 rounded-xl"
                    onSubmit={handleSave}
                  >
                    <div className="flex">
                      <span class="text-sm rounded-l py-3 px-5 bg-gray-300 dark:bg-gray-500 whitespace-no-wrap w-24">
                        Name
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={profile.data[0].name}
                        className="py-3 px-5 rounded-r border w-80"
                      />
                    </div>
                    <div className="flex">
                      <span class="text-sm rounded-l py-3 px-5 bg-gray-300 dark:bg-gray-500 whitespace-no-wrap w-24">
                        Bio
                      </span>
                      <input
                        type="text"
                        id="bio"
                        name="bio"
                        defaultValue={profile.data[0].bio}
                        className="py-3 px-5 rounded-r border w-80"
                      />
                    </div>
                    <div className="flex">
                      <span class="text-sm rounded-l py-3 px-5 bg-gray-300 dark:bg-gray-500 whitespace-no-wrap w-24">
                        Instagram
                      </span>
                      <input
                        type="url"
                        name="url"
                        id="url"
                        placeholder="https://instagram.com/username"
                        pattern="https://.*"
                        defaultValue={profile.data[0].links}
                        className="py-3 px-5 rounded-r border w-80"
                      ></input>
                    </div>
                    <Button type="submit">Save</Button>
                  </form>
                ) : null}
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
