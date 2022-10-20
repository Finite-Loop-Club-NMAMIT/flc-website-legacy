import { FaHome } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { AiFillMail } from 'react-icons/ai';

export default function contact() {
  return (
    <div className="text-gray-700 dark:text-gray-300 text-sm md:text-lg">
      <h1 className="text-xl md:text-3xl my-5">Contact Us</h1>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center gap-4">
          <div className="w-8">
            <FaHome className="text-3xl h-8 md:h-12" />
          </div>

          <a>
            NMAM Institute of Technology Nitte, Karkala Taluk, Udupi - 574110
            Karnataka, India
          </a>
        </div>
        <div className="flex flex-row items-center gap-4">
          <FiPhoneCall className="text-3xl h-8 md:h-12" />
          <a>8197903771</a>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="w-8">
            <AiFillMail className="text-3xl h-8 md:h-12" />
          </div>
          <a>finiteloopclub@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
