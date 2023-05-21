import { type NextPage } from "next";
import withAdminRoute from "../../components/hoc/withAdminRoute";
import { Toaster } from "react-hot-toast";
import { CertificateTypes } from "@prisma/client";
import { api } from "../../utils/api";
import { useState } from "react";

const AwardCertificates: NextPage = () => {
  const events = api.eventRouter.getAllEvents.useQuery();
  const [selectedEvent, setSelectedEvent] = useState(events.data?.[0]?.id);
  const [selectedAward, setSelectedAward] = useState<CertificateTypes>(
    CertificateTypes.TeamParticipation
  );
  const [selectedSpecialRecognition, setSelectedSpecialRecognition] =
    useState("");

  return (
    <div className="mb-5">
      <Toaster />
      <h4 className="heading mb-5 text-center text-2xl font-bold">
        Award Certificates
      </h4>
      <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between">
        <label className="mr-2 flex-1">
          Event
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(Number(e.target.value))}
            className="w-64 rounded-md border border-gray-400 px-2 py-1"
          >
            {events.data
              ?.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
              })
              .map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
          </select>
        </label>
        <label className="mr-2 flex-1">
          Award
          <select
            value={selectedAward}
            onChange={(e) =>
              setSelectedAward(e.target.value as CertificateTypes)
            }
            className="w-64 rounded-md border border-gray-400 px-2 py-1"
          >
            {Object.values(CertificateTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        {selectedAward === CertificateTypes.SpecialRecognition && (
          <label className="mr-2">
            Special Recognition for
            <input
              value={selectedSpecialRecognition}
              onChange={(e) => setSelectedSpecialRecognition(e.target.value)}
              type="text"
              className="w-64 rounded-md border border-gray-400 px-2 py-1"
              disabled
            />
          </label>
        )}
      </div>

      <div>
        {/* Users Paginated table with Search bar */}
      </div>
    </div>
  );
};

export default withAdminRoute(AwardCertificates);
