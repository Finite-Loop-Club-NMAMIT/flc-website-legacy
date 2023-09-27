import Link from "next/link";
import { type FormEvent, useRef } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import BlurImage from "../blurImage";
import { type User } from "@prisma/client";
import { toast } from "react-hot-toast";
import { AiFillCamera, AiOutlineShareAlt } from "react-icons/ai";

const ProfileUI = ({
    ProfileInfo,
    handleProfileUpdate,
    socialLinks,
    platformIcons,
    isSelfProfile,
  }: {
    ProfileInfo: User;
    handleProfileUpdate: (e: FormEvent) => void;
    socialLinks?: {
      platform: string;
      link: string;
    }[];
    platformIcons: {
      [key: string]: JSX.Element;
    };
    isSelfProfile: boolean;
  }) => {
    const fileInput = useRef<HTMLInputElement>(null);
    return (
      <>
        <div className="relative">
          <BlurImage
            className="rounded-lg"
            src={ProfileInfo?.image?.split("=")[0] as string}
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
          {isSelfProfile && (
            <button
              onClick={() => {
                fileInput.current?.click();
              }}
              className="absolute bottom-0 left-0 m-2 flex items-center rounded-full bg-yellow-400 p-2 font-bold text-black duration-500 hover:scale-[1.03] hover:bg-yellow-300"
            >
              <AiFillCamera />
              <input
                onChange={(e) => handleProfileUpdate(e)}
                ref={fileInput}
                type="file"
                className="hidden"
                accept="image/*"
              />
            </button>
          )}
        </div>
        <a className="heading text-center text-2xl font-bold">
          {ProfileInfo?.name as string}
        </a>
        <p className="text-sm text-yellow-500">
          @{ProfileInfo?.username as string}
        </p>
        <p className="font-bold text-gray-700 dark:text-gray-300">
          Bio:{" "}
          <span className="text-black dark:text-white">
            {ProfileInfo?.bio ? ProfileInfo?.bio : "No bio provided."}
          </span>
        </p>
        <p className="font-bold text-gray-700 dark:text-gray-300">
          Role:{" "}
          <span className="inline-flex items-center gap-1 text-black dark:text-white">
            {ProfileInfo?.isMember ? (
              <>
                <span className="uppercase">{ProfileInfo?.role}</span>
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
                    platformIcons[link.platform as keyof typeof platformIcons]
                  ) : (
                    <div></div>
                  )}
                </Link>
              </div>
            ))}
        </div>
      </>
    );
  };

export default ProfileUI;