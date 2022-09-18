import {FaChalkboardTeacher} from "react-icons/fa"
import {RiSuitcase2Line} from "react-icons/ri"
import {GiTeacher} from "react-icons/gi"
import {MdHotelClass, MdOutlineQueryStats} from "react-icons/md"
import {BsCodeSlash} from "react-icons/bs"
import { BsClouds, BsListCheck } from 'react-icons/bs';
import {FaHandsHelping} from 'react-icons/fa';

export const Links =[
    {name:"Home",link:"/"},
    {name:"Events",link:"/"},
    {name:"Team",link:"/"},
];

export const points = [
    {icon: <BsClouds className='w-10 h-10 text-yellow-500'/>, desc: 'We stay curious, and seek out new solutions.'},
    {icon: <BsListCheck className='w-10 h-10 text-yellow-500'/>, desc: 'We work relentlessly to produce fruitful results.'},
    {icon: <FaHandsHelping className='w-12 h-12 text-yellow-500'/>, desc: 'We support each other to grow, with a positive spirit, and embrace our diversities.'},
];

export const perks = [
    {icon:<FaChalkboardTeacher className="w-10 h-10 text-yellow-500" />,title:'Workshops',desc:'The members get free access to all the events and workshops conducted by the Finite Loop club.'},
    {icon:<RiSuitcase2Line className="w-10 h-10 text-yellow-500" />,title:'Internships',desc:'Get a chance to grab internships and put your skills into use.'},
    {icon:<GiTeacher className="w-10 h-10 text-yellow-500" />,title:'Peer to Peer Learning',desc:'Explain your ideas to others and participate in activities through which you can learn from your peers.'},
    {icon:<MdHotelClass className="w-10 h-10 text-yellow-500" />,title:'Guest Lecture',desc:'Get an opportunity to listen to some of the renowned experts, and engage in discussions.'},
    {icon:<MdOutlineQueryStats className="w-10 h-10 text-yellow-500" />,title:'Real-Time Projects',desc:'Being in this club, you get to work on real time projects, which allows you to bring out your creative side.'},
    {icon:<BsCodeSlash className="w-10 h-10 text-yellow-500" />,title:'Coding Contest',desc:'We ensure to conduct biweekly coding contests, to improve your analytical and problem solving skills.'}
]