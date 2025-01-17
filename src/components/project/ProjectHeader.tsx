"use client";

import { FolderClosed, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectHeaderProps {
  projectName: string;
}

export function ProjectHeader({ projectName }: ProjectHeaderProps) {
  return (
    <header className="h-[73px] border-b border-[#E5E7EB] bg-white flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#374151] transition-colors"
        >
          <FolderClosed className="h-5 w-5" />
          <span className="text-sm">Meus Projetos</span>
        </Link>
        <span className="text-[#6B7280]">/</span>
        <span className="text-sm text-[#374151]">{projectName}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 hover:bg-gray-50"
        >
          <Menu className="w-5 h-5 text-[#6B7280]" />
        </Button>
      </div>
    </header>
  );
}
