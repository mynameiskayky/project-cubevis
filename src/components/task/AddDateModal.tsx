"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AddDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDate: (date: string) => void;
  currentDate?: string;
}

export function AddDateModal({
  isOpen,
  onClose,
  onAddDate,
  currentDate,
}: AddDateModalProps) {
  const [date, setDate] = useState(currentDate || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (date) {
      onAddDate(date);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar data de entrega</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {date && (
              <p className="text-sm text-gray-500 mt-2">
                {format(new Date(date), "EEEE, d 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!date}>
              {currentDate ? "Atualizar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
