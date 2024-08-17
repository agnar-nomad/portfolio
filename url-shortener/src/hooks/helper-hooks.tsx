import { useNavigate, useSearchParams } from "react-router-dom";


export const useUtilHelpers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const longLink = searchParams.get('createNew');

  return { navigate, createNewUrlSearchParam: longLink }
}