import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { type FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../button";
import { type User } from "@prisma/client";

const EditProfileModal = ({
  setShowModal,
  showModal,
  editData,
  socialLinks,
  setEditData,
  setSocialLinks,
  ProfileData,
  platformIcons,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  editData: User;
  setEditData: React.Dispatch<React.SetStateAction<User>>;
  ProfileData: User;
  socialLinks: {
    platform: string;
    link: string;
  }[];
  setSocialLinks: React.Dispatch<
    React.SetStateAction<
      {
        platform: string;
        link: string;
      }[]
    >
  >;
  platformIcons: {
    [key: string]: JSX.Element;
  };
}) => {
  const router = useRouter();
  const editProfile = api.userRouter.editUser.useMutation();
  const isUsernameAvailable = api.userRouter.isUsernameAvailable.useQuery(
    {
      username: editData.username as string,
    },
    {
      enabled: showModal,
      onSuccess: (data) => {
        if (data === false) {
          setInfoText("Username already taken");
        } else {
          setInfoText("Username available");
        }
      },
    }
  );
  const [infoText, setInfoText] = useState<string>("");

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
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const platforms = socialLinks?.map((link) => link.platform);
    if (new Set(platforms).size !== platforms.length) {
      toast.error("You have added multiple links for the same platform");
    } else if (
      socialLinks?.filter((link) => link.platform === "Select a platform")
        .length > 0
    ) {
      toast.error("You have not selected a platform for one of the links");
    } else if (socialLinks?.filter((link) => link.link === "").length > 0) {
      toast.error("You have not added a link for one of the platforms");
    } else if (
      isUsernameAvailable.data === false &&
      !ProfileData?.username?.includes(editData.username as string)
    ) {
      toast.error("User with that username already exists");
    } else if ((editData.username?.length as number) > 15) {
      toast.error("Username should be less than 15 characters");
    } else {
      try {
        editProfile.mutate(
          {
            username: editData.username as string,
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
              router
                .push(`/u/${editData.username as string}`)
                .then(() => {
                  router.reload(); //to re render navbar for new username
                })
                .catch(() => {
                  toast.error("Something went wrong");
                });
            },
          }
        );
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className="fixed inset-0 z-10 mt-20 h-[70%] overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-30 dark:opacity-70"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-white bg-opacity-50 p-4 shadow-lg backdrop-blur-lg backdrop-filter">
          <form onSubmit={(e) => handleSave(e)} className="mb-0 space-y-4 p-8">
            <p className="text-lg font-medium">Edit your Profile</p>
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>

              <div className="relative mt-1">
                <input
                  id="name"
                  name="name"
                  defaultValue={ProfileData.name as string}
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
              <label htmlFor="name" className="text-sm font-medium">
                Username
              </label>

              <div className="relative mt-1">
                <input
                  id="username"
                  name="username"
                  max={15}
                  defaultValue={ProfileData.username as string}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      username: e.target.value,
                    });
                    setInfoText("Checking...");
                  }}
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter username"
                />
                {infoText && editData.username !== ProfileData.username && (
                  <span
                    className={`text-sm ${
                      isUsernameAvailable.data
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {infoText}
                  </span>
                )}

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
                  defaultValue={ProfileData.bio as string}
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
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>

              <div className="relative mt-1">
                <input
                  id="phone"
                  name="phone"
                  defaultValue={ProfileData.phone as string}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      phone: e.target.value,
                    })
                  }
                  type="tel"
                  pattern="[0-9]{10}"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter phone number"
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center"></span>
              </div>
            </div>

            <div>
              <label htmlFor="branch" className="text-sm font-medium">
                Branch
              </label>

              <div className="relative mt-1">
                <select
                  id="branch"
                  name="branch"
                  defaultValue={ProfileData.branch as string}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      branch: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter branch"
                >
                  <option key="" value="">Select the branch</option>
                  <option key="" value="hulk">hulk</option>
                  <option key="" value="thor">thor</option>
                  <option key="" value="ironman">ironman</option>
                  {/* {Object.entries(branches).map(([key,branch]) => (
                        <option key={key} value={branch.branchSF}>
                          {branch.branchFN}
                        </option>
                  ))} */}
                </select>

                <span className="absolute inset-y-0 right-4 inline-flex items-center"></span>
              </div>
            </div>

            <div>
              <label htmlFor="year" className="text-sm font-medium">
                Year
              </label>

              <div className="relative mt-1">
                <input
                  id="year"
                  name="year"
                  // defaultValue={ProfileData.year as number}
                  // onChange={(e) =>
                  //   setEditData({
                  //     ...editData,
                  //     year: parseInt(e.target.value),
                  //   })
                  // }
                  // type="number" min={minYear} max={maxYear}
                  pattern="[0-9]{4}"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter year YYYY"
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center"></span>
              </div>
            </div>

            <div>
              <label htmlFor="socialLinks" className="text-sm font-medium">
                Social Links
              </label>

              {socialLinks &&
                socialLinks?.map((link, index) => (
                  <div className="mb-4 flex items-center gap-3" key={index}>
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
                      {Object.entries(platformIcons).map(([platform, icon]) => (
                        <option key={platform} value={platform}>
                          {icon} {platform}
                        </option>
                      ))}
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
  );
};

export default EditProfileModal;