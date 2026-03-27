import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8 mt-4">
        <h1 className="text-4xl md:text-6xl font-bold gradient-title">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}