import withAdminRoute from "../../components/hoc/withAdminRoute";
import { type NextPage } from "next";
import { api } from "../../utils/api";
import { type Core, CoreFilter, Role } from "@prisma/client";
import Button from "../../components/button";
import { type ReactElement, useState, type FormEvent } from "react";
import { Toaster, toast } from "react-hot-toast";
import { env } from "../../env/client.mjs";
import Image from "next/image";

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
            />
            <input
              type="file"
              name="img"
              placeholder="Image File"
              className="rounded-lg border-2 border-gray-300 p-2"
            />
            <select
              name="role"
              className="rounded-lg border-2 border-gray-300 p-2"
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
      <CoreMemberList members={members as Members} filter="Faculty" />
      <CoreMemberList members={members as Members} filter="Year2022to2023" />
      <CoreMemberList members={members as Members} filter="Year2021to2022" />
      <CoreMemberList members={members as Members} filter="Year2020to2021" />
      <CoreMemberList members={members as Members} filter="Year2017to2020" />
    </div>
  );
};

const CoreMemberList: React.FC<CoreMemberListProps> = ({ members, filter }) => {
  const deleteCoreMember = api.coreRouter.deleteCoreMember.useMutation();
  return (
    <div className="mb-5 flex flex-col items-center justify-center px-5">
      <p className="my-5 w-fit rounded-lg border border-yellow-500 p-1 text-center text-xl font-bold">
        {filter.replace("Year", "").replace("to", " - ")}
      </p>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.data &&
          members.data.map((member) => {
            if (member.filter === filter) {
              return (
                <div
                  key={member.id}
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-300 p-5 hover:bg-gray-200/50 dark:hover:bg-gray-800"
                >
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
                        deleteCoreMember.mutate(
                          {
                            id: member.id,
                          },
                          {
                            onSuccess: () => {
                              toast.success("Member deleted successfully");
                              members.refetch();
                            },
                            onError: () => {
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
