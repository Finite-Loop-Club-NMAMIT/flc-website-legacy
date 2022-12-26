import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut, signIn, getSession } from 'next-auth/react';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { Fade } from 'react-reveal';
import { BsPatchCheckFill } from 'react-icons/bs';
import {
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaStackOverflow,
  FaDiscord,
  FaLinkedin,
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import Router from 'next/router';
import Team from '../components/Team';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { data, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [socialLinks, setSocialLinks] = useState([{ platform: '', link: '' }]);

  const handleAddLink = () => {
    setSocialLinks([...socialLinks, { platform: '', link: '' }]);
  };

  const handleDeleteLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const platforms = socialLinks.map((link) => link.platform);
    if (new Set(platforms).size !== platforms.length) {
      toast.error('You have added multiple links for the same platform');
    } else {
      fetch('/api/update/user', {
        body: JSON.stringify({
          name: e.target[0].value,
          bio: e.target[1].value,
          links: socialLinks,
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => {
          if (r.status === 200) toast.success('Saved successfully!');
          Router.reload();
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  const fetchProfile = async () => {
    const session = await getSession();
    const res = await fetch(`/api/read/users?q=${session.user.email}`);
    const user = await res.json();
    setProfile(user);
    user.data[0].links?.length > 0 && setSocialLinks(user.data[0].links);
    console.log(user.data[0].links);
    console.log(socialLinks);
  };

  useEffect(() => {
    if (status == 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  return (
    <div>
      <div>
        <Toaster />
      </div>
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
          <div className="p-5 flex justify-center items-center flex-col gap-5 my-10">
            <Image
              className="rounded-lg"
              src={data.user.image.split('=')[0]}
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
            <div className="flex flex-wrap mb-2 gap-2 text-lg">
              {socialLinks.map((link, index) => (
                <div key={index} className="cursor-pointer">
                  <Link
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white"
                  >
                    {link.platform === 'Github' ? (
                      <FaGithub />
                    ) : link.platform === 'Twitter' ? (
                      <FaTwitter />
                    ) : link.platform === 'Instagram' ? (
                      <FaInstagram />
                    ) : link.platform === 'Discord' ? (
                      <FaDiscord />
                    ) : link.platform === 'LinkedIn' ? (
                      <FaLinkedin />
                    ) : link.platform === 'StackOverflow' ? (
                      <FaStackOverflow />
                    ) : link.platform === 'Other' ? (
                      <FaGlobe />
                    ) : (
                      <div></div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex gap-5">
              <Button onClick={() => signOut()}>
                <a>Sign Out</a>
              </Button>
              <Button onClick={() => setShowModal(true)}>Edit Profile</Button>
            </div>
            <Team />

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
                            htmlFor="socialLinks"
                            className="text-sm font-medium"
                          >
                            Social Links
                          </label>

                          {socialLinks.map(({ platform, link }, index) => (
                            <div key={index} className="flex items-center mb-2">
                              <select
                                value={platform}
                                onChange={(e) =>
                                  setSocialLinks(
                                    socialLinks.map((link, i) =>
                                      i === index
                                        ? {
                                            ...link,
                                            platform: e.target.value,
                                          }
                                        : link
                                    )
                                  )
                                }
                                defaultValue={platform}
                                className="w-1/2 px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                              >
                                <option value="">Select platform</option>
                                <option value="Github">Github</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Discord">Discord</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="StackOverflow">
                                  StackOverflow
                                </option>
                                <option value="Other">Other</option>
                              </select>
                              <input
                                type="text"
                                placeholder="Link"
                                value={link}
                                onChange={(e) =>
                                  setSocialLinks(
                                    socialLinks.map((link, i) =>
                                      i === index
                                        ? { ...link, link: e.target.value }
                                        : link
                                    )
                                  )
                                }
                                className="w-1/2 px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteLink(index)}
                                className="ml-2 text-red-600 bg-white rounded-full px-3 py-1"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={handleAddLink}
                            className="text-yellow-600 bg-white rounded-full px-3 py-1"
                          >
                            +
                          </button>
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
