import Image from "next/image"

export default function discord() {
  return (
    <section>
    <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
        <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
            <Image
                alt="Discord"
                layout="fill"
                src="/assets/discord.png"
                className="absolute inset-0 object-cover w-full h-full"
            />
            </div>
        </div>

        <div className="relative flex items-center bg-gray-100">
            <span
            className="hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-100 lg:block lg:-left-16"
            ></span>

            <div className="p-8 sm:p-16 lg:p-24">
            <h2 className="text-2xl font-bold sm:text-3xl">
            Get access to our exclusive discord community 
            </h2>

            <p className="mt-4 text-gray-600 md:text-lg">
            Our Discord community would help you to meet and make new connections with peers, and to expand your network. All-in one place to showcase your projects, knowledge, participate in events or even chill in VCs.
            </p>
            </div>
        </div>
        </div>
    </div>
    </section>
  )
}
