"use client";

import {
  Calendar,
  ChevronDown,
  ChevronRight,
  FolderClosed,
  Plus,
  Search,
  Bell,
  LayoutGrid,
} from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";
import Link from "next/link";
import { useProjects } from "@/contexts/ProjectContext";
import { usePathname, useRouter } from "next/navigation";
import { CreateProjectModal } from "../project/CreateProjectModal";
import Image from "next/image";

export function Sidebar() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { projects } = useProjects();
  const pathname = usePathname();
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <aside className="w-fit h-screen border-r border-[#E9ECEF] bg-white flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 gap-5 border-b border-[#E9ECEF]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            <Image
              src="https://avatars.githubusercontent.com/mynameiskayky"
              alt="Avatar do usuário"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <button className="flex items-center gap-2 hover:bg-gray-50 rounded-md px-2 py-1.5 transition-colors group">
            <span className="text-[#6B7280] text-sm font-normal">
              mynameiskayky
            </span>
            <ChevronDown className="w-4 h-4 text-[#6B7280] group-hover:text-[#374151]" />
          </button>
        </div>

        <div className="flex gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            className=" hover:bg-gray-50 w-fit h-fit p-1"
          >
            <Bell className="w-6 h-6 text-[#8A8A8A]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-50 w-fit h-fit p-1"
          >
            <LayoutGrid className="w-6 h-6 text-[#8A8A8A]" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-5 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          <Input
            placeholder="Faça sua busca..."
            className="pl-9 h-10 bg-white text-sm border-[#E9ECEF] text-[#8A8A8A] focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:ring-offset-0"
          />
        </div>

        {/* Navegação */}
        <nav className="space-y-2">
          {/* sessões Hoje */}
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-[#6B7280] hover:bg-gray-50 rounded-md transition-colors"
          >
            <Calendar className="h-5 w-5" />
            Hoje
          </Link>

          {/* sessões Meus Projetos */}
          <div>
            <div className="flex items-center justify-between w-full px-3 py-2 bg-[#F3E8FF] rounded-md group transition-colors">
              <Link href="/projects" className="flex items-center gap-3 flex-1">
                <FolderClosed className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-purple-600 font-medium">
                  Meus Projetos
                </span>
              </Link>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-purple-100"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="h-4 w-4 text-purple-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-purple-100"
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                >
                  {isProjectsOpen ? (
                    <ChevronDown className="h-4 w-4 text-purple-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-purple-600" />
                  )}
                </Button>
              </div>
            </div>

            {/* Lista de Projetos */}
            {isProjectsOpen && (
              <div className="mt-1 space-y-0.5 pl-3">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className={`
                      flex items-center relative gap-2 w-full px-3 py-2 text-sm 
                      hover:bg-gray-50 rounded-md transition-colors
                      ${
                        pathname === `/projects/${project.id}`
                          ? "bg-[#F3E8FF] text-purple-600"
                          : "text-[#6B7280]"
                      }
                    `}
                  >
                    {pathname === `/projects/${project.id}` && (
                      <span className="h-1/2 w-1 bg-purple-600 rounded absolute left-0 top-1/2 -translate-y-1/2" />
                    )}

                    <div className="w-4" />
                    <FolderClosed className="h-4 w-4" />
                    <span className="text-sm">{project.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </aside>
  );
}
