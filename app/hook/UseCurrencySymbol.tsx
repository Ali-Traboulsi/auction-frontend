"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function useCurrencySymbol() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  const curr = Cookies.get("default_currency");
  const parsed = curr ? JSON.parse(curr) : null;

  if (parsed) {
    return isClient ? parsed.currency.symbol : '$';
  } else {
    return "$";
  }
}

export default useCurrencySymbol;
