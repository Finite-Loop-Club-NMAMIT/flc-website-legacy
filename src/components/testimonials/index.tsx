import Image from "next/image";
import { type FunctionComponent } from "react";

type TestimonialsProps = {
  image: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
};

const Testimonials: FunctionComponent<TestimonialsProps> = ({
  image,
  name,
  position,
  company,
  testimonial,
}) => {
  return (
    <div>
      <Image src={image} alt={name} width={100} height={100} />
      <h1>{name}</h1>
      <h2>{position}</h2>
      <h3>{company}</h3>
      <p>{testimonial}</p>
    </div>
  );
};

export default Testimonials;
