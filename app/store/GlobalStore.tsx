"use client";
import { create } from "zustand";
import zukeeper from "zukeeper";

import { GlobalState } from "./types";

const useGlobalStore = create<GlobalState>(
  zukeeper(
    // Apply zukeeper here
    (set) => ({
      name: "",
      activePage: "Home",
      breadcrumb1: "",
      breadcrumb2: "",
      user: null,
      general_settings: null,
      currency: null,
      maintenance: null,
      language: {},
      setMaintenance: (data) => set((state) => ({ maintenance: data })),
      setUserData: (data) => set((state) => ({ user: data })),
      setLanguage: (data) => set((state) => ({ language: data })),
      setCurrency: (data) => set((state) => ({ currency: data })),
      setBreadcrumb1: (data) => set((state) => ({ breadcrumb1: data })),
      setBreadcrumb2: (data) => set((state) => ({ breadcrumb2: data })),
      setActivePage: (data) => set((state) => ({ activePage: data })),
      setGeneralSettings: (data) =>
        set((state) => ({ general_settings: data })),
    }),
    {
      /* Your zukeeper configuration options here */
    }
  )
);

export default useGlobalStore;
