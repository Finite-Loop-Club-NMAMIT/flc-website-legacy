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

export const events = [
  {
    name: "DSA with JAVA workshop",
    date: "12/11/2022",
    attended: "70+ Participants",
    type: "Hands-On Workshop",
    image: "/events/DSA_with_JAVA/dsa_with_java_akash.png",
    organizer: "Amogh Mayya",
    desc: "The Placement Season is on and so is the anxiety to be placed! We hear that Twilio is around the corner and the pre-final year students are being geared up. Are you unsure where to start your preparations from? What are the topics that need to be focused on  Which language to code in Not to worry. Finite Loop Club, NMAMIT is here with a workshop on 'Data Structures and Algorithms with Java' (Theory + Problem Solving) !! That's right",
    year: "2022-23",
  },
  {
    name: "Web Application Security & Bug Bounty Hunting",
    date: "05/11/2022",
    attended: "70+ Participants",
    type: "Hands-On Workshop",
    image: "/events/Web Application Security/Web Application Security.png",
    organizer: " P Ashwini Acharya and Padmashree Shetty",
    year: "2022-23",
    desc: `⚡Are you someone who is curious about Ethical Hacking, Are you inclined towards technological security and networks or system infrastructure ?⚡

    ⚡If these things resonates with your area of interest then,
    Finite Loop Club(FLC) welcomes all the technophiles to an interesting opportunity.⚡
    
    📢 FLC is organizing a "beginner-friendly hands-on guide to Application Security (Ethical Hacking)" where all the participants will be upskilled by taking them through the topics like : 2FA Bypass ,Broken Authentication,HTML Injection,Brute Force Attacks,HTTP Parameter Pollution,OAuth Misconfiguration,Host Header Injection.
    
    Then Let's hunt the bugs, like thugs;
    Let's have some fun, with Trojan;
    Let's get the code fix, but keeping our ethics`,
  },
  {
    name: "Induction programme",
    date: "13/10/2022",
    attended: "200+ Participants",
    type: "Hands-On Workshop",
    image: "/events/induction 22/induction 22.png",
    organizer: "FLC Team",
    year: "2022-23",
    desc: `At the Induction Program held on October 13, 2022, Finite Loop Club, NMAMIT, effectively orientated the new batch of FLCians to the club culture and the activities intended to be continued.
    Ms. Shambhavi Bhandarkar, CEO of Chipsy IT Services Pvt. Ltd., served as the event's Chief Guest.
    A huge welcome to our new members, let's stay in the loop`,
  },
  {
    name: "Kickstart Open source journey with Hacktoberfest",
    date: "24/09/2022",
    attended: "70+ Participants",
    type: "Hands-On Workshop",
    image: "/events/hacktoberfest/hacktoberfest.png",
    organizer: "Padmashree",
    desc: 'The festival of coding and open source contribution is almost nearing, and on September 24, 2022, Finite Loop Club had a successful session titled "Kickstart the Journey of Open Source Contribution with Hacktoberfest." An extensive walkthrough on open source contributions with a demonstration of how to create a valid pull request was delivered with the active participation of more than 70 students. Nagaraj Pandith, vice president of the Finite Loop Club, handled the session.',
    year: "2022-23",
  },
  {
    name: "DSA in Python",
    date: "14/09/2022",
    attended: "84 Participants",
    type: "Hands-On Workshop",
    image: "/events/python/Python.png",
    organizer: "Bhargavi, Nagaraj Pandith",
    desc: "The Finite Loop Club, NMAMIT in association with Abhyuday - the Department of Counselling, Welfare, Training and Placement of NMAMIT successfully conducted a two-day (14th & 15th Sep) Hands-On Workshop on Python Programming with a focus on cracking coding interview rounds for the Final Year Students of Electronics and Communication Dept. of NMAMIT. ",
    year: "2022-23",
  },
  {
    name: "Git and Github - Hands on Workshop",
    date: "21/05/2022",
    attended: "75+ Participants",
    type: "Hands-On Workshop",
    image: "/events/github/picture1.jpg",
    organizer: "Anjuman Raj, Bhargavi Nayak",
    desc: "Finite Loop Club, NMAMIT, Nitte successfully conducted yet another hands-on session, “Git and Github”, on 21st May 2022. The organizers of the event were Mr. Nagaraj Pandith, 2nd year, CSE, and Mr. Swasthik Shetty, 2nd year, CSE.",
    year: "2021-22",
  },
  {
    name: "Javascript Mastery",
    date: "12/03/2022",
    attended: "70+ Participants",
    type: "Hands-On Workshop",
    image: "/events/jsMastery/picture1.jpeg",
    organizer: "Shrilakshmi Pai",
    desc: "Finite Loop Club, NMAMIT, Nitte successfully conducted a workshop on “Javascript Mastery” by our alumni, Mr. Shashank S Shetty on March 12, 2022. ",
    year: "2021-22",
  },
  {
    name: " WAR ZONE",
    date: "26/11/2021",
    attended: "10+ Teams",
    type: "Gaming",
    image: "/events/warzone/warzone.jpeg",
    organizer: "Thejas Kumar, Dhanish S Suvarna",
    desc: "Call of Duty (COD) was played by the registered teams based on the maps, FiringRange, Standoff, Summit, Nuketown. Teams were made to compete against each other based on toss and after a great fight, Team DPH could battle through excel! Winners: Shravan P, Aravinda Krishna U, Rathan B, M Ankur Baliga, Achal Rai.",
    year: "2021-22",
  },

  {
    name: " Website Launch and Invited Talk on “Company Fit Culture”:",
    date: "03/03/2022",
    attended: "60+ Participants",
    type: "Invited Talk",
    image: "/events/websiteLaunch/picture1.jpeg",
    organizer: "Finite Loop Team",
    desc: "Finite Loop Club, NMAMIT, Nitte successfully launched its new website at the event held at Shambhavi Seminar Hall on 3rd March 2022. Mr. Sumukh Bhandarkar, a Software Developer at Oracle was the Chief guest. The core members of Finite Loop Club were handed over their Identity Cards by the Principal on this occasion. The launch was followed by a talk on 'Company Fit Culture' by Mr. Sumukh Bhandarkar. The importance of Test Cases and Open source contributions were the main highlights.",
    year: "2021-22",
  },

  {
    name: "Web Appilcation Hacking and Penetration Testing",
    date: "16/12/2021",
    attended: "40+ Teams",
    type: "Cyber Security",
    image: "/events/hacking/hacking.jpeg",
    organizer: "Abdeali",
    desc: "This workshop was conducted by Abdeali, 3rd CSE, NMAMIT. It had a positive impact among the participants and gave the newbies the required knowledge and resources to kickstart their journey in the field of Cyber Security.",
    year: "2021-22",
  },

  {
    name: "Cyhack",
    date: "26/05/2021",
    attended: "60+ Teams",
    type: "Cyber Security",
    image: "/events/cyhack/picture1.png",
    organizer: "Sanath R Pai, Shravya S Rao , Shrilakshmi Pai N",
    desc: "Information Security competition that challenges the contestants to solve a variety of tasks ranging from a scavenger hunt on Wikipedia to basic programming exercises, to hack their way into a server to steal the data.",
    year: "2020-21",
  },

  {
    name: "Kurukshetra",
    date: "11/03/2021",
    attended: "150+ participants",
    type: "Cyber Security",
    image: "/events/kurukshetra/picture1.png",
    organizer: "Finite Loop Team",
    desc: "Finite Loop club, NMAMIT, Nitte, successfully conducted a gaming event on 11th March, 2021. It was a fun and a lively event. More than 150 students competed to obtain the title of Ultimate Champions. The event consisted of three games, which were Call of Duty, NFS, eFootballPes",
    year: "2020-21",
  },
  {
    name: "CODE INNOVATION SERIES",
    date: "28-30 October, 2020",
    attended: "80+ Teams",
    type: "Open source Hackathon",
    image: "/events/code_innovation/picture2.png",
    organizer: "Finite Loop Team",
    desc: "Finite Loop Club under the Centre for Student Innovation (CFSI) in association with the New Age Innovation Network (NAIN), KITS, Dept. of Electronics, IT, BT and S&T, Govt. of Karnataka organized “CODE INNOVATION SERIES - NMAMIT” hosted by IncubateIND under the GitHub Campus Program in collaboration with our college, and thus was a part of India's largest open source Hackathon.",
    year: "2020-21",
  },
  {
    name: "Naari Tattva",
    date: "13/03/2021",
    attended: "100+ Participants",
    type: "Seminar",
    image: "/events/naritatva/picture.png",
    organizer: "Finite Loop Team",
    desc: "Finite Loop NMAMIT, Nitte, organized an event, 'Naari Tattva', on 13th of March, 2021. This event glorified the achievements of women in various fields. The session consisted of Inspirational talk by women achievers, Stand-up comedy, Poetry, Shayari, narrating short stories and The grand quiz.",
    year: "2020-21",
  },
  {
    name: "DEBUNKER 101",
    date: "26/04/2021",
    attended: "150+ Participants",
    type: "Seminar",
    image: "/events/debunker/picture1.png",
    organizer: "Sanath R Pai, Shravya S Rao, Rahul S",
    desc: "Finite Loop Club-NMAMIT in association with the Dept. of Electrical and Electronics Engineering, conducted the virtual debugging workshop Debunker 101 on 26th April 2021 from 2-5 pm. The workshop was conducted to provide placement related tips on debugging and coding in C/C++ for pre-final year students of the EEE dept.",
    year: "2020-21",
  },
  {
    name: "Importance of Web in the era of AI",
    date: "10/10/2020",
    attended: "200+ Participants",
    type: "Seminar",
    image: "/events/imp_web_ai_era/crp_pic.png",
    organizer: "Finite Loop Team",
    desc: "Dr. Gokul S Krishnan in his guest lecture, spoke about the evolution of the web. He discussed various versions through which the web has evolved. He also went on to talk about Machine Learning, Internet of Things, and the role of web and web services. The two hours of the session provided glimpses of the research direction of various trending technologies.",
    year: "2020-21",
  },
  {
    name: "A hands on session on DevOps",
    date: "24-25th February 2018",
    attended: "30+ Participants",
    type: "Workshop",
    image: "/events/devops/picture1.png",
    organizer: "Finite Loop Team",
    desc: "Finite Loop had successfully conducted a two-day workshop on “A hands on session on DevOps“. Students from various semesters actively took part in the workshop. The session started off with Introduction to DevOps. The session then continued with Git, a version control system for tracking changes in computer files and coordination. The usage of GitHub and remote connection to GitHub was taught in the session. The second day began with the second session of DevOps workshop. The testing of code (i.e. project) by an automated build (Travis CI) was taught in the session. Docker, a computer program performing OS level virtualization was introduced. Dockerizing a project was taught and we deployed our own web server using docker and Django, a high-level python framework. This marked the end of the 2-day workshop on “A hands on session on DevOps”",
    year: "2017-20",
  },
  {
    name: "Screening Test",
    date: "12/01/2018",
    attended: "40+ Participants",
    type: "Workshop",
    image: "/events/screening_test/Picture1.jpg",
    organizer: "Finite Loop Team",
    desc: "A screening test was conducted for those who wished to be a part of this club. In the first round, 20 objective type questions on C and C++ were to be answered by the students. Students from various branches took part in it. For the second round, the short listed students were asked to solve two questions, one of them being a problem statement, and another, a web development question. 9 contestants were selected as the new members of Finite Loop, based on their style, creativity and problem solving ability.",
    year: "2017-20",
  },
  {
    name: "Android App development",
    date: "28-29th October 2017",
    attended: "30+ Participants",
    type: "Android Development",
    image: "/events/android_dev/picture3.png",
    organizer: "Finite Loop Team",
    desc: "Finite Loop in association with Centre For Student Innovation(CFSI), had conducted a 2-day Workshop on “Android App Development”. The students were taught the basics of Android, its life cycles, coding with Android studio. The students were able to develop a small scale android application at the end of the sessions.",
    year: "2017-20",
  },
  {
    name: "Introduction to Web Development",
    date: "16-17th September 2017",
    attended: "60+ Participants",
    type: "Web Development",
    image: "/events/intro_to_web/Picture3.png",
    organizer: "Finite Loop Team",
    desc: "Finite loop in association with Centre For Student Innovation(CFSI), had conducted a 2-day Workshop on “Introduction to Web Designing”. The sessions covered topics on basic Html, CSS and JavaScript.",
    year: "2017-20",
  },
  {
    name: "Backend Development using PHP",
    date: "23-24th September 2017",
    attended: "50+ Participants",
    type: "Web Development",
    image: "/events/backend_dev/Picture2.jpg",
    organizer: "Finite Loop Team",
    desc: "Finite Loop in association with Centre For Student Innovation(CFSI), has conducted a 2-day Workshop on “Backend Development using PHP”. The sessions covered topics on server side programming concepts using PHP.",
    year: "2017-20",
  },
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
