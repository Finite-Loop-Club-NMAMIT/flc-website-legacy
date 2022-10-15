import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut, signIn, getSession } from 'next-auth/react';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { Fade } from 'react-reveal';
import { AiFillInstagram } from 'react-icons/ai';
import { BsPatchCheckFill } from 'react-icons/bs';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { data, status } = useSession();
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
    const session = await getSession();
    const res = await fetch(`/api/read/users?q=${session.user.email}`);
    const user = await res.json();
    setProfile(user);
  };

  useEffect(() => {
    if (status == 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  return (
    <div>
      {profile?.data === undefined ? (
        <div className="flex flex-col justify-center items-center gap-6 m-24 text-center lg:m-56">
          <h1 className="text-lg lg:text-2xl">
            Please sign in, if you have not.
          </h1>
          <button
            disabled
            type="button"
            className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
          >
            <svg
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        </div>
      ) : (
        <Fade top cascade>
          <div className="flex justify-center items-center flex-col gap-5 my-10">
            <Image
              className="rounded-lg"
              src={data.user.image}
              width={200}
              height={200}
              alt="Profile Picture"
            />
            <a className="heading text-center text-2xl font-bold">
              {data.user.name}
            </a>
            <p className="font-bold dark:text-gray-300 text-gray-700">
              Bio:{' '}
              <span className="text-black dark:text-white">
                {profile?.data[0].bio != null
                  ? profile?.data[0].bio
                  : "You don't have any bio yet"}
              </span>
            </p>
            <p className="font-bold dark:text-gray-300 text-gray-700">
              Role:{' '}
              <span className="text-black dark:text-white inline-flex gap-1 items-center">
                {profile.data[0].isMember ? (
                  <>
                    {' '}
                    <span>{capitalize(profile?.data[0].role)}</span>
                    <BsPatchCheckFill className="text-green-500 animate-pulse" />{' '}
                  </>
                ) : (
                  'Unofficial Member'
                )}
              </span>
            </p>
            <p className="font-bold dark:text-gray-300 text-gray-700 flex flex-row items-center gap-2">
              Instagram:{' '}
              <Link
                href={`https://instagram.com/${profile.data[0].links}`}
                passHref
              >
                <a target="_blank" rel="noopener noreferrer">
                  <AiFillInstagram className="cursor-pointer text-2xl text-black dark:text-white" />
                </a>
              </Link>
            </p>
            <div className="flex gap-5">
              <Button onClick={() => signOut()}>
                <a>Sign Out</a>
              </Button>
              <Button onClick={() => setShowModal(true)}>Edit Profile</Button>
            </div>
            {showModal ? (
              <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div
                    className="fixed inset-0 w-full h-full bg-black opacity-30"
                    onClick={() => setShowModal(false)}
                  ></div>
                  <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-md shadow-lg">
                      <form
                        onSubmit={handleSave}
                        className="mb-0 space-y-4 p-8"
                      >
                        <p className="text-lg font-medium">Edit your Profile</p>
                        <div>
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>

                          <div className="relative mt-1">
                            <input
                              id="name"
                              name="name"
                              defaultValue={profile.data[0].name}
                              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                              placeholder="Enter name"
                            />

                            <span className="absolute inset-y-0 right-4 inline-flex items-center"></span>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="bio" className="text-sm font-medium">
                            Bio
                          </label>

                          <div className="relative mt-1">
                            <input
                              id="bio"
                              name="bio"
                              defaultValue={profile.data[0].bio}
                              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                              placeholder="Enter bio"
                            />

                            <span className="absolute inset-y-0 right-4 inline-flex items-center"></span>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="insta"
                            className="text-sm font-medium"
                          >
                            Instagram username (without @)
                          </label>

                          <div className="relative mt-1">
                            <input
                              id="insta"
                              name="insta"
                              defaultValue={profile.data[0].links}
                              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                              placeholder="Enter username (without @)"
                            />

                            <span className="absolute inset-y-0 right-4 inline-flex items-center"></span>
                          </div>
                        </div>

                        <div className="flex justify-center pt-2">
                          <Button type="submit">Save Profile</Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </Fade>
      )}
    </div>
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
