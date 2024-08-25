import { BiErrorAlt, BiCheckSquare, BiQuestionMark } from "react-icons/bi";
import PopupHint from "../common/PopupHint";
import { ReactNode } from "react";

export type IconOptions = "success" | "error" | "maybe" | null

interface GoPlusMessageProps {
  message: string
  icon: IconOptions
  hint?: string
}

export default function GoPlusMessage(props: GoPlusMessageProps) {

  const { icon, hint, message } = props

  let finalIcon = icon === "success" ?
    <BiCheckSquare className="w-6 h-6 text-success" />
    : icon === "error" ?
      <BiErrorAlt className="w-6 h-6 text-error" />
      : icon === "maybe" ?
        <BiQuestionMark className="w-6 h-6" />
        : null;

  return (
    <div className="flex items-center gap-2 my-2">
      {finalIcon}
      {message}
      {hint ? <PopupHint>{hint}</PopupHint> : null}
    </div>
  );
};

export const GoPlusHeading = ({ children }: { children: ReactNode }) => (
  <h4 className={`font-semibold mt-6 mb-2 italic`}>
    {children}
  </h4>
)