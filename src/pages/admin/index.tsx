import withAdminRoute from "../../components/hoc/withAdminRoute";
import { type NextPage } from "next";
import Button from "../../components/button";
import Link from "next/link";

const AdminPage: NextPage = () => {
  return (
    <div>
      <h4 className="heading mb-5 text-center text-2xl font-bold">
        Welcome to Admin Dashboard
      </h4>
      <div className="mb-5 flex flex-col items-center justify-center gap-5">
        <Link href="/admin/events">
          <Button>Events</Button>
        </Link>
        <Link href="/admin/team">
          <Button>Core team</Button>
        </Link>
      </div>
    </div>
  );
};

export default withAdminRoute(AdminPage);
