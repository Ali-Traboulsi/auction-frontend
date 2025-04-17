"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Drawer, List, ListItem } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "../buttons/Button";
import { truncateString } from "../../helpers/helpers";
import useGlobalStore from "../../store/GlobalStore";
import useLanguage from "../../hook/UseLanguage";
import NiceSelect from "../NiceSelect/NiceSelect";
import { RxHamburgerMenu } from "react-icons/rx";
import SideNav from "../dashboard/SideNav";
import { userMenusList } from "../layout/Data";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const currentRoute = usePathname();
  const userDropdownRef = useRef(null);
  const router = useRouter();
  const store = useGlobalStore();
  const t = useLanguage();
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [store.user]);

  const currencyOptions =
    store.currency &&
    store.currency.map((cur, index) => {
      return {
        value: cur.id,
        label: cur.code,
      };
    });

  const getDefaultCurrecny = () => {
    const initial_dc = Cookies.get("default_currency");
    const initial_dc_converted = initial_dc ? JSON.parse(initial_dc) : null;

    if (initial_dc_converted?.currency?.id) {
      return initial_dc_converted?.currency?.id;
    } else {
      return currencyOptions[0].value;
    }
  };

  const handleDefaultCurrency = (e) => {
    setloading(true);
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `${process.env.API_BASE_URL}/api/currency/rate/${e.value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Cookies.set("default_currency", JSON.stringify(result.data));
        setloading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
        setloading(false);
      });
  };

  const CurrencySelector = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (!currencyOptions) return null;
    return (
      <div className={`w-[100px] ${isMobile && "h-[48px]"}`}>
        <NiceSelect
          options={currencyOptions}
          defaultValue={getDefaultCurrecny()}
          onChange={handleDefaultCurrency}
          wrapperClass={`z-[999] w-[100px] block ${isMobile && "!h-[48px]"}`}
          selected_current_cls="w-[100px]"
        />
      </div>
    );
  };


  return (
    <>
      <div className="col-span-8 min-576:col-span-4 min-992:col-span-3">
        <Link onClick={() => store.setActivePage("Home")} href="/">
          {store?.general_settings?.logo && (
            <Image
              src={store?.general_settings?.logo}
              width={300}
              height={60}
              alt="logo"
              className="w-[220px] h-[60px] object-contain"
            />
          )}
        </Link>
      </div>

      {/* main menu start */}
      <div className="min-992:col-span-5 h-full hidden min-992:block">
        <ul className="flex items-center justify-center h-full">
          {store?.general_settings?.menupage && (
            <>
              {Object.entries(store?.general_settings?.menupage).length === 5 ? (
                // Render all 5 menu items if length is exactly 5
                Object.entries(store?.general_settings?.menupage).map(([key, value]) => (
                  <li
                    key={key}
                    className={`text-[18px] h-full flex items-center transition-all font-medium hover:text-auc-primary-color leading-[28.8px] capitalize mr-[20px] min-1200:mr-[40px] last:mr-0 ${store?.activePage === value.title && "text-auc-primary-color"
                      }`}
                  >
                    <Link
                      onClick={() => store.setActivePage(value.title)}
                      className="capitalize"
                      href={value.href}
                    >
                      {t(value.title)}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  {/* Render the first 4 menu items */}
                  {Object.entries(store?.general_settings?.menupage)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <li
                        key={key}
                        className={`text-[18px] h-full flex items-center transition-all font-medium hover:text-auc-primary-color leading-[28.8px] capitalize mr-[20px] min-1200:mr-[40px] last:mr-0 ${store?.activePage === value.title && "text-auc-primary-color"
                          }`}
                      >
                        <Link
                          onClick={() => store.setActivePage(value.title)}
                          className="capitalize"
                          href={value.href}
                        >
                          {t(value.title)}
                        </Link>
                      </li>
                    ))}

                  {/* Render "Pages" dropdown if there are more than 4 items */}
                  {Object.entries(store?.general_settings?.menupage).length > 4 && (
                    <li className="relative group">
                      {/* Pages menu */}
                      <div
                        className={`text-[18px] h-full flex items-center transition-all font-medium leading-[28.8px] capitalize mr-[20px] min-1200:mr-[40px] last:mr-0 cursor-pointer ${Object.entries(store?.general_settings?.menupage)
                          .slice(4)
                          .some(([, value]) => store?.activePage === value.title)
                          ? "text-auc-primary-color"
                          : "group-hover:text-auc-primary-color"
                          }`}
                      >
                        {t("Pages")}
                      </div>

                      {/* Dropdown menu */}
                      <ul className="absolute hidden group-hover:block bg-white shadow-lg py-2 rounded-md z-50">
                        {Object.entries(store?.general_settings?.menupage)
                          .slice(4)
                          .map(([key, value]) => (
                            <li
                              key={key}
                              className={`px-4 py-2 hover:bg-gray-100 ${store?.activePage === value.title &&
                                "text-auc-primary-color"
                                }`}
                            >
                              <Link
                                onClick={() => store.setActivePage(value.title)}
                                className="capitalize"
                                href={value.href}
                              >
                                {t(value.title)}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  )}
                </>
              )}
            </>
          )}




        </ul>
      </div>
      {/* main menu end */}

      {/* select currency & user login */}
      <div className="col-span-4 min-576:col-span-8 min-992:col-span-4 flex justify-end gap-4 items-center">
        <div className="hidden min-576:block">
          <CurrencySelector />
        </div>
        {/* user dropdown start */}
        {store.user && (
          <div
            ref={userDropdownRef}
            onClick={() =>
              setIsDropdownOpen((isOpen) => (isOpen ? false : true))
            }
            className="relative cursor-pointer group  py-[8px] flex-grow-2 hidden min-992:block"
          >
            <div className="flex items-center justify-between px-[16px] py-[12px] rounded-[8px] w-[193px] ml-auto bg-auc-primary-color-300">
              <span
                className="rounded-[50%] border border-auc-primary-color w-[38px] h-[38px] bg-cover bg-center bg-no-repeat bg-lightgray"
                style={{
                  backgroundImage: `url("${store.user?.profile_photo}")`,
                }}
              />
              <span className="text-[16px] leading-[24px] capitalize">
                {truncateString(store.user?.name, 15)}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={`${isDropdownOpen && "rotate-180"} transition-all`}
              >
                <path
                  d="M18.7098 8.2101C18.6169 8.11638 18.5063 8.04198 18.3844 7.99121C18.2625 7.94044 18.1318 7.91431 17.9998 7.91431C17.8678 7.91431 17.7371 7.94044 17.6152 7.99121C17.4934 8.04198 17.3828 8.11638 17.2898 8.2101L12.7098 12.7901C12.6169 12.8838 12.5063 12.9582 12.3844 13.009C12.2625 13.0598 12.1318 13.0859 11.9998 13.0859C11.8678 13.0859 11.7371 13.0598 11.6152 13.009C11.4934 12.9582 11.3828 12.8838 11.2898 12.7901L6.70982 8.2101C6.61685 8.11638 6.50625 8.04198 6.38439 7.99121C6.26253 7.94044 6.13183 7.91431 5.99982 7.91431C5.8678 7.91431 5.7371 7.94044 5.61524 7.99121C5.49338 8.04198 5.38278 8.11638 5.28982 8.2101C5.10356 8.39747 4.99902 8.65092 4.99902 8.9151C4.99902 9.17929 5.10356 9.43274 5.28982 9.6201L9.87982 14.2101C10.4423 14.7719 11.2048 15.0875 11.9998 15.0875C12.7948 15.0875 13.5573 14.7719 14.1198 14.2101L18.7098 9.6201C18.8961 9.43274 19.0006 9.17929 19.0006 8.9151C19.0006 8.65092 18.8961 8.39747 18.7098 8.2101Z"
                  fill="#6B788E"
                />
              </svg>
            </div>
            <List
              className={` [&>div]:rounded-none z-30 p-0 overflow-hidden w-[250px] gap-0 absolute opacity-0 invisible transition-all ease-in-out duration-500  top-[88px] right-0 bg-auc-white-color rounded-[8px]
            ${isDropdownOpen && "flex visible opacity-100"} 
          `}
              style={{
                boxShadow: "0px 0px 40px 20px rgba(0, 0, 0, 0.12)",
              }}
            >
              {userMenusList.map((menu, index) => {
                return (
                  <ListItem key={index} className="block p-0">
                    <Link
                      onClick={() => store.setActivePage(menu?.lable)}
                      className={`flex items-center gap-[16px] px-[24px] py-[18px]  ${menu?.link_to === currentRoute &&
                        "bg-auc-primary-color text-white"
                        }`}
                      href={menu?.link_to}
                    >
                      <span
                        className={`${menu?.link_to === currentRoute &&
                          "svgWraperOfActiveRoute"
                          }`}
                      >
                        {menu?.icon}
                      </span>
                      <span className="text-[18px]  leading-[120%] font-regular capitalize">
                        {t(menu?.lable)}
                      </span>
                    </Link>
                  </ListItem>
                );
              })}
              <ListItem key={`log-out`} className="block p-0">
                <button
                  onClick={() => {
                    Cookies.remove("user_token");
                    Cookies.remove("user_data");
                    store.setUserData(null);
                    router.replace("/login");
                    router.refresh();
                    store.setActivePage("Login");
                  }}
                  className="flex items-center gap-[16px] px-[24px] py-[18px]"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#6B788E"
                    >
                      <g clipPath="url(#clip0_1547_9950)">
                        <path d="M12 0C9.62663 0 7.30655 0.703787 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.00519945 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9962 8.81855 22.7308 5.76849 20.4811 3.51886C18.2315 1.26924 15.1814 0.00375324 12 0ZM10.9091 18.5455H8.72728C7.8593 18.5455 7.02686 18.2006 6.41311 17.5869C5.79935 16.9731 5.45455 16.1407 5.45455 15.2727V8.72727C5.45455 7.85929 5.79935 7.02686 6.41311 6.4131C7.02686 5.79935 7.8593 5.45454 8.72728 5.45454H10.9091C11.1984 5.45454 11.4759 5.56948 11.6805 5.77406C11.8851 5.97865 12 6.25613 12 6.54545C12 6.83478 11.8851 7.11226 11.6805 7.31684C11.4759 7.52143 11.1984 7.63636 10.9091 7.63636H8.72728C8.43795 7.63636 8.16047 7.7513 7.95589 7.95588C7.7513 8.16047 7.63637 8.43794 7.63637 8.72727V15.2727C7.63637 15.5621 7.7513 15.8395 7.95589 16.0441C8.16047 16.2487 8.43795 16.3636 8.72728 16.3636H10.9091C11.1984 16.3636 11.4759 16.4786 11.6805 16.6832C11.8851 16.8877 12 17.1652 12 17.4545C12 17.7439 11.8851 18.0213 11.6805 18.2259C11.4759 18.4305 11.1984 18.5455 10.9091 18.5455ZM18.2258 12.7713L16.044 14.9531C15.8383 15.1518 15.5627 15.2618 15.2767 15.2593C14.9906 15.2568 14.717 15.1421 14.5147 14.9398C14.3125 14.7375 14.1978 14.4639 14.1953 14.1779C14.1928 13.8919 14.3027 13.6163 14.5015 13.4105L14.8211 13.0909H9.81818C9.52886 13.0909 9.25138 12.976 9.0468 12.7714C8.84221 12.5668 8.72728 12.2893 8.72728 12C8.72728 11.7107 8.84221 11.4332 9.0468 11.2286C9.25138 11.024 9.52886 10.9091 9.81818 10.9091H14.8211L14.5015 10.5895C14.3027 10.3837 14.1928 10.1081 14.1953 9.82211C14.1978 9.53607 14.3125 9.26246 14.5147 9.0602C14.717 8.85793 14.9906 8.7432 15.2767 8.74072C15.5627 8.73823 15.8383 8.84819 16.044 9.04691L18.2258 11.2287C18.4303 11.4333 18.5452 11.7107 18.5452 12C18.5452 12.2893 18.4303 12.5667 18.2258 12.7713Z" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1547_9950">
                          <rect width="24" height="24" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span className="text-[18px]  leading-[120%] font-regular capitalize">
                    {t("Log out")}
                  </span>
                </button>
              </ListItem>
            </List>
          </div>
        )}

        {!store.user && (
          <div className="justify-end hidden min-992:flex">
            <Button
              text={"Login"}
              styles={"auc-btn-primary"}
              href="/login"
              isLink={true}
            />
          </div>
        )}

        {/* mobile menu trigger */}
        <div className="min-992:hidden ">
          <button
            onClick={openDrawer}
            className="p-[10px]  ms-4 gap-8px flex-shrink-[0] align-middle bg-auc-primary-color hover:bg-auc-primary-color-900 rounded-[8px] text-white capitalize"
          >
            <RxHamburgerMenu className="w-[35px] h-[35px]" />
          </button>
        </div>
      </div>

      {/* mobile sidebar menu */}
      <Drawer open={open} onClose={closeDrawer} className="p-[20px]">
        <div className="mb-2 flex items-start justify-between">
          {store?.general_settings?.logo && (
            <Image
              src={store?.general_settings?.logo}
              width={200}
              height={60}
              alt="logo"
              className="w-[220px] h-[60px] object-contain"
            />
          )}
          <button
            onClick={closeDrawer}
            className="p-[10px]  ms-4 gap-8px flex-shrink-[0] align-middle bg-auc-primary-color hover:bg-auc-primary-color-900 rounded-[8px] text-white capitalize"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-[24px] w-[24px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {currentRoute.includes("/dashboard") ? (
          <SideNav cls="pt-[20px] pb-[120px]" />
        ) : (
          <div>
            {store?.general_settings?.menupage && (
              <List className="flex flex-col justify-center">
                {Object.entries(store?.general_settings?.menupage).map(
                  ([key, menu]: [string, { title: string; href: string }]) => (
                    <ListItem
                      key={key}
                      className={`text-[18px] transition-all font-medium hover:text-auc-primary-color leading-[28.8px] capitalize mr-[20px] xl:mr-[40px] last:mr-0 `}
                    >
                      <Link
                        onClick={() => store.setActivePage(menu.title)}
                        className="captitalize"
                        href={menu.href}
                      >
                        {t(menu.title)}
                      </Link>
                    </ListItem>
                  )
                )}
              </List>
            )}
            <div className="flex items-center gap-4">
              {!store?.user && (
                <div className="justify-end ">
                  <Button
                    text={"Login"}
                    styles={"auc-btn-primary !px-[20px]"}
                    href="/login"
                    isLink={true}
                  />
                </div>
              )}
              {store?.user && (
                <div className="justify-end">
                  <Button
                    text={"Dashboard"}
                    styles={"auc-btn-primary !px-[20px]"}
                    href="/dashboard"
                    isLink={true}
                  />
                </div>
              )}
              <div className="min-576:hidden ">
                <CurrencySelector isMobile={true} />
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
