import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const downloadFile = (url: string, filename: string) => {
    if(typeof window !== "undefined" && document) {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    } else {
        return null
    }
  };