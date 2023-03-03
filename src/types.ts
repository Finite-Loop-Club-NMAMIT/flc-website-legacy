import { z } from "zod";

// User
export const editUserInput = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
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
    "Faculty",
  ]),
});

export const addCoreMemberInput = z.object({
  name: z.string(),
  role: z.enum([
    "Principal",
    "AssistantProfessor",
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
  ]),
  img: z.string(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  filter: z.enum([
    "Year2017to2020",
    "Year2020to2021",
    "Year2021to2022",
    "Year2022to2023",
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
    ]) || undefined
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
  ]),
  image: z.string(),
  organizer: z.string(),
  description: z.string(),
  filter: z.enum([
    "Year2017to2020",
    "Year2020to2021",
    "Year2021to2022",
    "Year2022to2023",
  ]),
});
