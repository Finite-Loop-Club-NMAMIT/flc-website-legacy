import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useQRCode } from "next-qrcode";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { FiDownload } from "react-icons/fi";

export default function IdCard() {
  const router = useRouter();
  const { data, status } = useSession();
  const username = router.query.username;
  const user = api.userRouter.getUserByEmail.useQuery(
    { email: data?.user?.email as string },
    {
      enabled: (data?.user?.email as string) !== undefined,
    }
  );
  const { Image } = useQRCode();
  const { theme } = useTheme();
  const idRef = useRef<HTMLDivElement>(null);
  const printPdf = useReactToPrint({
    content: () => (idRef.current ? idRef.current : null),
    pageStyle: `@page {margin:-150px 0 0 0; size: 480px 640px !important;`,
    copyStyles: true,
  });

  const handlePrint = () => {
    if (idRef.current) printPdf();
  };

  if (status === "loading") return <></>;
  if (status === "unauthenticated") return <></>;
  if (!user || !user.data || username !== user.data.username) return <></>;
  return (
    <section
      className="my-9 flex flex-col items-center gap-4 py-7 px-2"
      style={{
        WebkitPrintColorAdjust: "exact",
      }}
    >
      <h3 className="heading text-2xl font-bold">ID CARD</h3>
      <button onClick={handlePrint} className="text-yellow-400 hover:scale-110">
        <FiDownload size={30}></FiDownload>
      </button>
      <div className="w-[480px] h-[1px] bg-gradient-to-r from-yellow-300 to-orange-600 -mb-4 " ></div>
      <div
        ref={idRef}
        className="before:opacity-85 relative flex h-[640px] w-[480px] flex-col items-center gap-4 p-4 shadow-lg shadow-gray-300 before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:bg-[url('/assets/Matrix.svg')] before:blur-[1px] dark:shadow-yellow-900"
        style={{
          WebkitPrintColorAdjust: "exact",
          colorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        <div className="flex w-full items-center gap-3 px-3">
          <img src={`/assets/flc_logo_crop.png`} className="h-16 w-16"></img>
          <div className="text-3xl font-bold text-yellow-600">FLC</div>
          <div className="flex-1 text-right font-mono text-lg font-semibold text-[#FFA500]">
            2022-23
          </div>
        </div>
        <div
          className="relative h-52 w-52 overflow-hidden rounded-full p-1 
                before:absolute before:bottom-[50%] before:left-[50%] before:z-[-1] before:h-[calc(100%)] before:w-[calc(100%)] before:origin-bottom-left
                before:bg-gradient-to-r before:from-[#fff700] before:to-[#ff7d4d]
                after:absolute after:top-0 after:left-0 after:z-[-2]
                after:h-full after:w-full after:bg-[#fff700]  before:motion-safe:animate-[spin_10s_ease-in-out_infinite]"
        >
          <img
            src={`${data?.user?.image}`}
            className="w-full rounded-full transition-all duration-700"
          ></img>
        </div>
        <div
          className={`relative text-2xl font-bold text-yellow-400 before:absolute before:top-1 before:left-1 before:z-[-1] before:h-full before:w-full before:text-orange-200 before:opacity-80 before:blur-[3px] before:content-['${user.data.name?.replace(
            " ",
            "_"
          )}'] before:text-2xl`}
        >
          {user?.data?.name}
        </div>
        <div
          className="text-ylw rounded-full border-4 border-yellow-300 border-b-yellow-400 p-2 text-sm font-bold uppercase text-yellow-500 shadow-md
                shadow-yellow-300"
        >
          {user?.data?.isMember ? user.data.role : "Unofficial-Member"}
        </div>
        <Image
          text={user.data.id}
          options={{
            width: 140,
            level: "H",
            margin: 1,
            color: {
              dark: "#833200",
              light: theme === "light" ? "#ffffff00" : "#ffffffff",
            },
          }}
        />
        {/* <div className="flex w-full justify-center gap-3 items-center"> 
                <img src={`/assets/flc_logo_crop.png`} className="w-10 h-10"></img>
                <img src={`https://nmamit.nitte.edu.in/img/nitte-mobile-logo.png`} className="w-72 h-10"></img>
                </div> */}
      </div>
    </section>
  );
}
