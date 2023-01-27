import withAdminRoute from "../../components/hoc/withAdminRoute";
import { type NextPage } from "next";
import { api } from "../../utils/api";
import Image from "next/image";
import { CoreFilter, Role, type Core } from "@prisma/client";
import Button from "../../components/button";
import { useState } from "react";

interface CoreMemberListProps {
  members: Core[];
  filter: string;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  type: string;
  setType: (type: string) => void;
  editingMember: number;
  setEditingMember: (editingMember: number) => void;
}

interface FormComponentProps {
  type: string;
  members: Core[];
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  editingMember: number;
}

const EditTeam: NextPage = () => {
  const members = api.coreRouter.getAllCoreMembers.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<string>("");
  const [editingMember, setEditingMember] = useState<number>(0);

  return (
    <div className="mb-5">
      <h4 className="heading mb-5 text-center text-2xl font-bold">Core Team</h4>
      <div className="flex justify-center">
        {!showForm && (
          <Button
            onClick={() => {
              setShowForm(true);
              setType("add");
              setEditingMember(0);
            }}
          >
            Add member
          </Button>
        )}
        {showForm && type === "add" && (
          <FormComponent
            type={type}
            members={members.data as Core[]}
            showForm={showForm}
            setShowForm={setShowForm}
            editingMember={editingMember}
          />
        )}
      </div>
      <CoreMemberList
        members={members.data as Core[]}
        filter="Faculty"
        showForm={showForm}
        setShowForm={setShowForm}
        type={type}
        setType={setType}
        editingMember={editingMember}
        setEditingMember={setEditingMember}
      />
      <CoreMemberList
        members={members.data as Core[]}
        filter="Year2022to2023"
        showForm={showForm}
        setShowForm={setShowForm}
        type={type}
        setType={setType}
        editingMember={editingMember}
        setEditingMember={setEditingMember}
      />
      <CoreMemberList
        members={members.data as Core[]}
        filter="Year2021to2022"
        showForm={showForm}
        setShowForm={setShowForm}
        type={type}
        setType={setType}
        editingMember={editingMember}
        setEditingMember={setEditingMember}
      />
      <CoreMemberList
        members={members.data as Core[]}
        filter="Year2020to2021"
        showForm={showForm}
        setShowForm={setShowForm}
        type={type}
        setType={setType}
        editingMember={editingMember}
        setEditingMember={setEditingMember}
      />
      <CoreMemberList
        members={members.data as Core[]}
        filter="Year2017to2020"
        showForm={showForm}
        setShowForm={setShowForm}
        type={type}
        setType={setType}
        editingMember={editingMember}
        setEditingMember={setEditingMember}
      />
    </div>
  );
};

const CoreMemberList: React.FC<CoreMemberListProps> = ({
  members,
  filter,
  showForm,
  setShowForm,
  type,
  setType,
  editingMember,
  setEditingMember,
}) => {
  return (
    <div>
      <p className="my-5 text-center text-xl font-bold">
        {filter.replace("Year", "").replace("to", " - ")}
      </p>
      <div className="mt-2 flex flex-col justify-center">
        {members &&
          members.map((member) => {
            if (member.filter === filter) {
              return showForm &&
                type === "edit" &&
                editingMember === member.id ? (
                <FormComponent
                  type="edit"
                  members={members}
                  showForm={showForm}
                  editingMember={editingMember}
                  setShowForm={setShowForm}
                />
              ) : (
                <div
                  key={member.id}
                  className="mx-auto my-2 flex w-1/2 flex-row items-center justify-between gap-5 rounded-lg border-2 border-gray-300 p-5 hover:bg-gray-300 dark:hover:bg-gray-800"
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <p className="text-center text-lg font-bold">{member.name}</p>
                  <div className="flex gap-5">
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        setType("edit");
                        setEditingMember(member.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button>Delete</Button>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

const FormComponent: React.FC<FormComponentProps> = ({
  type,
  members,
  showForm,
  setShowForm,
  editingMember,
}) => {
  const addMember = api.coreRouter.addCoreMember.useMutation();
  const editMember = api.coreRouter.editCoreMember.useMutation();
  const member = members.find((member) => member.id === editingMember);
  return (
    <>
      {showForm && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("name") as string;
            const img = formData.get("img") as string;
            const filter = formData.get("filter") as CoreFilter;
            const role = formData.get("role") as Role;
            const github = formData.get("github") as string;
            const linkedin = formData.get("linkedin") as string;
            type === "add"
              ? await addMember.mutateAsync(
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
                      try {
                        members.refetch();
                      } catch (error) {
                        console.log(error);
                      }
                      setShowForm(false);
                    },
                  }
                )
              : await editMember.mutateAsync(
                  {
                    id: member?.id,
                    name: name,
                    img: img,
                    filter: filter,
                    role: role,
                    github: github,
                    linkedin: linkedin,
                  },
                  {
                    onSuccess: () => {
                      try {
                        members.refetch();
                      } catch (error) {
                        console.log(error);
                      }
                      setShowForm(false);
                    },
                  }
                );
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
              type="text"
              name="img"
              placeholder="Image URL"
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
            <Button>{type === "add" ? "Add Member" : "Edit Member"}</Button>
          </div>
        </form>
      )}
    </>
  );
};

export default withAdminRoute(EditTeam);
