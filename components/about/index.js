import Image from 'next/image';
import { points } from '../constants';

export default function About() {
  return (
    <section>
    <div className="bg-gray-50 max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-28">
        <div className="grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2">
        <div
        class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full lg:order-last"
      >
        <Image
          alt="Party"
          layout='fill'
          src="/assets/team.jpeg"
          class="absolute inset-0 object-cover w-full h-full"
        />
      </div>

        <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl heading">About Us</h2>

            <p className="mt-4 text-gray-600 md:text-lg">
            Finite Loop is a Coding Club, which aims to give a good perspective of development, and encourages students to realize their ideas. We encourage students to participate in competitive programming and thus, inspire the next.
            </p>
            <div className="mt-5 flex gap-3 flex-col md:text-lg">
                {points.map((point) => (
                <p key={point.icon} className='inline-flex gap-3 items-center'>
                {point.icon} {point.desc}
                </p>
                ))}
            </div>
        </div>
        </div>
    </div>
    </section>
  )
}
