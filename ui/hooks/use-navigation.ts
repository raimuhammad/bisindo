import {useHistory} from "react-router-dom";

export function useNavigation(path : string = ""){
  const { push } = useHistory();
  const to = (path: string) => () => {
    return push(path);
  }
  const navigate = () => {
    push(path)
  }
  return {
    navigate,
    to,
  }
}