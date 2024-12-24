import type { Sig } from "~/lib/types";
import { Button, type ButtonProps } from "./ui/button";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { Skeleton } from "./ui/skeleton";

function SigButton(props: ButtonProps) {
  return (
    <Button
      className="px-3 py-1.5 h-auto text-sm"
      variant="secondary"
      {...props}
    />
  );
}

export function SigCard({ sig }: { sig: Sig }) {
  const { pathname } = useLocation();

  const isActive = pathname.startsWith(`/sig/@${sig.customId}`);

  return (
    <SigButton variant={isActive ? "default" : "secondary"} asChild>
      <Link
        to={`/sig/@${sig.customId}`}
        className={isActive ? "font-bold" : ""}
      >
        {sig.name}
      </Link>
    </SigButton>
  );
}

export function SigCardSkeleton() {
  return (
    <Skeleton>
      <Button
        className="px-2 py-1 h-auto text-sm text-transparent"
        variant="secondary"
        disabled
      >
        loading...
      </Button>
    </Skeleton>
  );
}

export function SigCardsContainer({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <div className="flex items-center text-xs gap-3 py-2 overflow-x-auto container no-scrollbar">
      <SigButton variant={isHome ? "default" : "secondary"} asChild>
        <Link to="/">首頁</Link>
      </SigButton>
      {children}
    </div>
  );
}
