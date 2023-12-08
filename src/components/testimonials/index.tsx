import { TestimonialList } from "../constants";
import Testimonial from "./testimonial";

const Testimonials = () => {
  return (
    <section className="bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6">
        <h2 className="heading text-center text-3xl font-bold sm:text-4xl">
          Testimonials
        </h2>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
            {TestimonialList.map((testimonial, id) => (
              <Testimonial
                key={id}
                image={testimonial.image}
                name={testimonial.name}
                position={testimonial.position}
                company={testimonial.company}
                testimonial={testimonial.testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
