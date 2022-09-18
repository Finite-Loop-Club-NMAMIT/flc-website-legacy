import { makePayment } from '../../utils/razorpay'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Button from '../button';
import { useSession } from "next-auth/react"
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { Links } from '../constants';

export default function Navbar(){
  const { data, status } = useSession()
  const [open,setOpen]=useState(false);
  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-50 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30'>
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
      <div className='font-bold text-xl md:text-2xl cursor-pointer flex items-center
      text-gray-800'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
          <Image src='/assets/flc_logo_crop.png' width={50} height={50} />
        </span>
        Finite Loop Club
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-8 cursor-pointer md:hidden'>
        {open ? <AiOutlineClose/>:<AiOutlineMenu/>}
      </div>

      <ul className={`bg-white bg-opacity-80 md:bg-white md:bg-opacity-0 md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-lg md:text-xl md:my-0 my-7'>
              <Link href={link.link}>
                <a className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
              </Link>
            </li>
          ))
        }
        {status === 'authenticated'?(
        <div className='flex flex-col md:flex-row w-[150px] md:w-full gap-3 md:gap-0'>
          <Button>
            <Link href="/api/auth/signout">
              Sign Out
            </Link>
          </Button>
          <Button className='bg-red-400 hover:bg-red-300' onClick={makePayment}>
              Pay
          </Button>
        </div>
        ):(
        <Button>
          <Link href="/api/auth/signin">
            Sign In
          </Link>
        </Button>
        )}
      </ul>
      </div>
    </div>
    )
}