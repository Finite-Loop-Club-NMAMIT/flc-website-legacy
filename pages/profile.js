import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Button from '../components/button';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { data: session, status } = useSession()

  const fetchProfile = async () => {
    const res = await fetch(`/api/read/users?q=${session.user.email}`);
    const user = await res.json();
    setProfile(user);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      {console.log(profile, session)}
      {status != 'authenticated' ? (
        <div className="flex flex-col justify-center items-center gap-6 m-24 text-center lg:m-56">
          <h1 className="text-lg lg:text-2xl">
            You are not authorised, Please sign in.
          </h1>
          <Button>
            <Link href="/api/auth/signin">Sign In</Link>
          </Button>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-5 my-10">
          <Image
            className="rounded-lg"
            src={session.user.image}
            width={200}
            height={200}
          />
          <a className="heading text-2xl font-bold">{session.user.name}</a>
          {/* <p className='font-bold text-gray-300'>Bio: {profile.data[0].bio}</p>
          <p className='font-bold text-gray-300'>Role: {profile.data[0].role}</p> */}
        </div>
      )}
    </div>
  );
}
