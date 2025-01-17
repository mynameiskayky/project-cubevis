"use client";

import { useState } from "react";
import { Subtask } from "@/types";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { AddSubtaskModal } from "./AddSubtaskModal";

interface SubtaskListProps {
  subtasks?: Subtask[];
  onAddSubtask: (title: string) => void;
  onToggleSubtask: (subtaskId: string) => void;
}

export function SubtaskList({
  subtasks = [],
  onAddSubtask,
  onToggleSubtask,
}: SubtaskListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {subtasks.length > 0 && (
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-2">
              <Checkbox
                id={subtask.id}
                checked={subtask.completed}
                onCheckedChange={() => onToggleSubtask(subtask.id)}
              />
              <label
                htmlFor={subtask.id}
                className={`text-sm ${
                  subtask.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {subtask.title}
              </label>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => setIsAddModalOpen(true)}
      >
        <Plus className="w-4 h-4" />
        Adicionar subtarefa
      </Button>

      <AddSubtaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSubtask={onAddSubtask}
      />
    </div>
  );
}
