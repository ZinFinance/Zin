import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const useCheckAuth = (redirectToDashboard) => {
  const user = useSelector((state) => state.userReducer.user);
  const history = useHistory();

  if (redirectToDashboard) {
    if (user) {
      history.push("/");
    }
  } else if (!user) {
    history.push("/sign-in");
  }
};
