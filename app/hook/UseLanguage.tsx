"use client"
import useGlobalStore from "../store/GlobalStore";
import { useEffect, useState } from "react";

function useLanguage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])
  const store = useGlobalStore();

  function translate(text) {
    if (store.language[text]) {
      return isClient ? store.language[text] : text;
    } else {
      return text;
    }
  }

  return translate;
}

export default useLanguage;
