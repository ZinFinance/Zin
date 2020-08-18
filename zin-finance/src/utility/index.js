import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import bigDecimal from "js-big-decimal";

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

export const getPrettyValue = (value) => {
  return bigDecimal.getPrettyValue(new Number(value));
};
