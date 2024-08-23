import { darkGold } from "@/lib/config";
import { BeatLoader } from "react-spinners";


type LoaderIndicatorProps = {
  smaller?: boolean
}

export default function LoaderIndicator({ smaller = false }: LoaderIndicatorProps) {

  const size = smaller ? 5 : 10;

  return (
    <BeatLoader color={darkGold} size={size} />
  )
}