import { type NextPage } from "next";
import { useRouter } from "next/router";

const Certificate: NextPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <div>

    </div>
  );
};

export default Certificate;
