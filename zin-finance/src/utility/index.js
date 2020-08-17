import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export const useCheckEmailVerified = () => {
  const emailVerified = useSelector((state) => state.userReducer.emailVerified);
  return {
    disabled: !emailVerified ? true : null,
    style: !emailVerified ? { cursor: "not-allowed" } : null,
  };
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
