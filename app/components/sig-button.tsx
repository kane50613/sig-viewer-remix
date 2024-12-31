import type { Sig } from "~/lib/types";
import { Button, type ButtonProps } from "./ui/button";
import { Await, Link } from "react-router";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";
import { Home } from "lucide-react";
import { cn } from "~/lib/utils";

function SigButton(props: ButtonProps) {
  return (
    <Button
      variant="secondary"
      {...props}
      className={cn("h-auto px-3 py-1.5 text-sm", props.className)}
    />
  );
}

export function SigNavButton({
  sig,
  isActive,
}: {
  sig: Sig;
  isActive?: boolean;
}) {
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
        className="h-auto px-2 py-1 text-sm text-transparent"
        variant="secondary"
        disabled
      >
        loading...
      </Button>
    </Skeleton>
  );
}

export function SigButtonsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="no-scrollbar container flex items-center gap-3 overflow-x-auto py-2 text-xs">
      {children}
    </div>
  );
}

export function SigButtonsAsyncList({
  promise,
  activeId,
}: {
  promise: Promise<Sig[]>;
  activeId?: string;
}) {
  return (
    <Suspense
      fallback={
        <SigButtonsContainer>
          {Array.from({ length: 5 }, (_, i) => (
            <SigCardSkeleton key={i} />
          ))}
        </SigButtonsContainer>
      }
    >
      <Await resolve={promise}>
        {(sigs) => (
          <SigButtonsContainer>
            <SigButton
              variant={activeId ? "secondary" : "default"}
              asChild
              className="h-8"
            >
              <Link to="/">
                <Home /> 首頁
              </Link>
            </SigButton>
            {sigs.map((sig) => (
              <SigNavButton
                key={sig._id}
                sig={sig}
                isActive={sig.customId === activeId?.slice(1)}
              />
            ))}
          </SigButtonsContainer>
        )}
      </Await>
    </Suspense>
  );
}
