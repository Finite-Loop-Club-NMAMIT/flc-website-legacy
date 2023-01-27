import { makePayment } from "../../utils/razorpay";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Button from "../button";
import { useSession, signIn } from "next-auth/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiSun, BiMoon } from "react-icons/bi";
import { Links } from "../constants";
import { useTheme } from "next-themes";
import { type FunctionComponent } from "react";
import { api } from "../../utils/api";

const Navbar: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, status } = useSession();
  const { theme, setTheme } = useTheme();

  const user = api.userRouter.getUserByEmail.useQuery({
    email: data?.user?.email as string,
  });

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full bg-black bg-opacity-30 shadow-md backdrop-blur-lg backdrop-filter">
        <div className="flex items-center justify-between py-4 px-7 md:flex-row md:px-10">
          <div
            className="flex cursor-pointer items-center text-xl font-bold text-white
      md:text-2xl"
          >
            <span className="mr-1 pt-2 text-3xl text-white">
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
            className={`absolute left-0 w-full bg-black bg-opacity-80 pb-12 pl-9 transition-all duration-500 ease-in  md:static md:z-auto md:flex md:w-auto md:items-center md:bg-white md:bg-opacity-0 md:pb-0 md:pl-0 ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <li
                key={link.name}
                className="my-7 text-lg md:my-0 md:ml-8 md:text-xl"
              >
                <Link
                  href={link.link}
                  className="text-white duration-500 hover:text-gray-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {status === "authenticated" ? (
              <div className="flex w-[150px]  flex-col gap-3 md:ml-8 md:w-full md:flex-row">
                {!user.data?.isMember && user.data?.role === "member" && (
                  <Button
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-floating-promises
                      makePayment(
                        user.data?.email as string,
                        user.data?.name as string
                      );
                    }}
                  >
                    Register
                  </Button>
                )}
                <div>
                  <Link href={`/u/${user.data?.username as string}`}>
                    {user.isLoading ? (
                      <svg
                        aria-hidden="true"
                        className="h-8 w-8 animate-spin fill-yellow-600 text-gray-200"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
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
