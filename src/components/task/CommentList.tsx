"use client";

import { Comment } from "@/types";
import { Input } from "../ui/input";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CommentListProps {
  comments?: Comment[];
  onAddComment: (content: string) => void;
}

export function CommentList({ comments = [], onAddComment }: CommentListProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const content = form.comment.value;

    if (content.trim()) {
      onAddComment(content);
      form.reset();
    }
  };

  return (
    <div className="space-y-4">
      {comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <Image
                src="https://github.com/kaykyb.png"
                alt="User avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <div className="bg-gray-100 rounded-lg p-2">
                  <p className="text-sm">{comment.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Image
          src="https://github.com/mynameiskayky.png"
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <Input
          name="comment"
          placeholder="Adicione um comentário..."
          className="flex-1"
        />
      </form>
    </div>
  );
}
