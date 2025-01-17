"use client";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { CreateProjectModal } from "@/components/project/CreateProjectModal";
import { Plus } from "lucide-react";
import { useProjects } from "@/contexts/ProjectContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { projects } = useProjects();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (projects.length > 0) {
      router.push(`/projects/${projects[0].id}`);
    }
  }, [projects, router]);

  if (projects.length > 0) return null;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto p-8">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-[400px] h-[400px]">
              <img
                src="/empty-projects.svg"
                alt="Nenhum projeto encontrado"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center space-y-6">
              <h2 className="text-lg font-medium text-[#6B7280]">
                Parece que ainda não há nenhum projeto criado
              </h2>
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white gap-2 h-10 px-4"
                >
                  <Plus className="h-4 w-4" />
                  Novo Projeto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
