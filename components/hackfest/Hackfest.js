import Image from 'next/image';
import { Fade } from 'react-reveal';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, } from 'react-icons/ri';
import { GiRuleBook } from 'react-icons/gi';
import { FiExternalLink } from 'react-icons/fi';


const HackFestPhase = [
  {
    title: 'Kickstart',
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
    icon: <RiNumber1 className='text-3xl text-yellow-500 inline' />,
    date: '11-18th Nov',
    link: false,
    id: 1
  },
  {
    title: 'Ideathon',
    description: `Teams need to pitch in their ideas which they have
    planned in the previous phase by presenting us on what
    they're planning to build. This can include the features,
    planned UI, etc of their end product. Must be shown to
    the assigned advisor by setting up a meet on any of the 2
    days to get the feedbacks.`,
    icon: <RiNumber2 className='text-3xl text-yellow-500 inline' />,
    date: '19th-20th Nov',
    link: false,
    id: 2
  },
  {
    title: 'Hackathon',
    description: `Team must work on building the project along with
    learning the tech simultaneously. Team is expected to
    report the project progress to the advisor every
    weekend called as 'Retro/Retrospection' by setting up a
    meet to discuss what they have done so far, this is
    counted as 1 sprint. 4 such sprints must happen in the
    month of December.`,
    icon: <RiNumber3 className='text-3xl text-yellow-500 inline' />,
    date: '21 Nov - 25 Dec',
    link: false,
    id: 3
  },
  {
    title: 'Expo Prep',
    description: `Team is expected to stop development, and must focus
    on preparing themselves for presenting the project on
    Project expo. No commits at this stage will be
    considered. Ppt or any other valid ways can be used to
    present your project to the judges.`,
    icon: <RiNumber4 className='text-3xl text-yellow-500 inline' />,
    date: '25th Dec onwards',
    link: false,
    id: 4
  },
  {
    title: 'Project Expo',
    description: ` Final offline stage to showcase the projects at College
    to our judges. Winning team and Runner-up team will be
    announced on the same day. Each team member of
    Winning and Runner up team will be awarded with
    exciting prizes.`,
    date: 'Coming Soon',
    icon: <RiNumber5 className='text-3xl text-yellow-500 inline' />,
    link: false,
    id: 5

  },
  {
    title: 'Brochure',
    description: `Hackfest Brochure explaining the whole rules and timeline in the detail.`,
    icon: <GiRuleBook className='text-3xl text-yellow-500 inline' />,
    link: true,
    id: 6
  },
]

const Hackfest = () => {
  return (
    <>

      <section className="text-black dark:text-white bg-white dark:bg-gray-900/10 transition-colors duration-500">
        <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-28">
          <Fade top cascade>
            <div className="max-w-lg mx-auto text-center">
              <h2 className="text-3xl heading font-bold sm:text-4xl">
                FLC Hackfest 2022-23
              </h2>

              <div className="pt-8">
                <Image
                  alt="Team"
                  width={400}
                  height={500}
                  src="/assets/hackfest.jpg"
                  className="rounded-lg"
                />
              </div>
              {/* <p className="mt-4">
                Lab Oriented Training conducted by the ever-energetic &apos;Finite Loop
                Club&apos; on &apos;Application Development using Collaborative Tools&apos; to
                the first-year students (2021-2022) as a part of enhancing their
                skills.
              </p> */}
              <div className='my-4 ' >
                <ul className="dui-steps gap-3">
                  <li data-content="✓" className="dui-step dui-step-warning text-xl font-bold ">Phase 1</li>
                  <li data-content="✓" className="dui-step dui-step-warning text-xl font-bold">Phase 2</li>
                  <li data-content="✓" className="dui-step dui-step-warning text-xl font-bold">Phase 3</li>
                  <li data-content="✓" className="dui-step dui-step-warning text-xl font-bold">Phase 4</li>
                  <li data-content="★" className="dui-step dui-step-neutral text-xl font-bold">Phase 5</li>
                  {/* <li data-content="●" className="dui-step dui-step-neutral">Step 7</li> */}
                </ul>
              </div>
            </div>
          </Fade>

          <Fade top cascade>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {HackFestPhase.map((phase, index) => (
                <div

                  key={phase.id}
                  className="block p-8 border border-yellow-500 shadow-xl transition-all rounded-xl hover:shadow-yellow-500/25 hover:border-yellow-300 duration-300 hover:scale-[1.05]"
                >
                  <div className="border-2 p-3 rounded-xl border-yellow-500 w-fit">
                    {phase.icon}
                  </div>
                  <div className="mt-4 text-xl font-bold text-black dark:text-white">
                    {phase.title} {phase.date ? <div className="dui-badge dui-badge-warning p-3 ml-3 dui-badge-outline">  {phase.date}</div> : ''}{phase.link ? (<a href="/FLC_Hackfest_2022.pdf" target='_blank' > <FiExternalLink className='inline ml-2 text-yellow-500 cursor-pointer mb-1 text-2xl' /> </a>) : ''}
                  </div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                    {phase.description}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>


    </>
  )
}

export default Hackfest