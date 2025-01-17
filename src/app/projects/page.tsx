"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/ui/sidebar";
import { CreateProjectModal } from "@/components/project/CreateProjectModal";
import { ChevronDown, FolderClosed, Plus, Search } from "lucide-react";
import { useProjects } from "@/contexts/ProjectContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectActions } from "@/components/project/ProjectActions";
import { Header } from "@/components/ui/header";

export default function ProjectsPage() {
  const { projects } = useProjects();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1">
          <div className="max-w-[1200px] mx-auto p-8">
            {/* Header de Projetos */}
            <header className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FolderClosed className="h-6 w-6 text-purple-600" />
                <h1 className="text-2xl font-medium text-[#374151]">
                  Meus Projetos
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative w-[280px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                    <Input
                      placeholder="Faça sua busca..."
                      className="pl-9 h-10 bg-white border-[#E5E7EB] text-sm text-[#6B7280] focus-visible:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-10 text-[#6B7280] border-[#E5E7EB] hover:bg-gray-50"
                  >
                    <span>Projetos ativos</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white gap-2 h-10 px-4"
                >
                  <Plus className="h-4 w-4" />
                  Novo Projeto
                </Button>
              </div>
            </header>

            {/* Lista de Projetos */}
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 bg-white border border-[#E5E7EB] rounded-lg hover:border-purple-200 transition-colors group relative"
                  >
                    <div className="absolute top-4 right-4">
                      <ProjectActions
                        projectId={project.id}
                        projectName={project.name}
                      />
                    </div>
                    <button
                      onClick={() => handleProjectClick(project.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <FolderClosed className="h-5 w-5 text-purple-600" />
                        <h3 className="text-lg font-medium text-[#374151] group-hover:text-purple-600">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-sm text-[#6B7280]">
                        {project.sections.length} sessões
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                <p className="text-base text-[#6B7280] mb-8">
                  Parece que ainda não há nenhum projeto criado
                </p>
                <div className="relative w-[500px] h-[500px] mb-4">
                  <img
                    src="/empty-projects.svg"
                    alt="Nenhum projeto encontrado"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </main>

        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  );
}
