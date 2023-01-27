import withAdminRoute from "../../components/hoc/withAdminRoute";
import { type NextPage } from "next";
import Button from "../../components/button";
import Link from "next/link";

const EditEvents: NextPage = () => {
  return (
    <div>
      <h4 className="heading mb-5 text-center text-2xl font-bold">Events</h4>
    </div>
  );
};

export default withAdminRoute(EditEvents);
