"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useLanguage from "../../hook/UseLanguage";
import useGlobalStore from "../../store/GlobalStore";
import SubscribeSection from "../home/SubscribeSection";

export default function Footer() {
  const store = useGlobalStore();

  const t = useLanguage();
  return (
    <>
      <SubscribeSection />
      <div className="bg-auc-dark-color pt-[120px] overflow-hidden">
        <div className="auc-container">
          <div className="grid  min-768:grid-cols-12 pb-[60px]  gap-[30px] xl:gap-[60px]">
            <div className="md:col-span-8 lg:col-span-3 xl:col-span-4">
              <Link href={"/"} onClick={() => store.setActivePage("Home")}>
                {store?.general_settings?.logo && (
                  <Image
                    src={store?.general_settings?.logo}
                    width={300}
                    height={60}
                    alt="logo"
                    className="mb-[24px] w-[220px] h-[60px] object-contain"
                  />
                )}
              </Link>

              <p className="text-white leading-[170%] mb-[40px]">
                {store?.general_settings?.footer_text}
              </p>
              <div className="flex gap-[16px]">
                {store?.general_settings?.social_link &&
                  store?.general_settings?.social_link?.map((social, index) => (
                    <a
                      target="_blank"
                      key={index}
                      href={social?.url}
                      className="w-[48px] h-[48px] rounded-[4px] transition-all bg-auc-dark-color-1 flex justify-center items-center text-white hover:bg-white hover:text-auc-text-color"
                    >
                      <i className={`${social?.icon}`}></i>
                    </a>
                  ))}
              </div>
            </div>
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-2">
              <h4 className="leading-[130%] font-semibold capitalize text-white mb-[24px] border-b border-auc-secondary-color-700 pb-[6px] inline-block">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-[12px]">
                {store?.general_settings?.["footer-menu1"] &&
                  Object.entries(store?.general_settings?.["footer-menu1"]).map(
                    ([key, value]: [
                      string,
                      { title: string; href: string }
                    ]) => (
                      <li key={key}>
                        <Link
                          onClick={() => store.setActivePage(value?.title)}
                          className="text-white capitalize text-[16px] leading-[170%] transition-all hover:text-auc-primary-color"
                          href={value?.href}
                        >
                          {t(value?.title)}
                        </Link>
                      </li>
                    )
                  )}
              </ul>
            </div>
            <div className="md:col-span-6 lg:col-span-3 xl:col-span-3 xl:pl-8">
              <h4 className="leading-[130%] font-semibold capitalize text-white mb-[24px] border-b border-auc-secondary-color-700 pb-[6px] inline-block">
                Help & FAQ
              </h4>
              <ul className="flex flex-col  gap-[12px]">
                {store?.general_settings?.["footer-menu2"] &&
                  store?.general_settings?.["footer-menu2"]?.map((menu) => (
                    <li key={menu?.id}>
                      <Link
                        onClick={() => store.setActivePage(menu?.title)}
                        className="text-white capitalize text-[16px] leading-[170%] transition-all hover:text-auc-primary-color"
                        href={
                          menu?.slug == "about"
                            ? `/${menu?.slug}`
                            : `/pg/${menu?.slug}`
                        }
                      >
                        {t(menu?.title)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="md:col-span-6 lg:col-span-3 xl:col-span-3">
              <h4 className="leading-[130%] font-semibold capitalize text-white mb-[24px] border-b border-auc-secondary-color-700 pb-[6px] inline-block">
                Contact
              </h4>
              <ul className="flex flex-col gap-[17px]">
                <li>
                  <div className="flex items-center gap-[16px]">
                    <div>
                      <svg
                        className="inline-block"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="40" height="40" rx="4" fill="#002F2F" />
                        <path
                          d="M30.0447 25.52C29.3892 24.9702 25.5447 22.5357 24.9057 22.6475C24.6057 22.7007 24.3762 22.9565 23.762 23.6892C23.4779 24.0499 23.166 24.3877 22.829 24.6995C22.2116 24.5504 21.6139 24.3288 21.0485 24.0395C18.831 22.9599 17.0395 21.1679 15.9605 18.95C15.6712 18.3845 15.4496 17.7869 15.3005 17.1695C15.6123 16.8325 15.9501 16.5206 16.3107 16.2365C17.0427 15.6222 17.2992 15.3942 17.3525 15.0927C17.4642 14.4522 15.0275 10.6092 14.48 9.95375C14.2505 9.68225 14.042 9.5 13.775 9.5C13.001 9.5 9.5 13.829 9.5 14.39C9.5 14.4358 9.575 18.9425 15.2667 24.7332C21.0575 30.425 25.5642 30.5 25.61 30.5C26.171 30.5 30.5 26.999 30.5 26.225C30.5 25.958 30.3177 25.7495 30.0447 25.52Z"
                          fill="white"
                        />
                        <path
                          d="M25.25 19.25H26.75C26.7482 17.6592 26.1155 16.1342 24.9907 15.0093C23.8658 13.8845 22.3408 13.2518 20.75 13.25V14.75C21.9431 14.7512 23.087 15.2257 23.9307 16.0693C24.7743 16.913 25.2488 18.0569 25.25 19.25Z"
                          fill="white"
                        />
                        <path
                          d="M29 19.25H30.5C30.497 16.6651 29.4688 14.1868 27.641 12.359C25.8132 10.5312 23.3349 9.50298 20.75 9.5V11C22.9372 11.0026 25.0342 11.8726 26.5808 13.4192C28.1274 14.9658 28.9974 17.0628 29 19.25Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div>
                      {store?.general_settings?.phone &&
                        store?.general_settings?.phone.map((ph, index) => (
                          <a
                            key={index}
                            className="text-white block capitalize text-[16px] leading-[170%] transition-all hover:text-auc-primary-color"
                            href={`tel:${ph}`}
                          >
                            {ph}
                          </a>
                        ))}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-[16px]">
                    <div>
                      <svg
                        className="inline-block"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="40" height="40" rx="4" fill="#002F2F" />
                        <path
                          d="M28.25 13.25H11.75C10.5093 13.25 9.5 14.2593 9.5 15.5V24.5C9.5 25.7407 10.5093 26.75 11.75 26.75H28.25C29.4907 26.75 30.5 25.7407 30.5 24.5V15.5C30.5 14.2593 29.4907 13.25 28.25 13.25ZM29 24.5C29 24.9135 28.6635 25.25 28.25 25.25H11.75C11.3365 25.25 11 24.9135 11 24.5V17.5056L19.6444 22.1603C19.7554 22.22 19.8777 22.25 20 22.25C20.1223 22.25 20.2446 22.22 20.3556 22.1603L29 17.5056V24.5ZM29 15.8021L20 20.6482L11 15.8021V15.5C11 15.0865 11.3365 14.75 11.75 14.75H28.25C28.6635 14.75 29 15.0865 29 15.5V15.8021Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div>
                      {store?.general_settings?.email &&
                        store?.general_settings?.email.map((email, index) => (
                          <a
                            key={index}
                            className="text-white block capitalize text-[16px] leading-[170%] transition-all hover:text-auc-primary-color"
                            href={`mailto:${email}`}
                          >
                            {email}
                          </a>
                        ))}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-[16px]">
                    <div>
                      <svg
                        className="inline-block"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="40" height="40" rx="4" fill="#002F2F" />
                        <path
                          d="M24.0067 23.8571C26.5606 19.8496 26.2395 20.3496 26.3131 20.2451C27.2429 18.9336 27.7344 17.3901 27.7344 15.7812C27.7344 11.5147 24.2721 8 20 8C15.7418 8 12.2656 11.5078 12.2656 15.7812C12.2656 17.3891 12.7674 18.973 13.7277 20.3022L15.9932 23.8572C13.571 24.2294 9.45312 25.3387 9.45312 27.7812C9.45312 28.6716 10.0343 29.9405 12.8029 30.9293C14.7361 31.6197 17.2921 32 20 32C25.0637 32 30.5469 30.5716 30.5469 27.7812C30.5469 25.3383 26.4339 24.2301 24.0067 23.8571ZM14.9023 19.5287C14.8946 19.5166 14.8865 19.5048 14.8781 19.4931C14.079 18.3938 13.6719 17.091 13.6719 15.7812C13.6719 12.2648 16.5034 9.40625 20 9.40625C23.4893 9.40625 26.3281 12.266 26.3281 15.7812C26.3281 17.0931 25.9287 18.3517 25.1728 19.4221C25.1051 19.5114 25.4585 18.9624 20 27.5276L14.9023 19.5287ZM20 30.5938C14.469 30.5938 10.8594 28.968 10.8594 27.7812C10.8594 26.9836 12.7141 25.6721 16.8241 25.1609L19.407 29.2138C19.5361 29.4164 19.7597 29.5391 20 29.5391C20.2402 29.5391 20.4638 29.4164 20.5929 29.2138L23.1757 25.1609C27.2858 25.6721 29.1406 26.9836 29.1406 27.7812C29.1406 28.9579 25.5635 30.5938 20 30.5938Z"
                          fill="white"
                        />
                        <path
                          d="M20 12.2656C18.0615 12.2656 16.4844 13.8427 16.4844 15.7812C16.4844 17.7198 18.0615 19.2969 20 19.2969C21.9385 19.2969 23.5156 17.7198 23.5156 15.7812C23.5156 13.8427 21.9385 12.2656 20 12.2656ZM20 17.8906C18.8369 17.8906 17.8906 16.9444 17.8906 15.7812C17.8906 14.6181 18.8369 13.6719 20 13.6719C21.1631 13.6719 22.1094 14.6181 22.1094 15.7812C22.1094 16.9444 21.1631 17.8906 20 17.8906Z"
                          fill="white"
                        />
                      </svg>
                    </div>

                    <span className="text-white capitalize text-[16px] leading-[170%] transition-all hover:text-auc-primary-color">
                      {store?.general_settings?.address}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center border-t border-t-[#6B788E] py-[48px]">
          <p className="text-white">
            <span
              dangerouslySetInnerHTML={{
                __html: store?.general_settings?.copyright,
              }}
            ></span>
          </p>
        </div>
      </div>
    </>
  );
}
