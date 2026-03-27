import {z} from "zod";
export const onboardingSchema = z.object({
    industry: z.string({
        required_error: "please select an industry",
    }),
    subIndustry: z.string({
        required_error: "Please select a specialization",
    }),
    bio: z.string().max(500).optional(),
    experience: z
    .string()
    .transform((val) => parseInt(val,10))
    .pipe(
        z
        .number()
        .min(0,"Experience must be at least 0 years")
        .max(50, "Experience cannot exceed 50 years")
    ),
    skills: z.string().transform((val) => 
        val
             ? val
             .split(",")
             .map((skill) => skill.trim())
             .filter(Boolean)
             : undefined
),
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

export const entrySchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    organization: z.string().min(1, "Organization is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    current: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.current && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required unless this is your current position",
      path: ["endDate"],
    }
  );

  export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution name is required"),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  grade: z.string().optional(),
  description: z.string().optional(),
});


export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  technologies: z.string().min(1, "Technologies used are required"),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
});



export const resumeSchema = z.object({
  contactInfo: contactSchema,
  summary: z.string().min(1, "Professional summary is required"),
  skills: z.string().min(1, "Skills are required"),
  experience: z.array(entrySchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
});


export const coverLetterSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
});