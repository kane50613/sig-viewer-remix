import { Link } from "react-router";
import { useIsTop } from "~/lib/hooks/use-is-top";
import { cn } from "~/lib/utils";

export function Header() {
  const isOnTop = useIsTop();

  return (
    <div
      className={cn(
        "container sticky top-0 z-50 flex rounded-b-2xl py-4 transition-colors",
        isOnTop && "bg-secondary/80 backdrop-blur-md",
      )}
    >
      <Link to="/">
        <img src="/logo.svg" className="h-8" />
      </Link>
    </div>
  );
}
