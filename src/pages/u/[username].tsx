import { type NextPage } from "next";
import IdCard from "../../components/idcard";
import Profile from "../../components/profile";

const User: NextPage = () => {
  return (
    <>
      <Profile />
      <IdCard/>
    </>
  );
};

export default User;