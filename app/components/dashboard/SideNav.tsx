"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { sidebarMenusList } from "./Data";
import useLanguage from "../../hook/UseLanguage";
import useGlobalStore from "../../store/GlobalStore";

const SideNav = ({ cls }: { cls?: string }) => {
  const correntRoute = usePathname();
  const [open, setOpen] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(true);
  const router = useRouter();
  const store = useGlobalStore();
  const t = useLanguage();

  const handleOpen = (value, lable) => {
    const levelWithoutSpaces = lable?.split(" ")?.join("");

    setOpen((prevOpen) => ({
      [levelWithoutSpaces]: prevOpen[levelWithoutSpaces] === value ? 0 : value,
    }));
  };

  return (
    <div
      className={`max-h-screen overflow-scroll scrollbar-hidden  bg-auc-white-color auc-dashboard-sidebar-shadow ${cls}`}
    >
      <List className="p-0">
        {sidebarMenusList.map((menu, index) => {
          if (menu.has_submenu) {
            const key = menu.lable?.split(" ")?.join("");
            return (
              <Accordion
                key={index}
                open={open[key] === 1}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={`${
                      correntRoute.includes(menu.link_to) ? "white" : "#3A4B68"
                    }`}
                    className={`mx-auto transition-transform ${
                      open[key] === 1 ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M18.7101 8.2101C18.6171 8.11638 18.5065 8.04198 18.3846 7.99121C18.2628 7.94044 18.1321 7.91431 18.0001 7.91431C17.868 7.91431 17.7373 7.94044 17.6155 7.99121C17.4936 8.04198 17.383 8.11638 17.2901 8.2101L12.7101 12.7901C12.6171 12.8838 12.5065 12.9582 12.3846 13.009C12.2628 13.0598 12.1321 13.0859 12.0001 13.0859C11.868 13.0859 11.7373 13.0598 11.6155 13.009C11.4936 12.9582 11.383 12.8838 11.2901 12.7901L6.71006 8.2101C6.6171 8.11638 6.5065 8.04198 6.38464 7.99121C6.26278 7.94044 6.13207 7.91431 6.00006 7.91431C5.86805 7.91431 5.73734 7.94044 5.61548 7.99121C5.49362 8.04198 5.38302 8.11638 5.29006 8.2101C5.10381 8.39747 4.99927 8.65092 4.99927 8.9151C4.99927 9.17929 5.10381 9.43274 5.29006 9.6201L9.88006 14.2101C10.4426 14.7719 11.2051 15.0875 12.0001 15.0875C12.7951 15.0875 13.5576 14.7719 14.1201 14.2101L18.7101 9.6201C18.8963 9.43274 19.0009 9.17929 19.0009 8.9151C19.0009 8.65092 18.8963 8.39747 18.7101 8.2101Z" />
                  </svg>
                }
              >
                <ListItem
                  suppressHydrationWarning
                  data-wow-delay={`${index !== 0 && "0.2s"}`}
                  className="px-0 py-0 wow fadeInUp"
                  selected={open[key] === 1}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(1, menu.lable)}
                    className={` w-full rounded-[6px] border-b-0 px-[24px] py-[18px] ${
                      correntRoute.includes(menu.link_to) &&
                      "bg-auc-primary-color"
                    }`}
                  >
                    <ListItemPrefix>
                      <span
                        className={`${
                          correntRoute.includes(menu.link_to) &&
                          "svgWraperOfActiveRoute"
                        }`}
                      >
                        {menu.icon}
                      </span>
                    </ListItemPrefix>

                    <span
                      className={`text-[18px] mr-auto text-auc-gray-color ${
                        correntRoute.includes(menu.link_to) && "!text-white"
                      } leading-[120%] font-regular capitalize`}
                    >
                      {t(menu.lable)}
                    </span>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-0">
                  <List className="ml-[40px] gap-0 p-0">
                    {menu.submenu.map((item, index) => (
                      <ListItem
                        key={index}
                        className={` rounded-none p-0 border-l ${
                          correntRoute === item.link_to
                            ? "!text-auc-primary-color !border-auc-primary-color"
                            : "!text-auc-gray-color !border-auc-gray-color"
                        }`}
                      >
                        <Link
                          className="px-[32px] py-[13px] w-full block"
                          key={index}
                          href={item.link_to}
                        >
                          {t(item.level)}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </AccordionBody>
              </Accordion>
            );
          }

          return (
            <ListItem
              key={index}
              suppressHydrationWarning
              data-wow-delay={`${index !== 0 && "0.2s"}`}
              className="block p-0 wow fadeInUp"
            >
              <Link
                className={`flex items-center gap-[16px] px-[24px] py-[18px] rounded-[6px] ${
                  menu.link_to === correntRoute &&
                  "bg-auc-primary-color text-white"
                }`}
                href={menu.link_to}
              >
                <span
                  className={`${
                    menu.link_to === correntRoute && "svgWraperOfActiveRoute"
                  }`}
                >
                  {menu.icon}
                </span>
                <span className="text-[18px]  leading-[120%] font-regular capitalize">
                  {t(menu.lable)}
                </span>
              </Link>
            </ListItem>
          );
        })}

        <ListItem
          key={`logout`}
          suppressHydrationWarning
          data-wow-delay={`0.2s`}
          className="block p-0 wow fadeInUp"
        >
          <button
            className={`flex items-center gap-[16px] px-[24px] py-[18px] rounded-[6px] `}
            onClick={() => {
              Cookies.remove("user_token");
              Cookies.remove("user_data");
              store.setUserData(null);
              router.replace("/login");
              router.refresh();
            }}
          >
            <span className={``}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#6B788E"
              >
                <g clipPath="url(#clip0_2298_2048)">
                  <path d="M12 0C9.62663 0 7.30655 0.703787 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.00519945 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9962 8.81855 22.7308 5.76849 20.4811 3.51886C18.2315 1.26924 15.1814 0.00375324 12 0ZM10.9091 18.5455H8.72728C7.8593 18.5455 7.02686 18.2006 6.41311 17.5869C5.79935 16.9731 5.45455 16.1407 5.45455 15.2727V8.72727C5.45455 7.85929 5.79935 7.02686 6.41311 6.4131C7.02686 5.79935 7.8593 5.45454 8.72728 5.45454H10.9091C11.1984 5.45454 11.4759 5.56948 11.6805 5.77406C11.8851 5.97865 12 6.25613 12 6.54545C12 6.83478 11.8851 7.11226 11.6805 7.31684C11.4759 7.52143 11.1984 7.63636 10.9091 7.63636H8.72728C8.43795 7.63636 8.16047 7.7513 7.95589 7.95588C7.7513 8.16047 7.63637 8.43794 7.63637 8.72727V15.2727C7.63637 15.5621 7.7513 15.8395 7.95589 16.0441C8.16047 16.2487 8.43795 16.3636 8.72728 16.3636H10.9091C11.1984 16.3636 11.4759 16.4786 11.6805 16.6832C11.8851 16.8877 12 17.1652 12 17.4545C12 17.7439 11.8851 18.0213 11.6805 18.2259C11.4759 18.4305 11.1984 18.5455 10.9091 18.5455ZM18.2258 12.7713L16.044 14.9531C15.8383 15.1518 15.5627 15.2618 15.2767 15.2593C14.9906 15.2568 14.717 15.1421 14.5147 14.9398C14.3125 14.7375 14.1978 14.4639 14.1953 14.1779C14.1928 13.8919 14.3027 13.6163 14.5015 13.4105L14.8211 13.0909H9.81818C9.52886 13.0909 9.25138 12.976 9.0468 12.7714C8.84221 12.5668 8.72728 12.2893 8.72728 12C8.72728 11.7107 8.84221 11.4332 9.0468 11.2286C9.25138 11.024 9.52886 10.9091 9.81818 10.9091H14.8211L14.5015 10.5895C14.3027 10.3837 14.1928 10.1081 14.1953 9.82211C14.1978 9.53607 14.3125 9.26246 14.5147 9.0602C14.717 8.85793 14.9906 8.7432 15.2767 8.74072C15.5627 8.73823 15.8383 8.84819 16.044 9.04691L18.2258 11.2287C18.4303 11.4333 18.5452 11.7107 18.5452 12C18.5452 12.2893 18.4303 12.5667 18.2258 12.7713Z" />
                </g>
                <defs>
                  <clipPath id="clip0_2298_2048">
                    <rect width="24" height="24" fill="white" />
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
  );
};

export default SideNav;
