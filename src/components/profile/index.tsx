import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "../button";
import { type FormEvent, useState, useRef, useEffect } from "react";
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
import { AiFillCamera, AiOutlineShareAlt } from "react-icons/ai";
import Error from "../error";
import { env } from "../../env/client.mjs";
import BlurImage from "../blurImage";
import IDCard from "../idcard";
import EditProfileModal from "./editProfileModal";
import LoadingBox from "./loadingBox";

interface CloudinaryResponse {
  secure_url: string;
}

export default function Profile() {
  const router = useRouter();
  const { data } = useSession();
  const username = router.query.username;
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
  const fileInput = useRef<HTMLInputElement>(null);

  const ProfileInfo = api.userRouter.getProfile.useQuery(
    {
      username: username as string,
    },
    {
      enabled: !!username,
      onSuccess: (data) => {
        setEditData({ ...editData, username: data?.username as string });
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
  //re feteched when modal is closed or opened
  useEffect(() => {
    ProfileInfo.refetch().catch(() => {
      toast.error("Error fetching profile");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const updateProfilePicture =
    api.userRouter.updateProfilePicture.useMutation();

  const handleProfileUpdate = async (e: FormEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_pictures");
    try {
      const loadingToast = toast.loading("Uploading image, please wait...");
      const response: Response = await fetch(
        `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Error uploading image");
        toast.dismiss(loadingToast);
        return;
      }

      const data: CloudinaryResponse =
        (await response.json()) as CloudinaryResponse;
      try {
        updateProfilePicture.mutate(
          {
            profilePicture: data.secure_url,
          },
          {
            onSuccess: () => {
              ProfileInfo.refetch()
                .then(() => {
                  toast.dismiss(loadingToast);
                  toast.success("Profile picture updated");
                })
                .catch(() => {
                  toast.dismiss(loadingToast);
                  toast.error("Error updating profile picture");
                });
            },
          }
        );
      } catch (error) {
        toast.error("Error updating profile picture");
        toast.dismiss(loadingToast);
      }
    } catch (error) {
      toast.error("Something went wrong");
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

  const isSelfProfile: boolean = data?.user?.id === ProfileInfo?.data?.id;

  return (
    <div>
      <div>
        <Toaster />
      </div>
      {ProfileInfo.isLoading ? (
        <LoadingBox />
      ) : !ProfileInfo.data ? (
        <Error />
      ) : null}
      {ProfileInfo.data && (
        <Fade triggerOnce cascade>
          <div className="my-10 flex flex-col items-center justify-center gap-5 p-5">
            <div className="relative">
              <BlurImage
                className="rounded-lg"
                src={ProfileInfo.data.image?.split("=")[0] as string}
                width={200}
                height={200}
                alt="Profile Picture"
                priority
              />
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      toast.success("Copied to clipboard");
                    })
                    .catch(() => {
                      toast.error("Something went wrong");
                    });
                }}
                className="absolute bottom-0 right-0 m-2 flex items-center rounded-full bg-yellow-400 p-2 font-bold text-black duration-500 hover:scale-[1.03] hover:bg-yellow-300"
              >
                <AiOutlineShareAlt />
              </button>
              {ProfileInfo.data.id === data?.user?.id && (
                <button
                  onClick={() => {
                    fileInput.current?.click();
                  }}
                  className="absolute bottom-0 left-0 m-2 flex items-center rounded-full bg-yellow-400 p-2 font-bold text-black duration-500 hover:scale-[1.03] hover:bg-yellow-300"
                >
                  <AiFillCamera />
                  <input
                    onChange={async (e) => await handleProfileUpdate(e)}
                    ref={fileInput}
                    type="file"
                    className="hidden"
                  />
                </button>
              )}
            </div>
            <a className="heading text-center text-2xl font-bold">
              {ProfileInfo.data.name as string}
            </a>
            <p className="text-sm text-yellow-500">
              @{ProfileInfo.data.username as string}
            </p>
            <p className="font-bold text-gray-700 dark:text-gray-300">
              Bio:{" "}
              <span className="text-black dark:text-white">
                {ProfileInfo.data.bio
                  ? ProfileInfo.data.bio
                  : "No bio provided."}
              </span>
            </p>
            <p className="font-bold text-gray-700 dark:text-gray-300">
              Role:{" "}
              <span className="inline-flex items-center gap-1 text-black dark:text-white">
                {ProfileInfo.data.isMember ? (
                  <>
                    <span className="uppercase">{ProfileInfo.data.role}</span>
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
            {ProfileInfo.data.isMember && isSelfProfile && (
              <IDCard
                image={ProfileInfo.data.image?.split("=")[0] as string}
                name={ProfileInfo.data.name as string}
                username={ProfileInfo.data.username as string}
                role={ProfileInfo.data.role as string}
                email={ProfileInfo.data.email as string}
              />
            )}

            {isSelfProfile && (
              <div className="flex gap-5">
                <Button onClick={() => signOut()}>
                  <a>Sign Out</a>
                </Button>
                <Button onClick={() => setShowModal(true)}>Edit Profile</Button>
              </div>
            )}
            <Team
              userRole={ProfileInfo.data.role as string}
              email={ProfileInfo.data.email as string}
            />
          </div>
        </Fade>
      )}
      {ProfileInfo.data && showModal && (
        <>
          <EditProfileModal
            setShowModal={setShowModal}
            socialLinks={socialLinks}
            showModal={showModal}
            editData={editData}
            ProfileData={ProfileInfo.data}
            setEditData={setEditData}
            setSocialLinks={setSocialLinks}
            platformIcons={platformIcons}
          />
        </>
      )}
    </div>
  );
}
