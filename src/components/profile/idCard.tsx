import { useRef, type FunctionComponent } from "react";
import Image from "next/image";
import { BsDownload } from "react-icons/bs";
import { QRCodeSVG } from "qrcode.react";
import { useReactToPrint } from "react-to-print";

type IDCardProps = {
  image: string;
  name: string;
  username: string;
  role: string;
  email: string;
};

const IDCard: FunctionComponent<IDCardProps> = ({
  image,
  name,
  username,
  role,
  email,
}) => {
  // const [showIdCard, setShowIdCard] = useState(false);
  const printRef = useRef(null);

  // const toggleIdCard = () => {
  //   setShowIdCard(!showIdCard);
  // };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `@page {margin:-150px 0 0 0; size: 350px 530px !important;`,
    copyStyles: true,
  });

  const handleDownload = () => {
    if (printRef.current) handlePrint();
  };

  return (
    <div
      className="flex flex-col justify-between rounded-md border-2 border-gray-300 shadow-md transition-all duration-500 ease-in-out "
      // ${showIdCard ? "w-full sm:w-96" : "w-72"}
    >
      <div className="flex items-center justify-between p-4">
        <div
          className="cursor-pointer font-bold text-yellow-500"
          // onClick={toggleIdCard}
        >
          Digital ID Card
        </div>
        <div className="flex flex-row items-center">
          {/* <button
            className="mx-2 hover:text-yellow-500 focus:outline-none"
            onClick={toggleIdCard}
          >
            {showIdCard ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button> */}
          {/* {showIdCard && ( */}
          <button
            className="mx-2 hover:text-yellow-500 focus:outline-none"
            onClick={handleDownload}
          >
            <BsDownload />
          </button>
          {/* )} */}
        </div>
      </div>
      {/* {showIdCard && ( */}
      <>
        <hr />
        <div className="p-4" ref={printRef}>
          <div>
            <div className="flex w-full items-center gap-3 px-3">
              <Image
                src="/assets/flc_logo_crop.png"
                width={50}
                height={50}
                alt="logo"
              />
              <div className="text-xl font-bold text-yellow-500">FLC</div>
              <div className="text-md flex-1 text-right font-semibold">
                {`${
                  new Date().getFullYear() - 1
                } - ${new Date().getFullYear()}`}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={image}
                  width={128}
                  height={128}
                  alt="profile"
                  className="h-full w-full border-2 border-gray-500 object-cover object-center dark:border-gray-300"
                />
              </div>
              <div className="mt-5 text-xl font-bold">{name}</div>
              <div className="font-thin">
                {email.startsWith("4nm")
                  ? email.split("@")[0]?.toUpperCase()
                  : ""}
              </div>
              <div className="mt-2 rounded-full border border-yellow-500 px-3 uppercase">
                {role}
              </div>
            </div>
            <div className="m-4 flex justify-center">
              <QRCodeSVG
                value={`https://finiteloop.co.in/u/${username}`}
                size={100}
                includeMargin
              />
            </div>
            <hr />
            <div className="my-3 text-center">
              <div className="text-xs font-thin">
                <strong>Finite Loop Club, NMAM Institute of Technology</strong>
                <br />
                Nitte, Karkala Taluk, Udupi - 574110
                <br />
                Karnataka, India
                <br />
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default IDCard;
