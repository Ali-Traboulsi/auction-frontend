"use client";
import React from "react";
import useLanguage from "../hook/UseLanguage";

interface ITitleBox {
  delay: string;
  title: string;
  cls: string;
}

export default function TitleBoxTwo({ delay, title, cls }: ITitleBox) {
  const t = useLanguage();
  return (
    <h2
      suppressHydrationWarning
      data-wow-delay={delay}
      className={`wow fadeInUp ${cls}`}
    >
      {t(title)}
    </h2>
  );
}
