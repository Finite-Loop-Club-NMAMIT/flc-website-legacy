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
      <div className="block rounded-xl border border-yellow-500 p-6 shadow-xl transition-all duration-300 hover:scale-[1.05] hover:border-yellow-300 hover:shadow-yellow-500/25 dark:bg-gray-900/10">
        <p className="text-sm text-gray-700 dark:text-white lg:text-lg">
          {testimonial}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <Image src={image} alt={name} width={48} height={48} />
          </div>

          <div>
            <p className="font-bold text-yellow-500 lg:text-lg">{name}</p>
            <p className="mt-1 text-xs lg:text-sm">{position}</p>
            <span className="text-xs font-light lg:text-sm">{company}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
