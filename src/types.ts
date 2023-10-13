import { z } from "zod";

// User
export const editUserInput = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  branch: z.string().optional(),
  year: z.number().optional(),
  links: z.string().optional(),
});

// Team
export const updateTeamInput = z.object({
  teamId: z.number(),
  name: z.string(),
  description: z.string(),
});

// Core Members
export const getCoreMembersInput = z.object({
  filter: z.enum([
    "Year2017to2020",
    "Year2020to2021",
    "Year2021to2022",
    "Year2022to2023",
    "Year2023to2024",
    "Faculty",
  ]),
});

export const addCoreMemberInput = z.object({
  name: z.string(),
  role: z.enum([
    "Principal",
    "AssistantProfessor",
    "Mentor",
    "President",
    "VicePresident",
    "Treasurer",
    "DocumentationHead",
    "PublicityHead",
    "Secretary",
    "JointSecretary",
    "EventsHead",
    "EventsCoHead",
    "TalentAcquisitionHead",
    "TechnicalHead",
    "DigitalTechLead",
    "EthicalHackingHead",
    "ProgramAdvisor",
    "ProgramLead",
    "GraphicsHead",
    "GraphicsCoHead",
    "SocialMediaHead",
    "SocialMediaCoHead",
    "ContentHead",
    "ContentCoHead",
    "GraphicsTeam",
    "SocialMediaTeam",
    "ContentTeam",
    "TechnicalContentHead",
    "TechnicalTeam",
    "CoreMember",
    "CompetitiveProgrammingLead",
    "OperationsManager",
    "LeadDeveloper",
    "FrontendLead",
    "BackendLead",
    "CPAdvisors",
    "CPTeamMember",
    "AppDomainHead",
    "AIMLDomainHead",
    "EventLead",
  ]),
  img: z.string(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  filter: z.enum([
    "Year2017to2020",
    "Year2020to2021",
    "Year2021to2022",
    "Year2022to2023",
    "Year2023to2024",
    "Faculty",
  ]),
});

// Events
export const getEventsInput = z.object({
  filter: z.optional(
    z.enum([
      "Year2017to2020",
      "Year2020to2021",
      "Year2021to2022",
      "Year2022to2023",
      "Year2023to2024",
    ]) || undefined,
  ),
});

export const addEventInput = z.object({
  name: z.string(),
  date: z.date(),
  attended: z.number(),
  type: z.enum([
    "Workshop",
    "Seminar",
    "Gaming",
    "Talk",
    "CyberSecurity",
    "OpenSource",
    "AndroidDevelopment",
    "WebDevelopment",
    "Hackathon",
    "CodingContest",
  ]),
  image: z.string(),
  organizer: z.string(),
  description: z.string(),
  filter: z.enum([
    "Year2017to2020",
    "Year2020to2021",
    "Year2021to2022",
    "Year2022to2023",
    "Year2023to2024",
  ]),
});

// Certificate
export const awardCertificateInput = z.object({
  userIds: z.array(z.string()), // Update to accept an array of user IDs
  eventId: z.number(),
  desc: z.string().optional(),
  type: z.enum([
    "TeamParticipation",
    "SoloParticipation",
    "Winner",
    "RunnerUp",
    "SpecialRecognition",
  ]),
});
