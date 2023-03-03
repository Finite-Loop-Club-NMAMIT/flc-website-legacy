import { useSession } from "next-auth/react";
import Error from "../../error";
import { api } from "../../../utils/api";
import { type NextPage } from "next";

interface Props {
  isAdminOnly: boolean;
}

const withAdminRoute = <P extends object>(Page: NextPage<P>) => {
  const HOC = (props: P & Props) => {
    const { data: session, status } = useSession();
    const user = api.userRouter.getUserByEmail.useQuery(
      {
        email: session?.user?.email as string,
      },
      {
        enabled: status === "authenticated",
      }
    );
    if (!session || !user.data?.isAdmin) return <Error />;
    return <Page {...props} />;
  };
  return HOC;
};

export default withAdminRoute;
