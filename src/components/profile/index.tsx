import { signOut, useSession } from "next-auth/react";

import { type FormEvent, useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import {
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaStackOverflow,
  FaDiscord,
  FaLinkedin,
  FaUser,
  FaEdit,
  FaIdCard,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import Team from "../team";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { type User } from "@prisma/client";
import Error from "../error";
import { env } from "../../env/client.mjs";
import IDCard from "../idcard";
import EditProfileModal from "./editProfileModal";
import LoadingBox from "./loadingBox";
import ProfileUI from "./profileUI";
import { TbFileCertificate } from "react-icons/tb";
import BottomNav from "./bottomNav";
import Certificates from "./certificates";

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

  const tabs = [
    {
      name: "Profile",
      icon: <FaUser />,
    },
    {
      name: "Edit",
      icon: <FaEdit />,
    },
    {
      name: "ID Card",
      icon: <FaIdCard />,
    },
    {
      name: "Certificates",
      icon: <TbFileCertificate />,
    },
    {
      name: "Sign Out",
      icon: <FaSignOutAlt />,
    },
  ];

  const [activeTab, setActiveTab] = useState<number>(0);

  const visibleTabs = tabs.filter((tab, index) => {
    if (index === 1 || index === 4) {
      return isSelfProfile;
    }
    return true;
  });

  return (
    <div>
      <Toaster />

      <div className="fixed bottom-4 left-1/2 z-50 h-16 w-full max-w-lg -translate-x-1/2 rounded-full border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div
        className={`mx-auto grid h-full max-w-lg grid-cols-${visibleTabs.length}`}
      >
        {visibleTabs.map((tab, index) => {
          const isFirstTab = index === 0;
          const isLastTab = index === visibleTabs.length - 1;

          const tabClassName = `group inline-flex flex-col items-center justify-center bg-white px-5 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 ${
            isFirstTab ? "rounded-l-full" : ""
          } ${isLastTab ? "rounded-r-full" : ""} ${
            !isFirstTab && !isLastTab
              ? "border-l border-r border-gray-200 dark:border-gray-600"
              : ""
          }`;

          return (
            <button
              onClick={async () => {
                setActiveTab(index);
                if (index === 1 && isSelfProfile) {
                  setShowModal(true);
                }
                if (!(index === 1)) {
                  setShowModal(false);
                }
                if (index === visibleTabs.length - 1 && isSelfProfile) {
                  await signOut();
                }
              }}
              key={index}
              type="button"
              className={tabClassName}
            >
              {tab.icon}
              <span className="mt-2 hidden text-xs font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100 sm:block">
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>

      {ProfileInfo.isLoading ? (
        <LoadingBox />
      ) : !ProfileInfo.data ? (
        <Error />
      ) : null}

      {ProfileInfo.data && (
        <Fade triggerOnce cascade>
          <div className="mb-10 flex flex-col items-center justify-center gap-5 p-5">
            {(activeTab === 0 || activeTab === 1 || activeTab === 4) && (
              <ProfileUI
                ProfileInfo={ProfileInfo.data}
                handleProfileUpdate={handleProfileUpdate}
                socialLinks={socialLinks}
                platformIcons={platformIcons}
                isSelfProfile={isSelfProfile}
              />
            )}

            {ProfileInfo.data.isMember && isSelfProfile && activeTab === 2 && (
              <IDCard
                image={ProfileInfo.data.image?.split("=")[0] as string}
                name={ProfileInfo.data.name as string}
                username={ProfileInfo.data.username as string}
                role={ProfileInfo.data.role as string}
                email={ProfileInfo.data.email as string}
              />
            )}

            {ProfileInfo.data.isMember && activeTab === 3 && (
              <Certificates userId={ProfileInfo.data.id} />
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
