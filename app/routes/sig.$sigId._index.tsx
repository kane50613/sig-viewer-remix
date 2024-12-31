import { fetchSig, fetchSigs, fetchSigWithPosts } from "~/lib/api";
import type { Route } from "./+types/sig.$sigId._index";
import { SigButtonsAsyncList } from "~/components/sig-button";
import { PostCardsAsyncList } from "~/components/post-card";

export function clientLoader({ params }: Route.LoaderArgs) {
  return {
    sigs: fetchSigs(),
    sig: fetchSig(params.sigId),
    posts: fetchSigWithPosts(params.sigId).then((r) => r.posts),
  };
}

export default function Sig({ loaderData, params }: Route.ComponentProps) {
  return (
    <div>
      <SigButtonsAsyncList promise={loaderData.sigs} activeId={params.sigId} />
      <PostCardsAsyncList promise={loaderData.posts} />
    </div>
  );
}
