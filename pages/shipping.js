export default function shipping() {
  return (
    <>
      <div className="px-10 pb-10 text-center">
        <p className="text-lg md:text-2xl mb-5">
          INSPIRANTE TECHNOLOGIES PRIVATE LIMITED
        </p>
        <div className="flex gap-3 flex-col">
          <p className="text-md md:text-lg font-bold">
            Shipping and Delivery Policy
          </p>
          <p className="font-light text-gray-400">
            Last updated on Oct 20th 2022
          </p>
          <p>Shipping is not applicable for business.</p>
        </div>
      </div>
      <div className="container px-6 py-8 mx-auto">
        <p className="text-lg md:text-2xl mb-5 text-center">PRICING</p>
        <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex-shrink-0">
              <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-yellow-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                Membership Fee
              </h2>
            </div>
            <div className="flex-shrink-0">
              <span className="pt-2 text-4xl font-bold text-gray-800 uppercase dark:text-gray-100">
                ₹200
              </span>
            </div>
            <ul className="flex-1 space-y-4">
              <li className="text-gray-500 dark:text-gray-400">
                One-time payment.
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                Valid until you&apos;re a part of college.
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                All of the club events will be free for members.
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex-shrink-0">
              <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-yellow-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                Workshop
              </h2>
            </div>
            <div className="flex-shrink-0">
              <span className="pt-2 text-4xl font-bold text-gray-800 uppercase dark:text-gray-100">
                ₹70
              </span>
            </div>
            <ul className="flex-1 space-y-4">
              <li className="text-gray-500 dark:text-gray-400">
                Kickstart Open source journey with Hacktoberfest
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                Hands-On Workshop
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex-shrink-0">
              <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-yellow-400 uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                Workshop
              </h2>
            </div>
            <div className="flex-shrink-0">
              <span className="pt-2 text-4xl font-bold text-gray-800 uppercase dark:text-gray-100">
                ₹70
              </span>
            </div>
            <ul className="flex-1 space-y-4">
              <li className="text-gray-500 dark:text-gray-400">
                DSA in Python
              </li>
              <li className="text-gray-500 dark:text-gray-400">
                Hands-On Workshop
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
