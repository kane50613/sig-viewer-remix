import type { ApiComment } from "~/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";

export function CommentsCard({ comments }: { comments: ApiComment[] }) {
  const [showAll, setShowAll] = useState(false);

  const showingComments = showAll ? comments : comments.slice(0, 3);

  return (
    <Card className="relative flex flex-col">
      <CardHeader>
        <CardTitle>留言區</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5 text-sm">
        {showingComments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
        {comments.length === 0 && (
          <p className="text-muted-foreground">暫無留言</p>
        )}
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-muted-foreground hover:underline"
          >
            顯示全部留言
          </button>
        )}
      </CardContent>
    </Card>
  );
}

function CommentItem({ comment }: { comment: ApiComment }) {
  return (
    <div className="flex gap-2.5">
      <img src={comment.user.avatar} className="mt-1 h-8 w-8 rounded-full" />
      <div>
        <p className="font-medium">@{comment.user.customId}</p>
        <p>{comment.content}</p>
      </div>
    </div>
  );
}
