import { fetchSig, fetchSigPosts, fetchSigs } from "~/lib/api";
import type { Route } from "./+types/sig.$sigId._index";
import { SigCardsAsyncList } from "~/components/sig-card";
import { PostCardsAsyncList } from "~/components/post-card";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const sig = await fetchSig(params.sigId);
  
  if (!sig) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const sigs = fetchSigs();
  const posts = fetchSigPosts(sig._id);

  return {
    sig,
    sigs,
    posts,
  };
}

export default function Sig({ loaderData, params }: Route.ComponentProps) {
  return (
    <div>
      <SigCardsAsyncList promise={loaderData.sigs} activeId={params.sigId} />
      <PostCardsAsyncList promise={loaderData.posts} />
    </div>
  );
}
