import { type NextPage } from "next";
import withAdminRoute from "../../components/hoc/withAdminRoute";
import { Toaster } from "react-hot-toast";

const AwardCertificates: NextPage = () => {
  return (
    <div className="mb-5">
      <Toaster />
      <h4 className="heading mb-5 text-center text-2xl font-bold">
        Award Certificates
      </h4>
      
    </div>
  );
};

export default withAdminRoute(AwardCertificates);
