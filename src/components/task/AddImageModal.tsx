"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ImageIcon } from "lucide-react";

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (url: string) => void;
}

export function AddImageModal({
  isOpen,
  onClose,
  onAddImage,
}: AddImageModalProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (url.trim()) {
      onAddImage(url);
      setUrl("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar imagem</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="url"
              placeholder="Cole ou digite a URL da imagem"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          {url && (
            <div className="relative aspect-video rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "";
                  e.currentTarget.classList.add("hidden");
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!url.trim()}>
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
