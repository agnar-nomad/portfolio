import { BsExclamationTriangleFill } from "react-icons/bs";

export default function PrelaunchWarningTag() {
  return (
    <span className=" tooltip tooltip-left tooltip-warning absolute bg-warning text-warning-content -translate-x-1/2 left-[90%] sm:left-1/2 -top-6 px-4 py-2 font-semibold text-center whitespace-nowrap cursor-help" data-tip={"Pre-launch"}>
      <BsExclamationTriangleFill className="w-6 h-6 mx-auto" />
    </span>
  )
}