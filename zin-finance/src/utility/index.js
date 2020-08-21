import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import bigDecimal from "js-big-decimal";
import price from "crypto-price";

export const useCheckEmailVerified = () => {
  const emailVerified = useSelector(
    (state) => state.userReducer.user.isEmailVerified
  );
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
  return bigDecimal.getPrettyValue(parseFloat(Number(value).toFixed(2)));
};

export const useEthToUSDValue = () => {
  const [ethToUSDValue, setETHtoUSDValue] = useState(400);
  const getEthValue = async () => {
    let ethValue = await price.getCryptoPrice("USD", "ETH");
    setETHtoUSDValue(getPrettyValue(ethValue.price));
  };
  getEthValue();
  return ethToUSDValue;
};
