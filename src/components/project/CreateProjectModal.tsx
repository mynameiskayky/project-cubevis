"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderClosed, X } from "lucide-react";
import { useState } from "react";
import { useProjects } from "@/contexts/ProjectContext";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const { addProject, setCurrentProject } = useProjects();

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    const newProject = addProject(projectName);
    setCurrentProject(newProject);
    setProjectName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 bg-white">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderClosed className="h-5 w-5 text-[#6B7280]" />
              <DialogTitle className="text-lg font-medium text-[#374151]">
                Novo Projeto
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-50"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-[#6B7280]" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="projectName"
              className="text-sm font-medium text-[#374151]"
            >
              Nome
            </label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Social Media Posts"
              className="h-10 bg-white border-[#E5E7EB] text-[#374151] focus-visible:ring-purple-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-[#6B7280] hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateProject}
              disabled={!projectName.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Criar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
