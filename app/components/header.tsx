import { useIsTop } from "~/lib/hooks/use-is-top";
import { cn } from "~/lib/utils";

export function Header() {
  const isOnTop = useIsTop();

  return (
    <div className={cn("container flex py-4 sticky top-0 transition-colors rounded-b-2xl", isOnTop && "bg-secondary/80 backdrop-blur-md")}>
      <img src="/logo.svg" className="h-8" />
    </div>
  );
}
