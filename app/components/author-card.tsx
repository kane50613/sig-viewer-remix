import type { User } from "~/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AuthorCard({ user }: { user: User }) {
  return (
    <Card className="relative flex flex-col">
      <CardHeader>
        <CardTitle>{user.displayName ?? user.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {user.description}
      </CardContent>
    </Card>
  );
}
