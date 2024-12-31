import { Link } from "react-router";
import type { Sig } from "~/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function SigCard({ sig }: { sig: Sig }) {
  return (
    <Card className="relative">
      <CardHeader>
        <Link
          to={`/sig/@${sig.customId}`}
          className="before:absolute before:inset-0"
        >
          <CardTitle>{sig.name}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {sig.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
