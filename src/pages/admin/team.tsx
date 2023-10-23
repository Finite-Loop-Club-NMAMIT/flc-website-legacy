import withAdminRoute from "../../components/hoc/withAdminRoute";
import { type NextPage } from "next";
import { api } from "../../utils/api";
import { type Core, CoreFilter, Role } from "@prisma/client";
import Button from "../../components/button";
import React, { type ReactElement, useState, type FormEvent } from "react";
import { Toaster, toast } from "react-hot-toast";
import { env } from "../../env/client.mjs";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";

type Members = {
  data: Core[];
  refetch: () => void;
};

interface CoreMemberListProps {
  members: Members;
  filter: string;
}

interface FormModalProps {
  children: React.ReactNode;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
}

interface CloudinaryResponse {
  secure_url: string;
}

const AddCore: NextPage = () => {
  const members = api.coreRouter.getAllCoreMembers.useQuery();
  const addMember = api.coreRouter.addCoreMember.useMutation();
  const [showForm, setShowForm] = useState(false);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Please wait...");

    const form = e.currentTarget as HTMLFormElement;

    const fileInput = Array.from(form.elements).find(
      (element) => element instanceof HTMLInputElement && element.name === "img"
    ) as HTMLInputElement;

    const formData = new FormData(e.target as HTMLFormElement);

    for (const file of fileInput.files as FileList) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "core-team-uploads");

    const response: Response = await fetch(
      `${env.NEXT_PUBLIC_URL}/api/image/admin`,
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

    toast.dismiss(loadingToast);
    const data: CloudinaryResponse =
      (await response.json()) as CloudinaryResponse;

    const name = formData.get("name") as string;
    const img = data.secure_url;
    const filter = formData.get("filter") as CoreFilter;
    const role = formData.get("role") as Role;
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    await addMember.mutateAsync(
      {
        name: name,
        img: img,
        filter: filter,
        role: role,
        github: github,
        linkedin: linkedin,
      },
      {
        onSuccess: () => {
          members
            .refetch()
            .then(() => {
              toast.success("Member added successfully");
              setShowForm(false);
            })
            .catch(() => {
              toast.error("Error fetching events");
              setShowForm(false);
            });
        },
        onError: () => {
          toast.error("Error adding member");
        },
      }
    );
  };

  return (
    <div className="mb-5">
      <Toaster />
      <h4 className="heading mb-5 text-center text-2xl font-bold">Core Team</h4>
      <FormModal showForm={showForm} setShowForm={setShowForm}>
        <form
          onSubmit={async (e) => {
            await handleOnSubmit(e);
          }}
        >
          <div className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="rounded-lg border-2 border-gray-300 p-2"
              required
            />
            <input
              type="file"
              name="img"
              accept="image/*"
              placeholder="Image File"
              className="rounded-lg border-2 border-gray-300 p-2"
              required
            />
            <select
              name="role"
              className="rounded-lg border-2 border-gray-300 p-2"
              required
            >
              {Object.keys(Role).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select
              name="filter"
              className="rounded-lg border-2 border-gray-300 p-2"
              required
            >
              {Object.keys(CoreFilter).map((filter) => (
                <option key={filter} value={filter}>
                  {filter.replace("Year", "").replace("to", " - ")}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="github"
              defaultValue=""
              placeholder="Github URL"
              className="rounded-lg border-2 border-gray-300 p-2"
            />
            <input
              type="text"
              name="linkedin"
              defaultValue=""
              placeholder="Linkedin URL"
              className="rounded-lg border-2 border-gray-300 p-2"
            />
            <Button>Add Member</Button>
          </div>
        </form>
      </FormModal>
      <div className="flex justify-center">
        <Button onClick={() => setShowForm(true)}>Add member</Button>
      </div>
      {Object.keys(CoreFilter).reverse().map((filter) => (
         <CoreMemberList members={members as Members} filter={filter} key={filter} />
      ))}
    </div>
  );
};

const CoreMemberList: React.FC<CoreMemberListProps> = ({ members, filter }) => {
  const memberQuery = api.coreRouter.getAllCoreMembers.useQuery();
  const editCoreMember = api.coreRouter.editCore.useMutation();
  // for to maintain separate editForm visibility
  const [showEditForm, setShowEditForm] = useState<boolean[]>(Array.isArray(members?.data) ? new Array(members.data.length).fill(false) : []);
  // for to maintain separate SelectedImage in a form
  const [selectedImages, setSelectedImages] = useState<(string | null)[]>(Array.isArray(members?.data) ? new Array(members.data.length).fill(false) : []);
  // switch the visibility of the forms
  const handleEditClick = (index: number, show: boolean) => {
    const newShowEditForm = [...showEditForm];
    newShowEditForm[index] = show;
    setShowEditForm(newShowEditForm);
  };
  // update status of newly selected image
  const updateSelectedImages = (index: number, image: string|null): void => {
    const updatedImages = [...selectedImages];
    updatedImages[index] = image;
    setSelectedImages(updatedImages);
  };
  // handle and verify the changed image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>,index:number) => {
    const file = e.target.files?.[0];
    // handler if user selects other file than image
    if (!file?.type.startsWith('image/')) {
      toast.error("Please select an image file (e.g., PNG, JPG, JPEG).");
      e.target.value = ""; // Reset the input value to clear the selected file
      return;
    } else {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result =reader.result as string;
        updateSelectedImages(index,result);
      };
      reader.readAsDataURL(file);
    }
  };
  // update core handler
  const handleUpdateSubmit = async (e: FormEvent,index: number) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    let img = formData.get("imgurl") as string;
    // only execute if the image is changed
    if (selectedImages[index]!==null) {
      const loadingToast = toast.loading("Please wait...");
      const form = e.currentTarget as HTMLFormElement;
      
      const fileInput = Array.from(form.elements).find(
        (element) => element instanceof HTMLInputElement && element.name === "memberimage"
      ) as HTMLInputElement;
  
  
      for (const file of fileInput.files as FileList) {
        formData.append("file", file);
      }
  
      formData.append("upload_preset", "core-team-uploads");
  
      const response: Response = await fetch(
        `${env.NEXT_PUBLIC_URL}/api/image/admin`,
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
      img = data.secure_url;
      
      toast.dismiss(loadingToast);
    } 

    const memidString = formData.get("memberid") as string;
    const memid = memidString ? parseInt(memidString) : 0;
    const name = formData.get("name") as string;
    const filter = formData.get("filter") as CoreFilter;
    const role = formData.get("role") as Role;
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    
    await editCoreMember.mutateAsync(
      {
        id: memid,
        name: name,
        img: img,
        filter: filter,
        role: role,
        github: github,
        linkedin: linkedin,
      },
      {
        onSuccess: () => {
          memberQuery
            .refetch()
            .then(() => {
              toast.success("Member updated successfully");
              handleEditClick(index,false);
            })
            .catch(() => {
              toast.error("Error fetching members");
              handleEditClick(index,false);
            });
        },
        onError: () => {
          toast.error("Error updating member");
        },
      }
    );
    updateSelectedImages(index, null);
  };

  const deleteCoreMember = api.coreRouter.deleteCoreMember.useMutation();
  return (
    <div className="mb-5 flex flex-col items-center justify-center px-5">
      <p className="my-5 w-fit rounded-lg border border-yellow-500 p-1 text-center text-xl font-bold">
        {filter.replace("Year", "").replace("to", " - ")}
      </p>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.data &&
          members.data.map((member,index) => {
            if (member.filter === filter) {
              return (
                <div
                  key={member.id}
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-300 p-5 hover:bg-gray-200/50 dark:hover:bg-gray-800"
                >
                  <FormModal showForm={showEditForm[index] || false} setShowForm={(value) => {
                      const newShowEditForm = [...showEditForm];
                      newShowEditForm[index] = value;
                      setShowEditForm(newShowEditForm);
                  }}>
                    <form
                      onSubmit={async (e) => {
                        await handleUpdateSubmit(e,index);
                      }}
                    >
                      <div className="flex flex-col gap-5">
                        <input type="number" name="memberid" id="memberid" hidden defaultValue={member.id}/>
                        <input
                          type="text"
                          name="name"
                          defaultValue={member.name}
                          placeholder="Name"
                          className="rounded-lg border-2 border-gray-300 p-2"
                          required
                        />
                        <div className="flex ">
                          <Image
                            src={selectedImages[index]??member.img}
                            alt={member.name}
                            width={50}
                            height={50}
                            style={{
                              objectFit: "cover",
                              objectPosition: "center center",
                              width: "50px",
                              height: "50px",
                            }}
                            className="rounded-full mr-2"
                          />
                          <input type="text" name="imgurl" id="imgurl" hidden defaultValue={member.img}/>
                          <input
                            type="file"
                            name="memberimage"
                            accept="image/*"
                            placeholder="Image File"
                            className="rounded-lg border-2 border-gray-300 p-2"
                            onChange={(e) => handleImageChange(e, index)}
                          />
                        </div>
                        <select
                          name="role"
                          className="rounded-lg border-2 border-gray-300 p-2"
                          required
                          defaultValue={member.role as string || ""}
                        >
                          {Object.keys(Role).map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <select
                          name="filter"
                          className="rounded-lg border-2 border-gray-300 p-2"
                          required
                          defaultValue={member.filter as string || ""}
                        >
                          {Object.keys(CoreFilter).map((filter) => (
                            <option key={filter} value={filter}>
                              {filter.replace("Year", "").replace("to", " - ")}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          name="github"
                          defaultValue={member.github as string || ""}
                          placeholder="Github URL"
                          className="rounded-lg border-2 border-gray-300 p-2"
                        />
                        <input
                          type="text"
                          name="linkedin"
                          defaultValue={member.linkedin as string || ""}
                          placeholder="Linkedin URL"
                          className="rounded-lg border-2 border-gray-300 p-2"
                        />
                        <Button>Update Details</Button>
                      </div>
                    </form>
                  </FormModal>
                  <div className="w-full flex items-center justify-end">
                    <button className="text-2xl text-white lg:mx-3" onClick={() => handleEditClick(index,true)}>
                      <BiEdit/>
                    </button>
                  </div>
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={50}
                    height={50}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center center",
                      width: "50px",
                      height: "50px",
                    }}
                    className="rounded-full"
                  />
                  <p className="text-center text-lg font-bold">{member.name}</p>
                  <div className="mt-3">
                    <Button
                      onClick={() => {
                        const loadingToast = toast.loading("Please wait...");
                        deleteCoreMember.mutate(
                          {
                            id: member.id,
                          },
                          {
                            onSuccess: () => {
                              toast.dismiss(loadingToast);
                              toast.success("Member deleted successfully");
                              members.refetch();
                            },
                            onError: () => {
                              toast.dismiss(loadingToast);
                              toast.error("Error adding member");
                            },
                          }
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

const FormModal: React.FC<FormModalProps> = ({
  children,
  showForm,
  setShowForm,
}): ReactElement => {
  return (
    <>
      {showForm && (
        <div className="fixed inset-0 z-10 mt-20 h-[80%] overflow-y-auto">
          <div
            className="fixed inset-0 h-full w-full bg-black opacity-70"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="flex min-h-screen items-center px-4 py-8">
            <div className="relative mx-auto w-full max-w-lg rounded-md bg-white bg-opacity-50 p-4 shadow-lg backdrop-blur-lg backdrop-filter">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withAdminRoute(AddCore);
