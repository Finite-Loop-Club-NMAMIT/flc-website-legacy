import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "../button";
import { type FormEvent, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { BsPatchCheckFill } from "react-icons/bs";
import {
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaStackOverflow,
  FaDiscord,
  FaLinkedin,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import Team from "../team";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { type User } from "@prisma/client";
import { AiOutlineShareAlt } from "react-icons/ai";
import Error from "../error";

export default function Profile() {
  const router = useRouter();
  const { data } = useSession();
  const username = router.query.username;
  const [profile, setProfile] = useState<User>({} as User);
  const [editData, setEditData] = useState<User>({} as User);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [socialLinks, setSocialLinks] = useState<
    {
      platform: string;
      link: string;
    }[]
  >([
    {
      platform: "Select a platform",
      link: "",
    },
  ]);

  const handleAddLink = () => {
    setSocialLinks([
      ...socialLinks,
      {
        platform: "Select a platform",
        link: "",
      },
    ]);
  };

  const handleDeleteLink = (index: number) => {
    const newLinks = socialLinks.filter((link, i) => i !== index);
    setSocialLinks(newLinks);
  };

  const ProfileInfo = api.userRouter.getProfile.useQuery(
    {
      username: username as string,
    },
    {
      onSuccess: (data) => {
        setProfile(data as User);
        if ((data?.links?.length as number) > 0) {
          setSocialLinks(
            JSON.parse(data?.links as string) as [
              {
                platform: string;
                link: string;
              }
            ]
          );
        }
      },
    }
  );

  const editProfile = api.userRouter.editUser.useMutation();

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const platforms = socialLinks?.map((link) => link.platform);
    if (new Set(platforms).size !== platforms.length) {
      toast.error("You have added multiple links for the same platform");
    } else {
      try {
        editProfile.mutate(
          {
            name: editData.name as string,
            bio: editData.bio as string,
            links: JSON.stringify(
              socialLinks.filter(
                (link) => link.platform !== "Select a platform"
              )
            ),
          },
          {
            onSuccess: () => {
              toast.success("Profile updated successfully");
              setShowModal(false);
              try {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                ProfileInfo.refetch();
              } catch (error) {
                toast.error("Something went wrong");
              }
            },
          }
        );
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const platformIcons = {
    Github: <FaGithub />,
    Twitter: <FaTwitter />,
    Instagram: <FaInstagram />,
    Discord: <FaDiscord />,
    LinkedIn: <FaLinkedin />,
    StackOverflow: <FaStackOverflow />,
    Other: <FaGlobe />,
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      {ProfileInfo.isLoading && (
        <div className="m-24 flex flex-col items-center justify-center gap-6 text-center lg:m-56">
          <button
            disabled
            type="button"
            className="mr-2 inline-flex items-center rounded-lg bg-yellow-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-500"
          >
            <svg
              className="mr-3 inline h-4 w-4 animate-spin text-white"
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
      )}
      {!profile && <Error />}
      {profile && (
        <Fade cascade>
          <div className="my-10 flex flex-col items-center justify-center gap-5 p-5">
            <div className="relative">
              <Image
                className="rounded-lg"
                src={profile.image?.split("=")[0] as string}
                width={200}
                height={200}
                alt="Profile Picture"
                priority
              />
              <button
                onClick={() => {
                  try {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    navigator.clipboard.writeText(window.location.href);
                  } catch (error) {
                    toast.error("Something went wrong");
                  }
                  toast.success("Copied to clipboard");
                }}
                className="absolute bottom-0 right-0 m-2 flex items-center rounded-full bg-yellow-400 p-2 font-bold text-black duration-500 hover:scale-[1.03] hover:bg-yellow-300"
              >
                <AiOutlineShareAlt />
              </button>
            </div>
            <a className="heading text-center text-2xl font-bold">
              {profile.name as string}
            </a>
            <p className="font-bold text-gray-700 dark:text-gray-300">
              Bio:{" "}
              <span className="text-black dark:text-white">
                {profile.bio ? profile.bio : "No bio provided."}
              </span>
            </p>
            <p className="font-bold text-gray-700 dark:text-gray-300">
              Role:{" "}
              <span className="inline-flex items-center gap-1 text-black dark:text-white">
                {profile.isMember ? (
                  <>
                    <span className="uppercase">{profile.role}</span>
                    <BsPatchCheckFill className="animate-pulse text-green-500" />
                  </>
                ) : (
                  "Unofficial Member"
                )}
              </span>
            </p>
            <div className="mb-2 flex flex-wrap gap-2 text-lg">
              {socialLinks?.length !== 0 &&
                socialLinks?.map((link, index) => (
                  <div key={index} className="cursor-pointer">
                    <Link
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-white"
                    >
                      {platformIcons.hasOwnProperty(link.platform) ? (
                        platformIcons[
                          link.platform as keyof typeof platformIcons
                        ]
                      ) : (
                        <div></div>
                      )}
                    </Link>
                  </div>
                ))}
            </div>
            {data?.user?.id === profile.id && (
              <div className="flex gap-5">
                <Button onClick={() => signOut()}>
                  <a>Sign Out</a>
                </Button>
                <Button onClick={() => setShowModal(true)}>Edit Profile</Button>
              </div>
            )}
            <Team
              userRole={profile.role as string}
              email={profile.email as string}
            />

            {showModal && (
              <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div
                    className="fixed inset-0 h-full w-full bg-black opacity-30"
                    onClick={() => setShowModal(false)}
                  ></div>
                  <div className="flex min-h-screen items-center px-4 py-8">
                    <div className="relative mx-auto w-full max-w-lg rounded-md bg-white bg-opacity-50 p-4 shadow-lg backdrop-blur-lg backdrop-filter">
                      <form
                        onSubmit={(e) => handleSave(e)}
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
                              defaultValue={profile.name as string}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  name: e.target.value,
                                })
                              }
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
                              defaultValue={profile.bio as string}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  bio: e.target.value,
                                })
                              }
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

                          {socialLinks &&
                            socialLinks?.map((link, index) => (
                              <div
                                className="mb-4 flex items-center gap-3"
                                key={index}
                              >
                                <select
                                  className="w-16 rounded-lg border-gray-200 p-1 text-sm shadow-sm lg:w-32"
                                  value={link.platform}
                                  onChange={(e) => {
                                    const newLinks = [...socialLinks];
                                    newLinks[index]!.platform = e.target.value;
                                    setSocialLinks(newLinks);
                                  }}
                                >
                                  <option value="">Select a Platform</option>
                                  {Object.entries(platformIcons).map(
                                    ([platform, icon]) => (
                                      <option key={platform} value={platform}>
                                        {icon} {platform}
                                      </option>
                                    )
                                  )}
                                </select>

                                <input
                                  type="text"
                                  placeholder="Link"
                                  className="ml-2 w-full rounded-lg border-gray-200 p-1 text-sm shadow-sm"
                                  value={link.link}
                                  onChange={(e) => {
                                    const newLinks = [...socialLinks];
                                    newLinks[index]!.link = e.target.value;
                                    setSocialLinks(newLinks);
                                  }}
                                />
                                {socialLinks.length > 1 && (
                                  <button
                                    type="button"
                                    className="mr-2 rounded-full bg-white px-3 py-1 text-red-500"
                                    onClick={() => handleDeleteLink(index)}
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            ))}

                          <button
                            type="button"
                            onClick={handleAddLink}
                            className="rounded-full bg-white px-3 py-1 text-yellow-600"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex justify-center pt-2">
                          <Button>Save Profile</Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Fade>
      )}
    </div>
  );
}
