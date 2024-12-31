import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function idOrNameDisplay(
  idOrName: string | { _id: string; name?: string },
) {
  if (typeof idOrName === "string") {
    return idOrName;
  }

  return idOrName.name || idOrName._id;
}

export function imageUrl(url: string) {
  if (url.startsWith("http")) {
    return url;
  }

  return new URL(`/image/${url}`, "https://sig-api.mingdao.edu.tw/").toString();
}
