
type InputErrorProps = {
  message: string
}

export default function InputError({ message }: InputErrorProps) {
  return <span className="text-red-500 text-sm">{message} </span>;
}
