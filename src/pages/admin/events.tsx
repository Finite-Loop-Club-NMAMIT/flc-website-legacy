import { EventFilter, EventTypes } from "@prisma/client";
import { type NextPage } from "next";
import { useState, type ReactElement } from "react";
import { Toaster, toast } from "react-hot-toast";
import { env } from "../../env/client.mjs";
import { api } from "../../utils/api";
import { type Event } from "@prisma/client";
import Button from "../../components/button";
import BlurImage from "../../components/blurImage";

type Events = {
  data: Event[];
  refetch: () => void;
};

interface EventListProps {
  events: Events;
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

interface FormData {
  name: string;
  date: Date;
  attended: number;
  type: EventTypes;
  image: string;
  organizer: string;
  description: string;
  filter: EventFilter;
}

const Event: NextPage = () => {
  const events = api.eventRouter.getAllEvents.useQuery();
  const addEvent = api.eventRouter.addEvent.useMutation();
  const [image, setImage] = useState<File | null>(null);
  const [formdata, setFormData] = useState<FormData>({
    name: "",
    date: new Date(),
    attended: 0,
    type: EventTypes.Workshop,
    image: "",
    organizer: "",
    description: "",
    filter: EventFilter.Year2022to2023,
  } as FormData);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async () => {
    {
      const loadingToast = toast.loading("Please wait...");
      const formData = new FormData();
      formData.append("file", image as File);
      formData.append("upload_preset", "event-uploads");

      console.log(formData.get("file"));
      console.log(formData.get("upload_preset"));

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
        await addEvent.mutateAsync(
          {
            name: formdata.name,
            date: new Date(formdata.date),
            attended: formdata.attended,
            type: formdata.type,
            image: data.secure_url,
            organizer: formdata.organizer,
            description: formdata.description,
            filter: formdata.filter,
          },
          {
            onSuccess: () => {
              setShowForm(false);
              toast.dismiss(loadingToast);

              events
                .refetch()
                .then(() => {
                  toast.success("Event added successfully");
                })
                .catch(() => {
                  toast.error("Error fetching events");
                });
            },
          }
        );
      } catch (error) {
        toast.error("Error adding event");
      }
    }
  };

  return (
    <div>
      <Toaster />
      <h4 className="heading mb-5 text-center text-2xl font-bold">
        Events List
      </h4>
      <FormModal showForm={showForm} setShowForm={setShowForm}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <div className="flex flex-col gap-5">
            <input
              className="rounded-lg border-2 border-gray-300 p-2"
              type="text"
              onChange={(e) =>
                setFormData({ ...formdata, name: e.target.value })
              }
              placeholder="Enter event name"
            />
            <input
              className="rounded-lg border-2 border-gray-300 p-2"
              type="date"
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  date: e.target.value as unknown as Date,
                })
              }
              placeholder="Enter event date"
            />
            <input
              className="rounded-lg border-2 border-gray-300 p-2"
              type="number"
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  attended: parseInt(e.target.value),
                })
              }
              placeholder="Enter number of attendees"
            />

            <input
              className="rounded-lg border-2 border-gray-300 p-2"
              type="text"
              onChange={(e) =>
                setFormData({ ...formdata, organizer: e.target.value })
              }
              placeholder="Enter event organizer"
            />
            <input
              className="rounded-lg border-2 border-gray-300 p-2"
              type="textarea"
              onChange={(e) =>
                setFormData({ ...formdata, description: e.target.value })
              }
              placeholder="Enter event description"
            />
            <select
              className="rounded-lg border-2 border-gray-300 p-2"
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  filter: e.target.value as unknown as EventFilter,
                })
              }
            >
              {Object.keys(EventFilter).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border-2 border-gray-300 p-2"
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  type: e.target.value as unknown as EventTypes,
                })
              }
            >
              {Object.keys(EventTypes).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <input
              className="rounded-lg border-2 border-gray-300 p-2"
              type="file"
              placeholder="Image File"
              onChange={(e) => setImage(e.target.files?.[0] as File)}
              multiple={false}
            />
            <Button>Add Event</Button>
          </div>
        </form>
      </FormModal>
      <div className="flex justify-center">
        <Button onClick={() => setShowForm(true)}>Add event</Button>
      </div>
      <EventList events={events as Events} filter="Year2022to2023" />
      <EventList events={events as Events} filter="Year2021to2022" />
      <EventList events={events as Events} filter="Year2020to2021" />
      <EventList events={events as Events} filter="Year2017to2020" />
    </div>
  );
};

const EventList: React.FC<EventListProps> = ({ events, filter }) => {
  const deleteEvent = api.eventRouter.deleteEvent.useMutation();
  return (
    <div>
      <p className="my-5 text-center text-xl font-bold">
        {filter.replace("Year", "").replace("to", " - ")}
      </p>
      <div className="mt-2 flex flex-col justify-center">
        {events.data &&
          events.data.map((event) => {
            if (event.filter === filter) {
              return (
                <div
                  key={event.id}
                  className="mx-auto my-2 flex w-1/2 flex-row items-center justify-between gap-5 rounded-lg border-2 border-gray-300 p-5 hover:bg-gray-300 dark:hover:bg-gray-800"
                >
                  <BlurImage
                    src={event.image}
                    alt={event.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <p className="text-center text-lg font-bold">{event.name}</p>
                  <div className="flex gap-5">
                    <Button
                      onClick={() => {
                        deleteEvent.mutate(
                          {
                            id: event.id,
                          },
                          {
                            onSuccess: () => {
                              toast.success("Event deleted successfully");
                              events.refetch();
                            },
                            onError: () => {
                              toast.error("Error adding event");
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

export default Event;
