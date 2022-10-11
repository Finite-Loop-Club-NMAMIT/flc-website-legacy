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
      {status != 'authenticated' ? (
        <div className="flex flex-col justify-center items-center gap-6 m-24 text-center lg:m-56">
          <h1 className="text-lg lg:text-2xl">
            You are not authorised, Please sign in.
          </h1>
          <Button onClick={() => signIn('google')}>
            <a>Sign In</a>
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
              alt="Profile Picture"
            />
            <a className="heading text-center text-2xl font-bold">{data.user.name}</a>
            {profile?.data === undefined ? (
              <a>Loading...</a>
            ) : (
              <>
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
                    {profile.data[0].isMember
                      ? <> <span>{capitalize(profile?.data[0].role)}</span><BsPatchCheckFill className='text-green-500 animate-pulse' /> </>
                      : 'Unofficial Member'}
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
                  <Button onClick={() => setShowModal(true)}>
                    Edit Profile
                  </Button>
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
                            <p className="text-lg font-medium">
                              Edit your Profile
                            </p>
                            <div>
                              <label
                                htmlFor="name"
                                className="text-sm font-medium"
                              >
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
                              <label
                                htmlFor="bio"
                                className="text-sm font-medium"
                              >
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
              </>
            )}
          </div>
        </Fade>
      )}
    </div>
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}