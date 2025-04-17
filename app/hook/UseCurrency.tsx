"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function useCurrency() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])



  const curr = Cookies.get("default_currency");
  let parsed;
  if (curr) {
    try {
      parsed = JSON.parse(curr);
    } catch (error) {
      console.error("Error parsing currency:", error);
      parsed = { rate: 1 }; // Default to a rate of 1 if parsing fails
    }
  }

  function convert(amount) {

    if(!isClient) return amount;

    if (parsed && !isNaN(parsed.rate)) {
      const converted_amount = amount * Number(parsed.rate);
      // Round the converted amount to two decimal places
      const rounded_amount = parseFloat(converted_amount.toFixed(2));
      return  rounded_amount ;
    } else {
      return amount; // Return original amount if rate is NaN or not available
    }
  }

  return convert;
}

export default useCurrency;

