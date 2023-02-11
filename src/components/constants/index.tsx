import { FaChalkboardTeacher } from "react-icons/fa";
import {
  RiSuitcase2Line,
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
} from "react-icons/ri";
import { GiTeacher, GiRuleBook } from "react-icons/gi";
import { MdHotelClass, MdOutlineQueryStats } from "react-icons/md";
import { BsClouds, BsListCheck, BsCodeSlash } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";

export const Links = [
  { name: "Home", link: "/" },
  { name: "Events", link: "/events" },
  { name: "Team", link: "/team" },
];

export const points = [
  {
    icon: <BsClouds className="h-10 w-10" />,
    desc: "We stay curious, and seek out new solutions.",
  },
  {
    icon: <BsListCheck className="h-10 w-10" />,
    desc: "We work relentlessly to produce fruitful results.",
  },
  {
    icon: <FaHandsHelping className="h-12 w-12" />,
    desc: "We support each other to grow, with a positive spirit, and embrace our diversities.",
  },
];

export const perks = [
  {
    icon: <FaChalkboardTeacher className="h-10 w-10 text-yellow-500" />,
    title: "Workshops",
    desc: "The members get free access to all the events and workshops conducted by the Finite Loop club.",
  },
  {
    icon: <RiSuitcase2Line className="h-10 w-10 text-yellow-500" />,
    title: "Internships",
    desc: "Get a chance to grab internships and put your skills into use.",
  },
  {
    icon: <GiTeacher className="h-10 w-10 text-yellow-500" />,
    title: "Peer to Peer Learning",
    desc: "Explain your ideas to others and participate in activities through which you can learn from your peers.",
  },
  {
    icon: <MdHotelClass className="h-10 w-10 text-yellow-500" />,
    title: "Guest Lecture",
    desc: "Get an opportunity to listen to some of the renowned experts, and engage in discussions.",
  },
  {
    icon: <MdOutlineQueryStats className="h-10 w-10 text-yellow-500" />,
    title: "Real-Time Projects",
    desc: "Being in this club, you get to work on real time projects, which allows you to bring out your creative side.",
  },
  {
    icon: <BsCodeSlash className="h-10 w-10 text-yellow-500" />,
    title: "Coding Contest",
    desc: "We ensure to conduct biweekly coding contests, to improve your analytical and problem solving skills.",
  },
];

export const social = [
  {
    link: "https://www.instagram.com/finiteloop_club_nmamit/",
    icon: <AiOutlineInstagram className="h-7 w-7 hover:text-yellow-500" />,
    name: "Instagram",
  },
  {
    link: "https://www.facebook.com/FiniteLoopClub.Nmamit/",
    icon: <AiOutlineFacebook className="h-7 w-7 hover:text-yellow-500" />,
    name: "Facebook",
  },
  {
    link: "https://www.linkedin.com/showcase/finite-loop-club",
    icon: <AiOutlineLinkedin className="h-7 w-7 hover:text-yellow-500" />,
    name: "LinkedIn",
  },
  {
    link: "mailto:finiteloopclub@gmail.com",
    icon: <AiOutlineMail className="h-7 w-7 hover:text-yellow-500" />,
    name: "E-mail",
  },
  {
    link: "tel:8197903771",
    icon: <AiOutlinePhone className="h-7 w-7 hover:text-yellow-500" />,
    name: "Call Us",
  },
];

export const eventTabs = [
  "Year2017to2020",
  "Year2020to2021",
  "Year2021to2022",
  "Year2022to2023",
  "All",
];

export const teamTabs = [
  "Year2017to2020",
  "Year2020to2021",
  "Year2021to2022",
  "Year2022to2023",
  "Faculty",
];

export const HackFestPhases = [
  {
    title: "Kickstart",
    description: `Meet your teammates and
    understand their qualities, strengths & weaknesses.
    Shoot a candid video of your discussion spanning 30
    seconds introducing your teammates  . Brainstorm and choose
    a team name & problem statement. One of our core
    team members will join you during the meet. Once you
    are done with choosing a problem statement, spend rest
    of your week in making a presentation of your
    idea/solution to the problem and how you are going to
    implement it.`,
    icon: <RiNumber1 className="inline text-3xl text-yellow-500" />,
    date: "11-18th Nov",
    link: false,
    id: 1,
  },
  {
    title: "Ideathon",
    description: `Teams need to pitch in their ideas which they have
    planned in the previous phase by presenting us on what
    they're planning to build. This can include the features,
    planned UI, etc of their end product. Must be shown to
    the assigned advisor by setting up a meet on any of the 2
    days to get the feedbacks.`,
    icon: <RiNumber2 className="inline text-3xl text-yellow-500" />,
    date: "19th-20th Nov",
    link: false,
    id: 2,
  },
  {
    title: "Hackathon",
    description: `Team must work on building the project along with
    learning the tech simultaneously. Team is expected to
    report the project progress to the advisor every
    weekend called as 'Retro/Retrospection' by setting up a
    meet to discuss what they have done so far, this is
    counted as 1 sprint. 4 such sprints must happen in the
    month of December.`,
    icon: <RiNumber3 className="inline text-3xl text-yellow-500" />,
    date: "21 Nov - 25 Dec",
    link: false,
    id: 3,
  },
  {
    title: "Expo Prep",
    description: `Team is expected to stop development, and must focus
    on preparing themselves for presenting the project on
    Project expo. No commits at this stage will be
    considered. Ppt or any other valid ways can be used to
    present your project to the judges.`,
    icon: <RiNumber4 className="inline text-3xl text-yellow-500" />,
    date: "25th Dec onwards",
    link: false,
    id: 4,
  },
  {
    title: "Project Expo",
    description: ` Final offline stage to showcase the projects at College
    to our judges. Winning team and Runner-up team will be
    announced on the same day. Each team member of
    Winning and Runner up team will be awarded with
    exciting prizes.`,
    date: "Coming Soon",
    icon: <RiNumber5 className="inline text-3xl text-yellow-500" />,
    link: false,
    id: 5,
  },
  {
    title: "Brochure",
    description: `Hackfest Brochure explaining the whole rules and timeline in the detail.`,
    icon: <GiRuleBook className="inline text-3xl text-yellow-500" />,
    link: true,
    id: 6,
  },
];

export const DSAPhases = [
  {
    title: "The Gateway",
    description: (
      <>
        Topics covered in this phase are:
        <ul className="list-inside list-disc">
          <li>Arrays</li>
          <li>Strings</li>
          <li>Hashmap</li>
          <li>Linked List</li>
        </ul>
      </>
    ),
    icon: <RiNumber1 className="inline text-3xl text-yellow-500" />,
    date: `20th Nov - 1st Jan '23`,
    link: false,
    id: 1,
  },
  {
    title: "The Next Milestone",
    description: (
      <>
        Topics covered in this phase are:
        <ul className="list-inside list-disc">
          <li>Stacks and Queues</li>
          <li>Trees</li>
          <li>Priority Queues</li>
          <li className="font-bold ">DS Main test</li>
        </ul>
      </>
    ),
    icon: <RiNumber2 className="inline text-3xl text-yellow-500" />,
    date: "15th Jan-26th Feb",
    link: false,
    id: 2,
  },
  {
    title: "The Summit",
    description: (
      <>
        Topics covered in this phase are:
        <ul className="list-inside list-disc">
          <li>Recursion /Backtracking</li>
          <li>Searching</li>
          <li>Sorting</li>
          <li>Two Pointer/Sliding Window Problems</li>
        </ul>
      </>
    ),
    icon: <RiNumber3 className="inline text-3xl text-yellow-500" />,
    date: "12th Mar - 23rd Apr",
    link: false,
    id: 3,
  },
  {
    title: "The Pinnacle",
    description: (
      <>
        Topics covered in this phase are:
        <ul className="list-inside list-disc">
          <li>Graphs</li>
          <li>Greedy Algorithms </li>
          <li>Dynamic Programming</li>
          <li className="font-bold ">Algorithms Main Test </li>
        </ul>
      </>
    ),
    icon: <RiNumber4 className="inline text-3xl text-yellow-500" />,
    date: "7th May - 18th June ",
    link: false,
    id: 4,
  },
  {
    title: "The Apex",
    description: (
      <>
        Topics covered in this phase are:
        <ul className="list-inside list-disc">
          <li className="font-bold ">DSA Test 1</li>
          <li className="font-bold ">DSA Test 2</li>
          <li className="font-bold ">DSA Test 3</li>
        </ul>
      </>
    ),
    icon: <RiNumber5 className="inline text-3xl text-yellow-500" />,
    date: "16th july - 30th Jul ",
    link: false,
    id: 5,
  },
  {
    title: "Brochure",
    description: `DSA Sprint Brochure explaining event and timeline in the detail.`,
    icon: <GiRuleBook className="inline text-3xl text-yellow-500" />,
    link: true,
    id: 6,
  },
];

export const sprintPhases = [
  {
    id: 1,
    isCompleted: true,
    isNext: false,
  },
  {
    id: 2,
    isCompleted: false,
    isNext: true,
  },
  {
    id: 3,
    isCompleted: false,
    isNext: false,
  },
  {
    id: 4,
    isCompleted: false,
    isNext: false,
  },
  {
    id: 5,
    isCompleted: false,
    isNext: false,
  },
];

export const hackfestPhases = [
  {
    id: 1,
    isCompleted: true,
    isNext: false,
  },
  {
    id: 2,
    isCompleted: true,
    isNext: false,
  },
  {
    id: 3,
    isCompleted: true,
    isNext: false,
  },
  {
    id: 4,
    isCompleted: true,
    isNext: false,
  },
  {
    id: 5,
    isCompleted: false,
    isNext: false,
  },
];

export const hackfestTeams = [
  {
    name: "AI Autocrats",
    domain: "AIML",
  },
  {
    name: "Hash 101",
    domain: "Cybersecurity",
  },
  {
    name: "Crypto-Wave",
    domain: "Blockchain",
  },
  {
    name: "Webslingers",
    domain: "Frontend",
  },
  {
    name: "FRONT-END FOLKS",
    domain: "Frontend",
  },
  {
    name: "Bit Legion",
    domain: "App",
  },
  {
    name: "Elucidators",
    domain: "App",
  },
  {
    name: "Error_not_found.html",
    domain: "Fullstack",
  },
  {
    name: "Tech turtles",
    domain: "Fullstack",
  },
  {
    name: "ARACHNIDS",
    domain: "Fullstack",
  },
  {
    name: "Bit to Bytes",
    domain: "Fullstack",
  },
  {
    name: "THE-GOOFY-GEEKS",
    domain: "Fullstack",
  },
  {
    name: "404Error",
    domain: "Fullstack",
  },
  {
    name: "TechnoFlash",
    domain: "Fullstack",
  },
  {
    name: "Kookie Byte",
    domain: "Fullstack",
  },
];

export const hackfestFAQ = [
  {
    title: "Why is Project expo delayed?",
    answer: `The expo which was supposed to happen in december end was postponed to January because of Semester ends of 3rd years which eventually extended the submission deadline.
      Complications occured when another event was scheduled on 28th Jan. We tried our best to find a suitable date for the event but due to the unavailability of 2nd years and a free unbooked venue
      we cannot make it happen anytime soon.`,
  },
  {
    title: "When will be project expo?",
    answer:
      "We held a small meeting with the team leads to discuss the date and complications happened so far. Discussion finally boiled down to having it when 2nd years will be back to college, which is April end.",
  },
  {
    title: "Who has shortlisted the teams?",
    answer:
      "The core team members evaluated the submissions individually and scored the teams based on different criterias. After a final meeting, we shortlisted the teams based on Average score and remarks.",
  },
  {
    title: "Why is my team not in the list?",
    answer: "It's probably because your project did not meet the requirements of the given Problem statement. Feel free to DM us on discord for more details.",
  },
];
