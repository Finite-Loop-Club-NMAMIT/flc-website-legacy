import Contact from '../components/contact';

export default function rules() {
  return (
    <div className="p-10 text-gray-700 dark:text-gray-300 text-sm md:text-lg">
      <h1 className="text-2xl md:text-4xl my-5">Terms and Conditions</h1>
      <p className='font-bold my-2'> If you see the name of Inspirante Tech Pvt. Ltd. during payment, please proceed with the payment, Inspirante is a registered company under Finite Loop Club.</p>
      <ul style={{ listStyle: 'disc' }} className="pl-5">
        <li>The below policy is effective from 10th Oct 2022.</li>
        <li>
          Members must follow all the rules and regulations of the college.
        </li>
        <li>
          Members must be actively participating in club events and must be
          active in the community.
        </li>
        <li>
          Display of any unruly behaviour shall lead to disqualification of the
          member and expulsion of the member from the club.
        </li>
        <li>
          Event organizers are not responsible for any loss or damage of
          member&apos;s/participant&apos;s personal belongings.
        </li>
      </ul>
      <Contact />
    </div>
  );
}
