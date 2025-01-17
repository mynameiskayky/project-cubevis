"use client";

import { Settings, Share } from "lucide-react";
import { Button } from "./button";

interface HeaderProps {
  variant?: "settings" | "share";
}

export function Header({ variant = "settings" }: HeaderProps) {
  return (
    <header className="h-[73px] border-b border-[#E5E7EB] bg-white flex items-center justify-end px-5">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 hover:bg-gray-50"
      >
        {variant === "settings" ? (
          <Settings className="w-5 h-5 text-[#6B7280]" />
        ) : (
          <Share className="w-5 h-5 text-[#6B7280]" />
        )}
      </Button>
    </header>
  );
}
