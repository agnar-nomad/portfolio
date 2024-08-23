import { darkGold } from "@/lib/config";
import { BarLoader } from "react-spinners";



export default function ProgressIndicator() {
  return (
    <BarLoader className="mb-3" width={'100%'} color={darkGold} />
  )
}