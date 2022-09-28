import Image from "next/image"

export default function Tech() {
  const tech = [
    {src: 'nextjs.svg'},
    {src: 'react.svg'},
    {src: 'laravel.svg'},
    {src: 'node.svg'},
    {src: 'tailwind.svg'},
    {src: 'python.svg'},
  ]
  return (
    <section>
    <div className="bg-black px-4 py-16 max-w-screen-xl sm:px-6 lg:px-28 text-white">
        <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center"
        >
        <div className="max-w-lg mx-auto text-center lg:text-left lg:mx-0">
            <h2 className="text-3xl font-bold sm:text-4xl heading">Work on new Trending Tech Stack</h2>

            <p className="mt-4 text-gray-200">
            Get a chance to explore and innovate using the in-demand Tech Stack! Get your hands to code your idea and enter the world of developers!
            </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {tech.map((item, index) => (
        <a key={index} className="block p-4 border border-yellow-400 shadow-sm rounded-xl hover:border-yellow-200 duration-300 text-center">
            <Image 
            src={`/assets/${item.src}`}
            width={100}
            height={100}
            />
        </a>
        ))}
        </div>
        </div>
    </div>
    </section>
  )
}
