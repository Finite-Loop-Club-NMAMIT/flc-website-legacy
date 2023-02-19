import Link from "next/link";
import { Links, social } from "../constants";
import { type FunctionComponent } from "react";
import BlurImage from "../blurImage";

const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-gray-50 text-black transition-colors duration-500 relative -z-50 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <BlurImage
            src="/assets/flc_logo_crop.png"
            width={100}
            height={100}
            alt="flc_logo"
            priority
          />
          <a className="ml-3 flex cursor-pointer items-center text-lg text-black dark:text-gray-100 md:text-xl">
            Finite Loop Club
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-black dark:text-gray-200">
          NMAM Institute of Technology, Nitte, SH1, Karkala, Karnataka, KARKALA,
          NMAMIT 574110, IN
        </p>

        <nav className="mt-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {Links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.link}
                  className="text-black transition hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-200/75"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {social.map((link, index) => (
            <li key={index}>
              <Link
                href={link.link}
                className="text-black transition hover:text-gray-200/75 dark:text-gray-100"
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
