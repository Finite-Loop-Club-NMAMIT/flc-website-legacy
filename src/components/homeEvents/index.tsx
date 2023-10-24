import { Slide } from "react-awesome-reveal";
import { api } from "../../utils/api";
import RegisterEventBtn from "../registerEventBtn";
import { extractStudentName } from "../../utils/name";
import { extractStudentDetailsFromEmail } from "../../utils/details";
import toast, { Toaster } from "react-hot-toast";
import Button from "../button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { type JsonValue, type JsonArray } from "@prisma/client/runtime/library";

const HomeEvents:React.FC = () => {

    const events = api.eventRouter.getAvailableEvent.useQuery();

    const { data:session, status } = useSession();
    const [showRegister,setShowRegister] = useState<boolean>(false);
    const [eventId,setEventId] = useState<number>(0);

    function getFirstImage(images:JsonValue): string {
        if (Array.isArray(images)) {
          const firstImage = images[0] as JsonArray;
          if (typeof firstImage === "string") {
            return firstImage;
          }
        }
        return "";
      }

    if (!events.data) return <></>

    return (
        <section className="w-full">
            {
                events.data && events.data.map((event, i)=>(
                    <div key={i} className={`w-full h-96 flex relative bg-no-repeat bg-cover bg-center`} style={{
                        backgroundImage: 'url('+getFirstImage(event.images)+')'
                    }}>
                        {/* <div className="bg-yellow-500/50 absolute top-0 left-0 w-full h-full flex z-0"></div> */}
                        <RegisterEventBtn eventId={event.id} status={status} showModal={()=>setShowRegister(true)} setEventId={()=>setEventId(event.id)}  />
                    </div>
                ))
            }
            <RegisterModal visible={showRegister} onClose={() => setShowRegister(false)} eventId={eventId} username={session?.user?.name} email={session?.user?.email} />
            <Toaster/>
        </section>
    )
};

export default HomeEvents;


type RegisterModalProps = {
    visible: boolean;
    onClose: () => void;
    eventId: number;
    username: string | null | undefined;
    email: string | null | undefined;
  };
  
  
  const RegisterModal: React.FC<RegisterModalProps> = ({ visible, onClose, username, email, eventId }) => {
    const handleOnClose = (element: HTMLDivElement) => {
        if (element.id === "container") onClose();
    };
  
    if (!visible) return null;
  
    const name = extractStudentName(username as string);
    const { branch, usn, year } = extractStudentDetailsFromEmail(email as string);
    const eventRegister = api.eventRouter.registerToEvent.useMutation();
  
    return (
        <div
            id="container"
            onClick={(e) => handleOnClose(e.target as HTMLDivElement)}
            className="fixed inset-0 flex justify-center bg-black bg-opacity-70 backdrop-blur-lg p-1 md:p-5 z-50 overflow-y-scroll "
        >
            <Slide triggerOnce direction="down" >
                <div className="p-4">
                    <div className="relative  max-w-5xl rounded-xl bg-white bg-opacity-30 p-6 shadow-sm backdrop-blur-lg backdrop-filter ">
                        <button
                            onClick={onClose}
                            className=" border absolute  top-0 right-0 rounded-full bg-opacity-70 p-1 text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
  
                        <h1 className="text-3xl text-yellow-400 text-center mb-8 mx-4">Confirm Registration</h1>
                        <p className="text-gray-200 mb-4 max-w-sm">
                            Confirm that the below details are correct before submit.
                            Any changes in the personal information, update your profile!!
                        </p>
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <span className="text-white col-span-1">Name:</span>
                            <input className="rounded-lg border-2 border-gray-300 p-2 col-span-3" type="text" value={name} disabled />
                            <span className="text-white col-span-1">USN:</span>
                            <input className="rounded-lg border-2 border-gray-300 p-2 col-span-3" type="text" value={usn} disabled />
                            <span className="text-white col-span-1">Branch:</span>
                            <input className="rounded-lg border-2 border-gray-300 p-2 col-span-3 uppercase" type="text" value={branch} disabled />
                            <span className="text-white col-span-1">Year:</span>
                            <input className="rounded-lg border-2 border-gray-300 p-2 col-span-3" type="text" value={'20' + year} disabled />
                        </div>
  
                        <Button className="flex mx-auto mt-4"
                            onClick={() => {
                                eventRegister.mutate({
                                    eventId
                                },
                                    {
                                        onSuccess: () => {
                                            toast.success("Registered to event successfully!!");
                                            onClose();
                                        },
                                        onError: () => {
                                            toast.error("Couldnot register to the event!!")
                                        }
                                    })
                            }}
                        >Confirm Registration</Button>
                    </div>
                </div>
            </Slide>
        </div>
    )
  }
  