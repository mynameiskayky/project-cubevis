"use client";

import {
  ChevronDown,
  ChevronUp,
  FolderClosed,
  X,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Task } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TaskCardProps {
  task: Task;
  sectionName: string;
  projectName: string;
  onClose?: () => void;
}

export function TaskCard({
  task,
  sectionName,
  projectName,
  onClose,
}: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
            <Image
              src="https://avatars.githubusercontent.com/mynameiskayky"
              alt="Avatar do usuário"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <h2 className="text-base font-medium text-[#374151]">
            Post para "{task.title}"
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronUp className="h-4 w-4 text-[#6B7280]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4 text-[#6B7280]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4 text-[#6B7280]" />
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-[#6B7280]" />
            </Button>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1">
        <div className="flex-1 p-4 space-y-4">
          <p className="text-sm text-[#6B7280]">{task.description}</p>

          <Button
            variant="ghost"
            className="flex items-center gap-2 text-purple-600 hover:bg-purple-50"
          >
            <span className="text-sm">Adicionar Subtarefa</span>
          </Button>

          {/* Área de Comentário */}
          <div className="flex items-start gap-3 pt-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src="https://avatars.githubusercontent.com/mynameiskayky"
                alt="Avatar do usuário"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <Textarea
              placeholder="Comentar..."
              className="min-h-[100px] text-sm"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[240px] border-l border-[#E5E7EB] p-4 space-y-6">
          {/* Projeto */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-[#374151]">Projeto</span>
            <div className="flex items-center gap-2 text-[#6B7280]">
              <FolderClosed className="h-4 w-4" />
              <div className="text-sm">
                <span>{projectName}</span>
                <span className="mx-1">/</span>
                <span>{sectionName}</span>
              </div>
            </div>
          </div>

          {/* Data de Vencimento */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-[#374151]">
              Data de Vencimento
            </span>
            <Input
              type="date"
              className="text-sm text-[#6B7280]"
              value={task.dueDate}
            />
          </div>

          {/* Prioridade */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-[#374151]">
              Prioridade
            </span>
            <select className="w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#6B7280]">
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          {/* Etiquetas */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-[#374151]">
              Etiquetas
            </span>
            <div className="flex flex-wrap gap-2">
              {task.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
