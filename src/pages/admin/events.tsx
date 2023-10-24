import { EventFilter, EventTypes } from "@prisma/client";
import { type NextPage } from "next";
import { useState, type ReactElement,type FormEvent } from "react";
import { Toaster, toast } from "react-hot-toast";
import { env } from "../../env/client.mjs";
import { api } from "../../utils/api";
import { type Event } from "@prisma/client";
import Button from "../../components/button";
import withAdminRoute from "../../components/hoc/withAdminRoute";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { type JsonArray, type JsonValue } from "@prisma/client/runtime/library";
import ImageSlider from "../../components/imageslider";

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

interface ImageViewerProps {
  images: JsonArray;
  showImageViewer: boolean;
  setShowImageViewer: (showForm: boolean) => void;
  eventid: number;
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
  const [images, setImages] = useState<FileList | null>(null);
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
      
      if(images)
        for (let i = 0; i < images?.length; i++){
          const img = images[i];
          if(img)
            formData.append("file", img);
        } 
      formData.append("upload_preset", "event-uploads");

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

      try {
        await addEvent.mutateAsync(
          {
            name: formdata.name,
            date: new Date(formdata.date),
            attended: formdata.attended,
            type: formdata.type,
            images: JSON.parse(data.secure_url) as string[],
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

  const eventFilters = [
    "Year2023to2024",
    "Year2022to2023",
    "Year2021to2022",
    "Year2020to2021",
    "Year2017to2020",
  ];

  return (
    <div>
      <Toaster />
      <h4 className="heading mb-5 text-center text-2xl font-bold lg:text-4xl">
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
              required
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
              required
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
              required
            />

            <input
              className="rounded-lg border-2 border-gray-300 p-2"
              type="text"
              onChange={(e) =>
                setFormData({ ...formdata, organizer: e.target.value })
              }
              placeholder="Enter event organizer"
              required
            />
            <input
              className="rounded-lg border-2 border-gray-300 p-2"
              type="textarea"
              onChange={(e) =>
                setFormData({ ...formdata, description: e.target.value })
              }
              placeholder="Enter event description"
              required
            />
            <select
              className="rounded-lg border-2 border-gray-300 p-2"
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  filter: e.target.value as unknown as EventFilter,
                })
              }
              required
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
              required
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
              accept="image/*"
              placeholder="Image File"
              onChange={(e) => setImages(e.target.files as FileList)}
              multiple={true}
              required
            />
            <Button>Add Event</Button>
          </div>
        </form>
      </FormModal>
      <div className="flex justify-center">
        <Button onClick={() => setShowForm(true)}>Add event</Button>
      </div>
      {eventFilters.map((filter) => (
        <EventList key={filter} events={events as Events} filter={filter} />
      ))}
    </div>
  );
};

const EventList: React.FC<EventListProps> = ({ events, filter }) => {
  const eventQuery = api.eventRouter.getAllEvents.useQuery();
  const editEvent = api.eventRouter.editEvent.useMutation();
  // for to maintain separate editForm visibility
  const [showEditForm, setShowEditForm] = useState<boolean[]>(Array.isArray(events?.data) ? new Array(events.data.length).fill(false) : []);
  // maintain state to indicate change of image
  const [changeImage, setChangeImage] = useState<boolean>(false);
  // switch the visibility of the forms
  const handleEditClick = (index: number,show: boolean) => {
    const newShowEditForm = [...showEditForm];
    newShowEditForm[index] = show;
    setShowEditForm(newShowEditForm);
  };
  // handle and verify the changed image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) 
      return;

    for (let i = 0; i < files?.length; i++){
      const file = files[i];
      if (!file?.type.startsWith('image/')) {
        toast.error("Please select an image file (e.g., PNG, JPG, JPEG).");
        e.target.value = ""; // Reset the input value to clear the selected file
        return;
      }
    }
  };
  // update event handler
  const handleUpdateSubmit = async (e: FormEvent, index: number) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let image = formData.get("imgurl") as string;
    // only execute if the image is changed
    if(changeImage){
      const loadingToast = toast.loading("Please wait...");
      const form = e.currentTarget as HTMLFormElement;
      
      const fileInput = Array.from(form.elements).find(
        (element) => element instanceof HTMLInputElement && element.name === "eimage"
      ) as HTMLInputElement;
  
  
      for (const file of fileInput.files as FileList) {
        formData.append("file", file);
      }
  
      formData.append("upload_preset", "event-uploads");
  
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

      const data = (await response.json()) as CloudinaryResponse;
      image = data.secure_url;
      toast.dismiss(loadingToast);
    }

    const eidString = formData.get("eventid") as string;
    const eid = eidString ? parseInt(eidString) : 0;
    const name = formData.get("eventname") as string;
    const dateS = formData.get("eventdate") as string;
    const date = new Date(dateS);
    const attendedS = formData.get("eattended") as string;
    const attended = attendedS ? parseInt(attendedS) : 0;
    const type = formData.get("etype") as EventTypes;
    const organizer = formData.get("eorganizer") as string;
    const description = formData.get("edescription") as string;
    const filter = formData.get("efilter") as EventFilter;
      try {
        await editEvent.mutateAsync(
          {
            id: eid,
            name: name,
            date: date,
            attended: attended,
            type: type,
            images: JSON.parse(image) as string[],
            organizer: organizer,
            description: description,
            filter: filter,
          },
          {
            onSuccess: () => {
              handleEditClick(index,false);

              eventQuery
                .refetch()
                .then(() => {
                  toast.success("Event updated successfully");
                })
                .catch(() => {
                  toast.error("Error fetching events");
                });
            },
          }
        );
      } catch (error) {
        toast.error("Error updating event");
      }
    setChangeImage(false);
  };
  // function to get first image
  function getFirstImage(images:JsonValue): string {
    if (Array.isArray(images)) {
      const firstImage = images[0] as JsonArray;
      if (typeof firstImage === "string") {
        return firstImage;
      }
    }
    return "";
  }

  const [showImageViewers, setShowImageViewers] = useState<boolean[]>(Array.isArray(events?.data) ? new Array(events.data.length).fill(false) : []);

  const handleViewClick = (index: number, show: boolean) => {
    const newVisibilityState = [...showImageViewers];
    newVisibilityState[index] = show;
    setShowImageViewers(newVisibilityState);
  };

  const deleteEvent = api.eventRouter.deleteEvent.useMutation();

  const updateEvent = api.eventRouter.updateEvent.useMutation();

  return (
    <div className="mb-5 flex flex-col items-center justify-center px-5">
      <p className="my-5 w-fit rounded-lg border border-yellow-500 p-1 text-center text-xl font-bold">
        {filter.replace("Year", "").replace("to", " - ")}
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-5">
        {events.data &&
          events.data.map((event,index) => {
            if (event.filter === filter) {
              return (
                <div
                  key={event.id}
                  style={{
                    width: "250px",
                  }}
                  className="my-2 flex flex-col justify-center gap-3 rounded-lg border-2 border-gray-300 p-5 hover:bg-gray-200/30 dark:hover:bg-gray-800/30 transition-colors duration-300"
                >
                  <ImageViewer images={event.images as JsonArray}
                    showImageViewer={showImageViewers[index] || false}
                    setShowImageViewer={(newValue) => {
                        const newVisibilityState = [...showImageViewers];
                        newVisibilityState[index] = newValue;
                      setShowImageViewers(newVisibilityState);
                    }}
                    eventid={event.id}
                  />
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
                          <input type="text" name="eventid" id="eventid" hidden defaultValue={event.id}/>
                          <input
                            className="rounded-lg border-2 border-gray-300 p-2"
                            type="text"
                            defaultValue={event.name}
                            name="eventname"
                            placeholder="Enter event name"
                            required
                          />
                          <input
                            className="rounded-lg border-2 border-gray-300 p-2"
                            type="date"
                            name="eventdate"
                            defaultValue={event.date.toISOString().substr(0, 10)}
                            placeholder="Enter event date"
                            required
                          />
                          <input
                            className="rounded-lg border-2 border-gray-300 p-2"
                            type="number"
                            name="eattended"
                            defaultValue={event.attended}
                            placeholder="Enter number of attendees"
                            required
                          />

                          <input
                            className="rounded-lg border-2 border-gray-300 p-2"
                            type="text"
                            name="eorganizer"
                            defaultValue={event.organizer}
                            placeholder="Enter event organizer"
                            required
                          />
                          <input
                            className="rounded-lg border-2 border-gray-300 p-2"
                            type="textarea"
                            name="edescription"
                            defaultValue={event.description}
                            placeholder="Enter event description"
                            required
                          />
                          <select
                            className="rounded-lg border-2 border-gray-300 p-2"
                            defaultValue={event.filter}
                            name="efilter"
                            required
                          >
                            {Object.keys(EventFilter).map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                          <select
                            className="rounded-lg border-2 border-gray-300 p-2"
                            defaultValue={event.type}
                            name="etype"
                            required
                          >
                            {Object.keys(EventTypes).map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                        </select>
                        <div className="flex items-start space-x-3 ">
                          <input type="checkbox" className="border-gray-300 rounded h-5 w-5" checked={changeImage} onChange={() => { changeImage ? setChangeImage(false) : setChangeImage(true); }}/>
                          <div className="flex flex-col">
                            <h1 className="text-white leading-none">Do you want to update images too?</h1>
                          </div>
                        </div>
                        <input type="text" name="imgurl" id="imgurl" hidden defaultValue={JSON.stringify(event.images)}/>
                        <input
                            hidden={!changeImage}
                            required={changeImage}
                            className="rounded-lg border-2 border-gray-300 p-2"
                            type="file"
                            name="eimage"
                            accept="image/*"
                            placeholder="Image File"
                            multiple={true}
                            onChange={(e)=>handleImageChange(e)}
                          />
                          <Button>Update Event</Button>
                        </div>
                      </form>
                  </FormModal>
                  <div className="relative group">
                    <Image 
                      src={getFirstImage(event.images as JsonValue)}
                      alt={event.name}
                      width={150}
                      height={150}
                      className="rounded-lg flex justify-center w-full h-44 basis-2/4 border border-white group-hover:"
                      
                    />
                    <div onClick={() => handleViewClick(index,true)} className="pt-[25%] bg-[#000000c2] cursor-pointer absolute h-full w-full flex flex-col items-center content-center text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <FaRegEye size={30} />
                      <p>View all</p>
                    </div>
                  </div>
                  <div className="text-center basis-1/4">
                    <p className="text-center text-lg font-bold">
                      {event.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                     
                    <div className="mt-2 flex items-center justify-center">
                      <button className="text-3xl" onClick={() => handleEditClick(index,true)}>
                        <BiEdit />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="flex items-center gap-2 rounded-lg bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                      onClick={() => {
                        const loadingToast = toast.loading("Please wait...");
                        deleteEvent.mutate(
                          {
                            id: event.id,
                          },
                          {
                            onSuccess: () => {
                              toast.dismiss(loadingToast);
                              toast.success("Event deleted successfully");
                              events.refetch();
                            },
                            onError: () => {
                              toast.dismiss(loadingToast);
                              toast.error("Error adding event");
                            },
                          }
                        );
                      }}
                    >
                      <MdDeleteOutline /> Delete
                    </button>
                  </div>
                  <div className="flex justify-center gap-x-6 items-center">
                    <span>Is Avaialable</span>
                    <span
                      className={`w-14 h-8 rounded-full flex bg-black/10 dark:bg-gray-200/20  p-1 cursor-pointer`}
                      onClick={() => {
                        updateEvent.mutate({
                          id: event.id,
                          isAvailable: !event.isAvailable,
                        }, {
                          onSuccess: () => {
                            toast.success("Event is updated!!");
                            events.refetch();
                          },
                          onError: () => {
                            toast.error("Error updating event");
                          },
                        }
                        )
                      }}>
                      <span className={`${event.isAvailable ? 'translate-x-6 bg-yellow-400' : 'translate-x-0 bg-white'} flex w-6 h-6 rounded-full transition-all duration-200 ease-in-out`}></span>
                    </span>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  showImageViewer,
  setShowImageViewer,
  eventid,
}): ReactElement => {
  return (
    <>
      {showImageViewer && (
        <div className="fixed inset-0 z-10 mt-20 h-[80%] overflow-y-auto">   
          <div
            className="fixed inset-0 h-full w-full bg-black opacity-95"
            onClick={() => setShowImageViewer(false)}
          />
          <div className="flex h-fit items-center px-4 py-8">
            <div className="relative mx-auto w-full max-w-lg rounded-md bg-white bg-opacity-50 p-4 shadow-lg backdrop-blur-lg backdrop-filter">
              <ImageSlider images={images} eventid={eventid} deleteButton={true} />
            </div>
          </div>
        </div>
      )}
    </>
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

export default withAdminRoute(Event);