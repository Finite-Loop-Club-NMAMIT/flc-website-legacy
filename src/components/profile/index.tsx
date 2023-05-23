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
import IDCard from "./idCard";
import EditProfileModal from "./editProfileModal";
import LoadingBox from "./loadingBox";
import ProfileUI from "./profileUI";
import { TbFileCertificate } from "react-icons/tb";
import BottomNav from "./bottomNav";
import Certificates from "./certificates";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

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

      {!ProfileInfo.isLoading && ProfileInfo.data && (
        <BottomNav
          isSelfProfile={isSelfProfile}
          setActiveTab={setActiveTab}
          setShowModal={setShowModal}
          visibleTabs={visibleTabs}
        />
      )}

      {ProfileInfo.isLoading ? (
        <LoadingBox />
      ) : !ProfileInfo.data ? (
        <Error />
      ) : null}

      {ProfileInfo.data && (
        <Fade triggerOnce cascade>
          <div className="mb-10 flex flex-col items-center justify-center gap-5 p-5">
            {(isSelfProfile
              ? activeTab === 0 || activeTab === 1 || activeTab === 4
              : activeTab === 0) && (
              <ProfileUI
                ProfileInfo={ProfileInfo.data}
                handleProfileUpdate={handleProfileUpdate}
                socialLinks={socialLinks}
                platformIcons={platformIcons}
                isSelfProfile={isSelfProfile}
              />
            )}

            {(isSelfProfile ? activeTab === 2 : activeTab === 1) &&
              (ProfileInfo.data.isMember ? (
                <IDCard
                  image={ProfileInfo.data.image?.split("=")[0] as string}
                  name={ProfileInfo.data.name as string}
                  username={ProfileInfo.data.username as string}
                  role={ProfileInfo.data.role as string}
                  email={ProfileInfo.data.email as string}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-5">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 lg:text-2xl">
                    {isSelfProfile
                      ? "You are "
                      : `${ProfileInfo.data.name as string} is `}
                    not a member yet.
                  </h1>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 lg:text-lg">
                    Please join the community to get your ID card.
                  </p>
                  <div className="mt-5 border p-4 blur-sm">
                    <div className="flex w-full items-center gap-3 px-3">
                      <Image
                        src="/assets/flc_logo_crop.png"
                        width={50}
                        height={50}
                        alt="logo"
                      />
                      <div className="text-xl font-bold text-yellow-500">
                        FLC
                      </div>
                      <div className="text-md flex-1 text-right font-semibold">
                        {`${
                          new Date().getFullYear() - 1
                        } - ${new Date().getFullYear()}`}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        src={"/assets/flc_logo_crop.png"}
                        width={128}
                        height={128}
                        alt="profile"
                        className="rounded-full border-2 border-gray-500 dark:border-gray-300"
                      />
                      <div className="mt-5 text-xl font-bold">Member Name</div>
                      <div className="font-thin">youremail@nmamit.in</div>
                      <div className="mt-2 rounded-full border border-yellow-500 px-3 uppercase"></div>
                    </div>
                    <div className="m-4 flex justify-center">
                      <QRCodeSVG
                        value={`https://finiteloop.co.in/`}
                        size={100}
                        includeMargin
                      />
                    </div>
                    <hr />
                    <div className="my-3 text-center">
                      <div className="text-xs font-thin">
                        <strong>
                          Finite Loop Club, NMAM Institute of Technology
                        </strong>
                        <br />
                        Nitte, Karkala Taluk, Udupi - 574110
                        <br />
                        Karnataka, India
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {(isSelfProfile ? activeTab === 3 : activeTab === 2) &&
              (ProfileInfo.data.isMember ? (
                <Certificates userId={ProfileInfo.data.id} />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-5">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {isSelfProfile
                      ? "You are "
                      : `${ProfileInfo.data.name as string} is `}
                    not a member yet.
                  </h1>
                  <p className="text-sm lg:text-lg font-medium text-gray-600 dark:text-gray-400">
                    Please join the community to get your certificates.
                  </p>
                  <div className="border p-5 mt-5">
                    <Image
                      src={`${
                        env.NEXT_PUBLIC_URL
                      }/api/og?event=${encodeURIComponent(
                        "Sample Event"
                      )}&user=${encodeURIComponent(
                        "Member Name"
                      )}&date=${encodeURIComponent(
                        "01/01/2021"
                      )}&type=${encodeURIComponent("TeamParticipation")}`}
                      alt={"Sample certificate"}
                      width={500}
                      height={500}
                      className="blur-sm"
                    />
                  </div>
                </div>
              ))}

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
