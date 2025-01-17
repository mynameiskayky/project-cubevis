"use client";

import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectSectionProps {
  section: Section;
  onAddTask: () => void;
}

export function ProjectSection({ section, onAddTask }: ProjectSectionProps) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-[#374151]">
          {section.title}
        </h3>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-gray-50"
            onClick={onAddTask}
          >
            <Plus className="h-4 w-4 text-[#6B7280]" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-50"
              >
                <MoreVertical className="h-4 w-4 text-[#6B7280]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Lista de Tarefas */}
      <div className="space-y-2">
        {section.tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 bg-white border border-[#E5E7EB] rounded-md"
          >
            <h4 className="text-sm font-medium text-[#374151] mb-1">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-sm text-[#6B7280]">{task.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Botão Adicionar Tarefa quando não há tarefas */}
      {section.tasks.length === 0 && (
        <Button
          variant="outline"
          onClick={onAddTask}
          className="w-full h-[73px] border-dashed border-2 border-[#E5E7EB] hover:border-purple-200 hover:bg-purple-50/50 flex flex-col items-center justify-center gap-2 hover:text-purple-600 hover:cursor-pointer text-[#6B7280]"
        >
          <Plus className="h-5 w-5" />
          <span className="text-sm">Adicionar Tarefa</span>
        </Button>
      )}
    </div>
  );
}
