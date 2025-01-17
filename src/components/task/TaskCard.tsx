"use client";

import { useState } from "react";
import { Task } from "@/types";
import { Button } from "../ui/button";
import {
  Minimize2,
  Maximize2,
  X,
  Calendar,
  Link2,
  Image as ImageIcon,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { SubtaskList } from "./SubtaskList";
import { CommentList } from "./CommentList";
import { AddTagModal } from "./AddTagModal";
import { AddLinkModal } from "./AddLinkModal";
import { AddImageModal } from "./AddImageModal";
import { AddDateModal } from "./AddDateModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TaskCardProps {
  task: Task;
  onClose: () => void;
  onAddSubtask: (title: string) => void;
  onToggleSubtask: (subtaskId: string) => void;
  onAddComment: (content: string) => void;
  onAddTag: (tag: string) => void;
  onAddLink: (url: string) => void;
  onAddImage: (url: string) => void;
  onAddDate: (date: string) => void;
}

export function TaskCard({
  task,
  onClose,
  onAddSubtask,
  onToggleSubtask,
  onAddComment,
  onAddTag,
  onAddLink,
  onAddImage,
  onAddDate,
}: TaskCardProps) {
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [isAddDateModalOpen, setIsAddDateModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
      <header className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium">{task.title}</h3>
          <Image
            src="https://github.com/kaykyb.png"
            alt="User avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex">
        <div className="flex-1 p-4">
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          </div>

          <div className="mb-6">
            <SubtaskList
              subtasks={task.subtasks}
              onAddSubtask={onAddSubtask}
              onToggleSubtask={onToggleSubtask}
            />
          </div>

          <div>
            <CommentList comments={task.comments} onAddComment={onAddComment} />
          </div>
        </div>

        <div className="w-64 border-l p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Data de entrega
              </label>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setIsAddDateModalOpen(true)}
              >
                <Calendar className="w-4 h-4" />
                {task.dueDate
                  ? format(new Date(task.dueDate), "d 'de' MMMM", {
                      locale: ptBR,
                    })
                  : "Adicionar data"}
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Prioridade
              </label>
              <select className="w-full border rounded-md p-2">
                <option value="">Selecionar prioridade</option>
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Tags</label>
              <div className="flex flex-wrap gap-1">
                {task.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2 mt-2"
                  onClick={() => setIsAddTagModalOpen(true)}
                >
                  <Plus className="w-3 h-3" />
                  Adicionar tag
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Anexos</label>
              <div className="space-y-2">
                <div>
                  {task.links?.map((link) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600"
                    >
                      <Link2 className="w-4 h-4" />
                      {link}
                    </a>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => setIsAddLinkModalOpen(true)}
                  >
                    <Link2 className="w-4 h-4" />
                    Adicionar link
                  </Button>
                </div>

                <div>
                  {task.images?.map((image) => (
                    <div
                      key={image}
                      className="relative aspect-video rounded-lg border mb-2 overflow-hidden"
                    >
                      <img
                        src={image}
                        alt="Anexo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => setIsAddImageModalOpen(true)}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Adicionar imagem
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddTagModal
        isOpen={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
        onAddTag={onAddTag}
      />
      <AddLinkModal
        isOpen={isAddLinkModalOpen}
        onClose={() => setIsAddLinkModalOpen(false)}
        onAddLink={onAddLink}
      />
      <AddImageModal
        isOpen={isAddImageModalOpen}
        onClose={() => setIsAddImageModalOpen(false)}
        onAddImage={onAddImage}
      />
      <AddDateModal
        isOpen={isAddDateModalOpen}
        onClose={() => setIsAddDateModalOpen(false)}
        onAddDate={onAddDate}
        currentDate={task.dueDate}
      />
    </div>
  );
}
