// import { makePayment } from "../../utils/razorpay";
import Link from "next/link";
import { useState } from "react";
import Button from "../button";
import { useSession, signIn } from "next-auth/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiSun, BiMoon } from "react-icons/bi";
import { Links } from "../constants";
import { useTheme } from "next-themes";
import { type FunctionComponent } from "react";
import { api } from "../../utils/api";
import Loader from "../loader";
import Image from "next/image";

const Navbar: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, status } = useSession();
  const { theme, setTheme } = useTheme();

  const user = api.userRouter.getUserByEmail.useQuery({
    email: data?.user?.email as string,
  });

  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full bg-black bg-opacity-30 shadow-md backdrop-blur-lg backdrop-filter">
        <div className="flex items-center justify-between py-2 px-3 md:flex-row md:px-5">
          <div
            className="flex cursor-pointer items-center text-xl font-bold text-white
      md:text-2xl"
          >
            <span className="mr-1 text-2xl text-white">
              <Image
                src="/assets/flc_logo_crop.png"
                width={50}
                height={50}
                alt="flc logo"
                priority
              />
            </span>
            <Link href="/">Finite Loop Club</Link>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-3xl text-white md:hidden"
          >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>

          <ul
            className={`absolute left-0 w-full bg-black bg-opacity-40 pb-12 pl-9 transition-all duration-500 ease-in  md:static md:z-auto md:flex md:w-auto md:items-center md:bg-white md:bg-opacity-0 md:pb-0 md:pl-0 ${
              open ? "top-[100%]" : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <li
                key={link.name}
                className="my-6  text-lg md:my-0 md:ml-8 md:text-xl"
              >
                <Link
                  href={link.link}
                  className="text-white group transition-all duration-300 ease-in-out"
                >
                  <span className='px-0 py-1 bg-left-bottom bg-gradient-to-r from-yellow-400  via-yellow-300 to-yellow-400  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'>
                  {link.name}
  </span>
                 
                </Link>
               
              </li>
            ))}

            {status === "authenticated" ? (
              <div className="flex w-[150px]  flex-col gap-3 md:ml-8 md:w-full md:flex-row">
                {!user.data?.isMember && user.data?.role === "member" && (
                  <Button
                  // onClick={() => {
                  //   makePayment(
                  //     user.data?.email as string,
                  //     user.data?.name as string
                  //   );
                  // }}
                  >
                    Register
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600">Hello</span>
                  </Button>
                )}
                <div>
                  <Link href={`/u/${user.data?.username as string}`}>
                    {user.isLoading ? (
                      <Loader />
                    ) : (
                      <Image
                        src={user.data?.image as string}
                        width={40}
                        height={40}
                        className="cursor-pointer rounded-full"
                        alt="profile picture"
                      />
                    )}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="md:ml-8">
                <Button onClick={() => signIn("google")}>
                  <a>Sign In</a>
                </Button>
              </div>
            )}
            <button
              className="mx-0  my-5 text-3xl text-white lg:mx-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme ? theme === "dark" ? <BiSun /> : <BiMoon /> : <></>}
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
