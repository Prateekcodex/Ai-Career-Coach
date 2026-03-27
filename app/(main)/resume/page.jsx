import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  let resume = null;
  
  try {
    resume = await getResume();
  } catch (error) {
    console.error("Error loading resume:", error);
  }

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content || ""} />
    </div>
  );
}