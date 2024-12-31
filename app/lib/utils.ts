import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function idOrNameDisplay(idOrName: string | { _id: string; name?: string }) {
  if (typeof idOrName === "string") {
    return idOrName;
  }

  return idOrName.name || idOrName._id;
}