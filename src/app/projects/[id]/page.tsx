"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectSection } from "@/components/project/ProjectSection";
import { AddSectionModal } from "@/components/project/AddSectionModal";
import { AddTaskModal } from "@/components/project/AddTaskModal";
import { useParams } from "next/navigation";
import { useProjects } from "@/contexts/ProjectContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { projects, addSection, addTask } = useProjects();
  const project = projects.find((p) => p.id === projectId);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

  if (!project) return null;

  const handleAddSection = (title: string) => {
    addSection(projectId, title);
  };

  const handleAddTask = (data: { title: string; description: string }) => {
    if (currentSectionId) {
      addTask(currentSectionId, data);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header variant="share" />
        <ProjectHeader projectName={project.name} />

        <main className="flex-1 p-8 bg-[#FAFAFA]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.sections.map((section) => (
                <ProjectSection
                  key={section.id}
                  section={section}
                  onAddTask={() => {
                    setCurrentSectionId(section.id);
                    setIsAddTaskModalOpen(true);
                  }}
                />
              ))}

              <Button
                onClick={() => setIsAddSectionModalOpen(true)}
                variant="outline"
                className="h-[200px] border-dashed border-2 border-[#E5E7EB] hover:border-purple-200 hover:bg-purple-50/50 flex flex-col items-center justify-center gap-2 hover:text-purple-600 hover:cursor-pointer text-[#6B7280]"
              >
                <Plus className="h-6 w-6" />
                <span>Adicionar Sessão</span>
              </Button>
            </div>
          </div>
        </main>

        <AddSectionModal
          isOpen={isAddSectionModalOpen}
          onClose={() => setIsAddSectionModalOpen(false)}
          onAdd={handleAddSection}
        />

        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          onAdd={handleAddTask}
        />
      </div>
    </div>
  );
}
