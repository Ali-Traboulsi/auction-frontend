import React, { Suspense } from "react";
import Image from "next/image";
import { TableSkeleton } from "../skeleton/skeleton";
import BreadCrumb from "../BreadCrumb";
import ContactInfo from "./ContactInfo";
import ContactForm from "../forms/ContactForm";

async function getContactData() {
  const requestOptions = {
    method: "GET",
    next: { revalidate: 0 },
  };

  // const queryParams = new URLSearchParams(searchParams).toString();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/contact`,
    requestOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default async function ContactPage() {
  const contact_data = await getContactData();
  return (
    <>
      <Suspense fallback={<TableSkeleton />}>
        <BreadCrumb currentPage={"Contact page"} />
        <div className="auc-container mt-[80px] mb-[120px]">
          <div className="grid lg:grid-cols-12 gap-[60px]">
            {contact_data && (
              <div className="lg:col-span-6">
                <ContactInfo contact_data={contact_data} />
              </div>
            )}
            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
