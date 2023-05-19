import Image from "next/image";
import { type FunctionComponent } from "react";

type TestimonialsProps = {
  image: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
};

const Testimonial: FunctionComponent<TestimonialsProps> = ({
  image,
  name,
  position,
  company,
  testimonial,
}) => {
  return (
    <div className="mb-8 sm:break-inside-avoid">
      <div className="rounded-xl p-6 dark:bg-black block border border-yellow-500 shadow-xl transition-all duration-300 hover:scale-[1.05] hover:border-yellow-300 hover:shadow-yellow-500/25">
        <p className="text-gray-700 dark:text-white text-sm lg:text-lg">{testimonial}</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <Image src={image} alt={name} width={48} height={48} />
          </div>

          <div>
            <p className="lg:text-lg font-bold text-yellow-500">{name}</p>
            <p className="mt-1 text-xs lg:text-sm">{position}</p>
            <span className="text-xs lg:text-sm font-light">
              {company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
