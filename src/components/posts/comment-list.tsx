import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CommentWithAuthor } from "@/types/database";

export function CommentList({ comments }: { comments: CommentWithAuthor[] }) {
  return (
    <div className="space-y-3">
      {comments.map((comment) => {
        const name = comment.profiles?.display_name ?? "Anonymous";
        const letter = name.charAt(0).toUpperCase();

        return (
          <article key={comment.id} className="rounded-xl border bg-card p-4">
            <div className="mb-2 flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>{letter}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{comment.content}</p>
          </article>
        );
      })}
    </div>
  );
}
