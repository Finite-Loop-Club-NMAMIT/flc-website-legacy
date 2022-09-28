import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Button from '../components/button';

export default function Profile() {
  const { data, status } = useSession();
  return (
    <div>
        {status != 'authenticated'? (
        <div className='flex flex-col justify-center items-center gap-6 m-24 text-center lg:m-56'>
            <h1 className='text-lg lg:text-2xl'>You are not authorised, Please sign in.</h1>
            <Button><Link href="/api/auth/signin">Sign In</Link></Button>
        </div>
        ) : (
        <div>
        <Image src={data.user.image} width={100} height={100} />
        <a>{data.user.name}</a>
        </div>
        )}
    </div>
  )
}
