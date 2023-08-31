import withAdminRoute from '../../components/hoc/withAdminRoute'
import { type NextPage } from 'next'
import Link from 'next/link'
import { BsFillCalendarEventFill, BsFillGearFill } from 'react-icons/bs'
import { RiTeamFill } from 'react-icons/ri'
import { TbFileCertificate } from 'react-icons/tb'
import { IoIosPeople } from 'react-icons/io'
import { CgLogIn } from 'react-icons/cg'

const AdminPage: NextPage = () => {
  const box =
    'flex flex-col items-center justify-center gap-2 rounded-3xl border px-20 py-10 dark:border-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-800 hover:bg-gray-100 hover:border-gray-300 transition-all duration-300'

  return (
    <div>
      <h4 className='heading mb-5 text-center text-2xl md:text-3xl font-bold'>
        Welcome to Admin Dashboard
      </h4>
      <div className='mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5'>
        <Link className={box} href='/admin/events'>
          <BsFillCalendarEventFill size={50} />
          <div className='text-center text-md md:text-2xl'>Events</div>
        </Link>
        <Link className={box} href='/admin/team'>
          <IoIosPeople size={50} />
          <div className='text-center text-md md:text-2xl'>Core</div>
        </Link>
        <Link className={box} href='/admin/award'>
          <TbFileCertificate size={50} />
          <div className='text-center text-md md:text-2xl'>Certificates</div>
        </Link>
        <Link className={box} href='/admin/registrations'>
          <CgLogIn size={50} />
          <div className='text-center text-md md:text-2xl'>Registrations</div>
        </Link>
        <Link className={box} href='/admin/create-teams'>
          <RiTeamFill size={50} />
          <div className='text-center text-md md:text-2xl'>Team</div>
        </Link>
        <Link className={box} href='/admin/others'>
          <BsFillGearFill size={50} />
          <div className='text-center text-md md:text-2xl'>Others</div>
        </Link>
      </div>
    </div>
  )
}

export default withAdminRoute(AdminPage)
