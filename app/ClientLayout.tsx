"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import "react-multi-carousel/lib/styles.css";
import { theme } from "../theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import useGlobalStore from "./store/GlobalStore";
import Image from "next/image";
import LoadingGif from "./components/loader/LoadingGif";
import { FrontendPageSkeleton } from "./components/skeleton/skeleton";

import Maintenance from "./components/maintenance/Maintenance";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(false);

  const userData = Cookies.get("user_data");
  const store = useGlobalStore();
 

  // fetch categories
  const fetchLanguage = () => {
    setLoading(true);
    fetch(`${process.env.API_BASE_URL}/api/language/get-json`, {
      next: { revalidate: 0 },
    })
      .then((response) => response.json())
      .then((result) => {
        store.setLanguage(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  // fetch categories
  const fetchHeaderFooterData = () => {
    setLoading(true);
    fetch(`${process.env.API_BASE_URL}/api/all/menu-pages`, {
      next: { revalidate: 0 },
    })
      .then((response) => response.json())
      .then((result) => {
        store.setGeneralSettings(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  // fetch Maintainance
  const fetchMaintainance = () => {
    setLoading(true);
    fetch(`${process.env.API_BASE_URL}/api/settings/data`, {
      next: { revalidate: 0 },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("check result..", result);
        store.setMaintenance(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  // fetch currency
  const fetchCurrency = useCallback(() => {
    setLoading(true);
    fetch(`${process.env.API_BASE_URL}/api/all-currency/rate`, {
      next: { revalidate: 0 },
    })
      .then((response) => response.json())
      .then((result) => {
        store.setCurrency(result?.data);
        store.setBreadcrumb1(result?.breadcumb1);
        store.setBreadcrumb2(result?.breadcumb2);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMaintainance();
    fetchCurrency();
    fetchLanguage();
    fetchHeaderFooterData();
    if (userData) {
      store.setUserData(JSON.parse(userData));
    }
  }, []);


  return (
    <Suspense fallback={<FrontendPageSkeleton />}>
      <ThemeProvider value={theme}>
        {store.maintenance?.is_maintenance == 1 || store.maintenance?.is_maintenance == '1'
          ? <Maintenance />
          : children}
        <ToastContainer />
      </ThemeProvider>
    </Suspense>
  );

}
