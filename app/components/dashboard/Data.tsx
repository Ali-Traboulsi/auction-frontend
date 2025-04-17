export const sidebarMenusList = [
  {
    id: 0,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <path d="M22.0604 0H14.9509C13.8797 0 13.0112 0.868428 13.0112 1.93969V9.04922C13.0112 10.1205 13.8797 10.9889 14.9509 10.9889H22.0604C23.1317 10.9889 24.0001 10.1205 24.0001 9.04922V1.93969C24.0001 0.868428 23.1317 0 22.0604 0Z" />
        <path d="M9.04922 0H1.93969C0.868428 0 0 0.868428 0 1.93969V9.04922C0 10.1205 0.868428 10.9889 1.93969 10.9889H9.04922C10.1205 10.9889 10.9889 10.1205 10.9889 9.04922V1.93969C10.9889 0.868428 10.1205 0 9.04922 0Z" />
        <path d="M22.0604 13.011H14.9509C13.8797 13.011 13.0112 13.8794 13.0112 14.9507V22.0602C13.0112 23.1315 13.8797 23.9999 14.9509 23.9999H22.0604C23.1317 23.9999 24.0001 23.1315 24.0001 22.0602V14.9507C24.0001 13.8794 23.1317 13.011 22.0604 13.011Z" />
        <path d="M9.04922 13.011H1.93969C0.868428 13.011 0 13.8794 0 14.9507V22.0602C0 23.1315 0.868428 23.9999 1.93969 23.9999H9.04922C10.1205 23.9999 10.9889 23.1315 10.9889 22.0602V14.9507C10.9889 13.8794 10.1205 13.011 9.04922 13.011Z" />
      </svg>
    ),
    lable: "Dashboard",
    link_to: "/dashboard",
    has_submenu: false,
    submenu: [],
  },
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <g clipPath="url(#clip0_1547_9748)">
          <path d="M24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76515 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 11.7727 0.0903058 11.5547 0.251051 11.3939C0.411797 11.2332 0.629814 11.1429 0.857143 11.1429C1.08447 11.1429 1.30249 11.2332 1.46323 11.3939C1.62398 11.5547 1.71429 11.7727 1.71429 12C1.71085 14.2955 2.47423 16.5263 3.88325 18.3385C5.29227 20.1506 7.26619 21.4402 9.49172 22.0026C11.7172 22.565 14.0668 22.3679 16.1676 21.4427C18.2683 20.5174 19.9998 18.917 21.0873 16.8954C22.1747 14.8739 22.5558 12.547 22.17 10.2842C21.7843 8.02135 20.6537 5.9522 18.9579 4.40516C17.262 2.85812 15.098 1.92184 12.8094 1.74491C10.5207 1.56799 8.23855 2.16056 6.32509 3.42858H6.85714C7.08447 3.42858 7.30249 3.51888 7.46323 3.67963C7.62398 3.84037 7.71428 4.05839 7.71428 4.28572C7.71428 4.51305 7.62398 4.73107 7.46323 4.89181C7.30249 5.05256 7.08447 5.14286 6.85714 5.14286H4.28571C4.17313 5.14293 4.06165 5.1208 3.95762 5.07775C3.8536 5.03469 3.75908 4.97156 3.67948 4.89195C3.59987 4.81235 3.53674 4.71783 3.49369 4.61381C3.45063 4.50979 3.42851 4.3983 3.42857 4.28572V1.71429C3.42857 1.48696 3.51888 1.26895 3.67962 1.1082C3.84037 0.947455 4.05838 0.857149 4.28571 0.857149C4.51304 0.857149 4.73106 0.947455 4.8918 1.1082C5.05255 1.26895 5.14286 1.48696 5.14286 1.71429V2.15479C6.94181 0.900946 9.05 0.164122 11.2383 0.0243874C13.4267 -0.115347 15.6115 0.347355 17.5553 1.36221C19.4991 2.37707 21.1276 3.90526 22.2638 5.78073C23.4 7.6562 24.0005 9.8072 24 12ZM19.7143 12C19.7143 13.5257 19.2618 15.0172 18.4142 16.2858C17.5665 17.5544 16.3617 18.5432 14.9521 19.1271C13.5425 19.7109 11.9914 19.8637 10.495 19.5661C8.99859 19.2684 7.62404 18.5337 6.54517 17.4548C5.46631 16.376 4.7316 15.0014 4.43394 13.505C4.13628 12.0086 4.28905 10.4575 4.87293 9.04787C5.4568 7.63827 6.44556 6.43347 7.71417 5.58581C8.98278 4.73815 10.4743 4.28572 12 4.28572C14.0453 4.28795 16.0061 5.10142 17.4524 6.54765C18.8986 7.99387 19.712 9.95473 19.7143 12ZM15.0469 13.0011L12.8571 11.5413V7.71429C12.8571 7.48696 12.7668 7.26894 12.6061 7.1082C12.4453 6.94745 12.2273 6.85715 12 6.85715C11.7727 6.85715 11.5547 6.94745 11.3939 7.1082C11.2332 7.26894 11.1429 7.48696 11.1429 7.71429V12C11.1429 12.1411 11.1777 12.28 11.2443 12.4044C11.3109 12.5288 11.4072 12.6349 11.5245 12.7131L14.096 14.4274C14.2851 14.5509 14.5154 14.5947 14.7367 14.5493C14.9579 14.504 15.1523 14.3731 15.2776 14.1851C15.4029 13.9972 15.449 13.7674 15.4058 13.5457C15.3626 13.324 15.2336 13.1283 15.0469 13.0011Z" />
        </g>
        <defs>
          <clipPath id="clip0_1547_9748">
            <rect width="24" height="24" />
          </clipPath>
        </defs>
      </svg>
    ),
    lable: "Bidding History",
    link_to: "/dashboard/bidding-history",
    has_submenu: false,
    submenu: [],
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="#6B788E"
      >
        <path d="M10 18.375C15.04 18.375 19.1406 14.2275 19.1406 9.1875C19.1406 4.1475 15.04 0 10 0C4.96 0 0.859375 4.1475 0.859375 9.1875C0.859375 14.2275 4.96 18.375 10 18.375ZM5.31916 7.66589C5.40222 7.41183 5.62197 7.22644 5.887 7.188L8.293 6.8385L9.36967 4.65773C9.60588 4.17708 10.3941 4.17708 10.6304 4.65773L11.707 6.8385L14.113 7.188C14.3781 7.22644 14.5978 7.41183 14.6809 7.66589C14.7633 7.92066 14.6946 8.20008 14.503 8.38688L12.7617 10.085L13.1724 12.4821C13.2177 12.7457 13.1092 13.0122 12.8929 13.1701C12.6745 13.3274 12.3884 13.3474 12.152 13.223L10 12.0913L7.84806 13.2229C7.61186 13.3479 7.32555 13.3266 7.10716 13.17C6.89087 13.0121 6.78236 12.7457 6.82769 12.482L7.23831 10.0849L5.497 8.38683C5.30542 8.20013 5.23675 7.92066 5.31916 7.66589Z" />
        <path d="M8.68649 9.95793L8.45441 11.3154L9.6725 10.6748C9.77549 10.6205 9.88743 10.5937 10 10.5937C10.1126 10.5937 10.2246 10.6205 10.3275 10.6748L11.5456 11.3154L11.3136 9.95793C11.2744 9.72998 11.3499 9.4972 11.5154 9.33585L12.5015 8.37454L11.1391 8.17677C10.9098 8.14382 10.7121 7.99963 10.6097 7.79226L10 6.55762L9.39027 7.79221C9.28794 7.99959 9.09022 8.14377 8.86086 8.17673L7.49854 8.37449L8.48455 9.3358C8.65007 9.49715 8.72563 9.72993 8.68649 9.95793Z" />
        <path d="M0.231073 21.4855C0.419229 21.6929 0.71037 21.7663 0.976104 21.6778L3.98637 20.656L5.24501 23.575C5.35624 23.8332 5.63295 23.9375 5.89048 24C6.16788 24 6.41989 23.8366 6.53318 23.5826L8.28978 19.6298C5.8466 19.2288 3.68754 17.9901 2.11348 16.2134L0.107463 20.7261C-0.0058336 20.9815 0.0422133 21.2795 0.231073 21.4855Z" />
        <path d="M13.467 23.5826C13.5803 23.8366 13.8316 24 14.1097 24C14.3418 23.9561 14.6439 23.8331 14.7552 23.575L16.0138 20.656L19.0241 21.6778C19.2891 21.7664 19.5809 21.6929 19.7691 21.4855C19.9579 21.2795 20.006 20.9815 19.8927 20.7261L17.8867 16.2134C16.3127 17.9902 14.1536 19.2288 11.7104 19.6298L13.467 23.5826Z" />
      </svg>
    ),
    lable: "Winning History",
    link_to: "/dashboard/winning-history",
    has_submenu: false,
    submenu: [],
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <g clipPath="url(#clip0_1547_9776)">
          <path d="M12 0C5.37281 0 0 5.37281 0 12C0 18.6272 5.37281 24 12 24C18.6272 24 24 18.6272 24 12C24 5.37281 18.6277 0 12 0ZM12 19.0697L10.8619 18.2616C9.72047 17.4037 9.01313 16.8661 8.11547 16.0491C7.25672 15.2667 6.29297 14.3058 5.70234 13.1541C5.70234 13.1541 5.40703 12.5255 5.2725 11.9878C5.18537 11.6061 5.14943 11.2146 5.16562 10.8234C5.27625 8.62031 7.19766 6.61031 9.18563 6.49547C9.65017 6.47248 10.1136 6.55969 10.538 6.75C10.7905 6.86395 11.028 7.00881 11.2448 7.18125L12 7.82812L12.7552 7.18547C13.3467 6.71672 14.047 6.46172 14.8144 6.49781C16.8023 6.61266 18.7237 8.62172 18.8344 10.8258C18.8506 11.2169 18.8146 11.6085 18.7275 11.9902C18.7275 11.9902 18.555 12.6933 18.2977 13.1564C17.707 14.3081 16.7433 15.2691 15.8845 16.0514C15.5794 16.3284 15.3009 16.5708 15.0202 16.8042C14.4712 17.2603 13.9092 17.6836 13.1381 18.2634L12 19.0697Z" />
        </g>
        <defs>
          <clipPath id="clip0_1547_9776">
            <rect width="24" height="24" />
          </clipPath>
        </defs>
      </svg>
    ),
    lable: "Wishlist's",
    link_to: "/dashboard/wishlists",
    has_submenu: false,
    submenu: [],
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <path d="M8.76 17.4C8.76 18 8.88 18.6 9 19.2H0C0 14.52 3.72 10.8 8.4 10.8C9.6 10.8 10.68 11.04 11.76 11.52C9.96 12.84 8.76 15 8.76 17.4Z" />
        <path d="M8.4001 9.6C11.0511 9.6 13.2001 7.45097 13.2001 4.8C13.2001 2.14903 11.0511 0 8.4001 0C5.74913 0 3.6001 2.14903 3.6001 4.8C3.6001 7.45097 5.74913 9.6 8.4001 9.6Z" />
        <path d="M23.6402 21.9601L20.6402 19.8001C21.0002 19.0801 21.2402 18.2401 21.2402 17.4001C21.2402 14.6401 18.9602 12.3601 16.2002 12.3601C13.4402 12.3601 11.1602 14.6401 11.1602 17.4001C11.1602 20.1601 13.4402 22.4401 16.2002 22.4401C17.5202 22.4401 18.8402 21.8401 19.6802 21.0001L21.9602 23.6401C22.2002 23.8801 23.0402 24.2401 23.6402 23.6401C24.1202 23.1601 24.1202 22.4401 23.6402 21.9601ZM16.2002 19.5601C15.0002 19.5601 14.0402 18.6001 14.0402 17.4001C14.0402 16.2001 15.0002 15.2401 16.2002 15.2401C17.4002 15.2401 18.3602 16.2001 18.3602 17.4001C18.3602 18.6001 17.4002 19.5601 16.2002 19.5601Z" />
      </svg>
    ),
    lable: "KYC",
    link_to: "/dashboard/kyc",
    has_submenu: true,
    submenu: [
      { level: "Form", link_to: "/dashboard/kyc" },
      { level: "KYC Info", link_to: "/dashboard/kyc/info" },
    ],
  },
  {
    id: 5,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1636_689)">
          <path d="M14.7657 22.5896H13.9914C13.6647 20.9869 12.2445 19.7771 10.5469 19.7771H4.92193C3.2243 19.7771 1.80414 20.9869 1.47746 22.5896H0.703185C0.314545 22.5896 6.10352e-05 22.9041 6.10352e-05 23.2927C6.10352e-05 23.6814 0.314545 23.9958 0.703185 23.9958C5.39982 23.9958 10.0735 23.9958 14.7657 23.9958C15.1543 23.9958 15.4688 23.6814 15.4688 23.2927C15.4688 22.9041 15.1543 22.5896 14.7657 22.5896Z" />
          <path d="M18.3105 6.38222L12.3443 0.416075C11.7951 -0.133158 10.9047 -0.133158 10.3556 0.416075C9.80644 0.965215 9.80644 1.8556 10.3556 2.40479L16.3218 8.37098C16.871 8.92012 17.7613 8.92012 18.3105 8.37098C18.8597 7.82175 18.8597 6.93145 18.3105 6.38222Z" />
          <path d="M8.36688 16.3261L2.40064 10.3599C1.8515 9.81071 0.961111 9.81071 0.411925 10.3599C-0.137308 10.909 -0.137308 11.7994 0.411925 12.3486L6.37812 18.3148C6.92735 18.8639 7.81765 18.8639 8.36688 18.3148C8.91602 17.7657 8.91602 16.8753 8.36688 16.3261Z" />
          <path d="M9.36079 3.3994L3.39471 9.36548L9.36079 15.3316L15.3269 9.36548L9.36079 3.3994Z" />
          <path d="M23.3823 20.3948L22.3818 19.3091L19.3987 22.2922L20.3991 23.378C21.2229 24.2017 22.5585 24.2017 23.3823 23.378C24.206 22.5542 24.206 21.2186 23.3823 20.3948Z" />
          <path d="M16.6666 13.6876C16.7851 13.2225 16.6859 12.7125 16.3218 12.3484C15.7726 11.7992 14.8822 11.7992 14.3331 12.3484L12.3444 14.3372C11.7951 14.8863 11.7951 15.7767 12.3444 16.3259C12.7084 16.69 13.2184 16.7892 13.6835 16.6707L18.4043 21.2977L21.3874 18.3146L16.6666 13.6876Z" />
        </g>
        <defs>
          <clipPath id="clip0_1636_689">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    lable: "Auctions",
    link_to: "/dashboard/auctions",
    has_submenu: true,
    submenu: [
      { level: "Create", link_to: "/dashboard/auctions" },
      { level: "All", link_to: "/dashboard/auctions/all" },
      { level: "Pending", link_to: "/dashboard/auctions/pending" },
      { level: "Live", link_to: "/dashboard/auctions/live" },
      { level: "Upcoming", link_to: "/dashboard/auctions/upcoming" },
      { level: "Expired", link_to: "/dashboard/auctions/expired" },
      { level: "Cancel", link_to: "/dashboard/auctions/cancel" },
      { level: "Winners", link_to: "/dashboard/auctions/winners" },
    ],
  },
  {
    id: 6,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <path d="M12 4.61368e-05C10.2348 7.63729e-05 8.55585 0.380091 7.0453 1.06567C6.83851 1.15955 6.75123 1.40644 6.85311 1.60939L7.56795 3.04142C7.66395 3.23376 7.89474 3.31586 8.09061 3.22736C9.28463 2.69425 10.6062 2.40082 12 2.40082C17.3066 2.40082 21.5992 6.69338 21.5992 12C21.5992 13.9963 20.9847 15.841 19.9429 17.3773L18.682 16.1156C18.5958 16.0293 18.475 15.987 18.3539 16.0007C18.1517 16.0242 17.9994 16.1957 18 16.3992V20.7991C17.9992 21.02 18.1775 21.1998 18.3984 21.2007H22.7976C23.157 21.2037 23.3374 20.7676 23.0812 20.5156L21.6632 19.0976C23.1261 17.1089 24 14.6562 24 12C24 5.37731 18.6226 3.10187e-05 12 4.61368e-05ZM1.19843 2.79925C0.842722 2.79939 0.664107 3.22897 0.914842 3.48129L2.33359 4.90004C0.870462 6.88899 0 9.34331 0 12C0 18.6227 5.37732 24 12 24C13.7652 24 15.4441 23.6168 16.9547 22.9312C17.1611 22.8371 17.248 22.5902 17.1461 22.3875L16.4289 20.9555C16.333 20.7649 16.1044 20.6831 15.9093 20.7696C14.7153 21.3027 13.3937 21.5992 12 21.5992C6.69332 21.5992 2.40078 17.3067 2.40078 12C2.40078 10.0045 3.01161 8.1575 4.05234 6.62113L5.31796 7.88361C5.57028 8.13438 5.99985 7.95571 5.99999 7.60001V3.20083C6.00079 2.9787 5.82056 2.79841 5.59842 2.79925H1.19843ZM11.9992 5.59925C8.46932 5.59925 5.60077 8.47093 5.60077 12.0008C5.60077 15.5307 8.46932 18.3992 11.9992 18.3992C15.5291 18.3992 18.4007 15.5307 18.4007 12.0008C18.4007 8.47093 15.5291 5.59925 11.9992 5.59925ZM11.9976 7.19691C12.1977 7.19691 12.3976 7.33007 12.3976 7.59687V8.44454C13.3081 8.63048 13.9984 9.43969 13.9984 10.4031C14.0105 10.9484 13.1863 10.9484 13.1984 10.4031C13.1984 9.73566 12.6666 9.20469 11.9992 9.20469C11.3317 9.20469 10.8007 9.73566 10.8007 10.4031C10.8007 11.0706 11.3317 11.6024 11.9992 11.6024C13.099 11.6024 13.9984 12.5041 13.9984 13.6039C13.9984 14.5674 13.3081 15.3774 12.3976 15.5633V16.4031C12.3976 16.9366 11.5976 16.9366 11.5976 16.4031V15.5625C10.6887 15.3754 10.0007 14.5663 10.0007 13.6039C10.0123 13.0823 10.7886 13.0823 10.8007 13.6039C10.8007 14.2714 11.3317 14.8032 11.9992 14.8032C12.6666 14.8032 13.1984 14.2714 13.1984 13.6039C13.1984 12.9364 12.6666 12.4023 11.9992 12.4023C10.8993 12.4023 10.0007 11.503 10.0007 10.4031C10.0007 9.44078 10.6887 8.63247 11.5976 8.44533V7.59687C11.5976 7.33014 11.7976 7.19691 11.9976 7.19691Z" />
      </svg>
    ),
    lable: "Transactions",
    link_to: "/dashboard/transactions",
    has_submenu: false,
    submenu: [],
  },
  {
    id: 7,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <path d="M15.3488 12.9712V13.2614C15.3488 13.751 15.4452 14.2359 15.6325 14.6883C15.8199 15.1407 16.0945 15.5517 16.4407 15.8979C16.787 16.2442 17.198 16.5188 17.6504 16.7061C18.1028 16.8935 18.5877 16.9898 19.0773 16.9898H21.7674V19.8139C21.765 20.3313 21.5584 20.8267 21.1926 21.1925C20.8267 21.5584 20.3313 21.765 19.814 21.7674H8.62884C9.56694 21.2735 10.3126 20.4796 10.7467 19.5124C11.1809 18.5452 11.2786 17.4604 11.0242 16.4312C10.7698 15.402 10.178 14.4876 9.34321 13.8341C8.50844 13.1805 7.4788 12.8254 6.41861 12.8254C5.35842 12.8254 4.32878 13.1805 3.494 13.8341C2.65922 14.4876 2.06742 15.402 1.81302 16.4312C1.55863 17.4604 1.65631 18.5452 2.09047 19.5124C2.52464 20.4796 3.27027 21.2735 4.20837 21.7674H3.06977C2.27733 21.7709 1.51541 21.4621 0.948952 20.9079C0.327655 19.9097 -0.00111924 18.7572 2.86273e-06 17.5814V3.06977C0.000849403 2.91816 0.0427725 2.7696 0.121314 2.63991C0.199855 2.51022 0.312077 2.40424 0.446046 2.33325C0.580015 2.26225 0.730722 2.22889 0.882139 2.23671C1.03356 2.24454 1.18002 2.29325 1.30596 2.37768L1.74147 2.66791C1.69572 2.7969 1.67302 2.93292 1.67442 3.06977C1.67457 3.4398 1.82162 3.79463 2.08327 4.05627C2.34492 4.31792 2.69975 4.46498 3.06977 4.46512H19.814C20.3313 4.46759 20.8267 4.67419 21.1926 5.04001C21.5584 5.40583 21.765 5.90127 21.7674 6.41861V9.24279H19.0773C18.5877 9.24271 18.1028 9.33909 17.6504 9.52643C17.198 9.71377 16.787 9.98839 16.4407 10.3346C16.0945 10.6808 15.8199 11.0919 15.6325 11.5443C15.4452 11.9967 15.3488 12.4815 15.3488 12.9712Z" />
        <path d="M16.4651 0H3.06977C2.25561 0 1.47481 0.323421 0.899114 0.899113C0.323421 1.47481 0 2.25561 0 3.06977C0 3.88392 0.323421 4.66472 0.899114 5.24042C1.47481 5.81611 2.25561 6.13953 3.06977 6.13953H17.5814C17.8029 6.13796 18.015 6.04925 18.1717 5.89258C18.3283 5.73591 18.417 5.52388 18.4186 5.30232V1.95349C18.4161 1.43615 18.2095 0.940704 17.8437 0.574887C17.4779 0.20907 16.9825 0.00246551 16.4651 0ZM3.06977 4.46511C2.69974 4.46497 2.34491 4.31791 2.08327 4.05627C1.82162 3.79462 1.67456 3.43979 1.67442 3.06977C1.67302 2.93292 1.69571 2.79689 1.74146 2.66791C1.82518 2.38066 2.00001 2.12841 2.23961 1.94921C2.4792 1.77001 2.77057 1.67356 3.06977 1.67442H16.4651C16.5019 1.67404 16.5383 1.681 16.5724 1.69489C16.6064 1.70879 16.6373 1.72933 16.6633 1.75532C16.6893 1.78131 16.7098 1.81222 16.7237 1.84625C16.7376 1.88028 16.7446 1.91673 16.7442 1.95349V4.46511H3.06977Z" />
        <path d="M22.7817 10.3535H19.079C18.386 10.3543 17.7217 10.6299 17.2317 11.1199C16.7417 11.6099 16.4661 12.2742 16.4653 12.9672V13.2654C16.4661 13.9584 16.7417 14.6227 17.2317 15.1127C17.7217 15.6027 18.386 15.8783 19.079 15.8791H22.7817C23.1048 15.8788 23.4145 15.7503 23.643 15.5218C23.8714 15.2934 23.9999 14.9836 24.0002 14.6606V11.572C23.9999 11.249 23.8714 10.9392 23.643 10.7108C23.4145 10.4823 23.1048 10.3538 22.7817 10.3535Z" />
        <path d="M6.41861 11.1628C4.71695 11.165 3.0856 11.8419 1.88235 13.0452C0.679095 14.2484 0.00215912 15.8798 2.86273e-06 17.5814C-0.00111924 18.7572 0.327655 19.9097 0.948952 20.9079C1.46979 21.7743 2.18904 22.5044 3.04744 23.0382C3.90584 23.5719 4.8788 23.8941 5.88613 23.978C6.89347 24.062 7.90633 23.9053 8.84123 23.521C9.77614 23.1367 10.6063 22.5356 11.2634 21.7675C12.28 20.6102 12.8396 19.1218 12.8372 17.5814C12.8351 15.8798 12.1581 14.2484 10.9549 13.0452C9.75161 11.8419 8.12026 11.165 6.41861 11.1628ZM6.41861 22.3256C5.64673 22.3277 4.88671 22.1358 4.20837 21.7675C3.27027 21.2736 2.52464 20.4796 2.09047 19.5124C1.65631 18.5452 1.55863 17.4605 1.81302 16.4312C2.06742 15.402 2.65922 14.4877 3.494 13.8341C4.32878 13.1805 5.35842 12.8254 6.41861 12.8254C7.4788 12.8254 8.50844 13.1805 9.34321 13.8341C10.178 14.4877 10.7698 15.402 11.0242 16.4312C11.2786 17.4605 11.1809 18.5452 10.7467 19.5124C10.3126 20.4796 9.56694 21.2736 8.62884 21.7675C7.9505 22.1358 7.19048 22.3277 6.41861 22.3256Z" />
        <path d="M6.41875 20.6512C6.19673 20.6512 5.98382 20.563 5.82682 20.406C5.66983 20.249 5.5816 20.0361 5.58154 19.814V15.3489C5.58154 15.1269 5.66975 14.9139 5.82676 14.7569C5.98376 14.5999 6.19671 14.5117 6.41875 14.5117C6.64079 14.5117 6.85374 14.5999 7.01075 14.7569C7.16776 14.9139 7.25596 15.1269 7.25596 15.3489V19.814C7.2559 20.0361 7.16768 20.249 7.01068 20.406C6.85369 20.563 6.64078 20.6512 6.41875 20.6512Z" />
        <path d="M8.65096 18.4186H4.18584C3.9638 18.4186 3.75085 18.3304 3.59385 18.1733C3.43684 18.0163 3.34863 17.8034 3.34863 17.5813C3.34863 17.3593 3.43684 17.1464 3.59385 16.9894C3.75085 16.8323 3.9638 16.7441 4.18584 16.7441H8.65096C8.873 16.7441 9.08595 16.8323 9.24295 16.9894C9.39996 17.1464 9.48817 17.3593 9.48817 17.5813C9.48817 17.8034 9.39996 18.0163 9.24295 18.1733C9.08595 18.3304 8.873 18.4186 8.65096 18.4186Z" />
      </svg>
    ),
    lable: "Add Money",
    link_to: "/dashboard/add-money",
    has_submenu: true,
    submenu: [
      { level: "Add", link_to: "/dashboard/add-money" },
      { level: "Logs", link_to: "/dashboard/add-money/logs" },
    ],
  },
  {
    id: 8,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <g clipPath="url(#clip0_1547_13833)">
          <path d="M23.2055 12.2667H18.9727C18.5491 12.2667 18.1296 12.3409 17.7383 12.4851C17.3469 12.6293 16.9914 12.8406 16.6918 13.1071C16.3923 13.3735 16.1547 13.6898 15.9926 14.038C15.8305 14.3861 15.7471 14.7592 15.7471 15.136C15.7471 15.5128 15.8305 15.8859 15.9926 16.234C16.1547 16.5822 16.3923 16.8985 16.6918 17.1649C16.9914 17.4314 17.3469 17.6427 17.7383 17.7869C18.1296 17.9311 18.5491 18.0053 18.9727 18.0053H23.2055C23.4355 17.9812 23.6462 17.8789 23.7937 17.72C23.9411 17.561 24.0139 17.3575 23.9969 17.152V13.128C24.0163 12.9211 23.9447 12.7157 23.797 12.5549C23.6493 12.3942 23.4372 12.2909 23.2055 12.2667ZM18.9667 16.2667C18.7193 16.2667 18.4775 16.2014 18.2719 16.0791C18.0662 15.9568 17.906 15.7829 17.8115 15.5796C17.717 15.3762 17.6924 15.1525 17.7408 14.9367C17.7893 14.721 17.9087 14.5228 18.0838 14.3674C18.2589 14.212 18.4819 14.1063 18.7246 14.0637C18.9673 14.0211 19.2188 14.0435 19.4471 14.1281C19.6755 14.2127 19.8705 14.3556 20.0075 14.5388C20.1445 14.722 20.2173 14.9373 20.2167 15.1573C20.2159 15.4518 20.0839 15.7339 19.8495 15.9419C19.6152 16.1499 19.2977 16.2667 18.9667 16.2667ZM5.22805 7.77333C5.08257 8.74197 5.15501 9.72667 5.44114 10.6702C5.72728 11.6137 6.2214 12.4972 6.89479 13.2693L6.93076 13.312C6.97606 13.3642 7.0342 13.4065 7.10071 13.4356C7.16722 13.4647 7.24034 13.4799 7.31447 13.48C7.36435 13.4794 7.41386 13.4722 7.46136 13.4587C7.55501 13.4311 7.63702 13.3789 7.69646 13.3088C7.7559 13.2388 7.78996 13.1543 7.79411 13.0667C7.83216 12.1009 8.10958 11.1546 8.60655 10.2953C9.10353 9.43603 9.80777 8.68503 10.6689 8.096L13.7476 5.984L15.3544 7.85067C15.4092 7.91481 15.4832 7.96394 15.568 7.99243C15.6527 8.02091 15.7447 8.02761 15.8336 8.01175C15.9224 7.9959 16.0044 7.95813 16.0702 7.90276C16.136 7.84739 16.183 7.77667 16.2057 7.69867L16.6224 6.304H21.215C21.6803 6.304 22.1267 6.46827 22.4561 6.76075C22.7854 7.05323 22.9708 7.45002 22.9716 7.864V11.4133H18.9727C17.8596 11.4133 16.7921 11.8067 16.0051 12.5068C15.218 13.2069 14.7758 14.1565 14.7758 15.1467C14.7758 16.1368 15.218 17.0864 16.0051 17.7865C16.7921 18.4867 17.8596 18.88 18.9727 18.88H22.9716V22.4373C22.9708 22.8516 22.7855 23.2486 22.4562 23.5415C22.127 23.8344 21.6806 23.9993 21.215 24H1.72969C1.26873 23.993 0.829265 23.8254 0.505802 23.5332C0.182339 23.2409 0.000718501 22.8474 0 22.4373V7.848C0.000794163 7.43402 0.186222 7.03723 0.515576 6.74475C0.84493 6.45227 1.29129 6.288 1.75667 6.288H5.61775C5.43095 6.76992 5.30036 7.26765 5.22805 7.77333ZM6.78387 6.008C7.27898 5.02811 8.03777 4.17178 8.9932 3.51467L11.0257 2.13333C11.1271 2.06344 11.1938 1.96104 11.2115 1.848C11.2195 1.79191 11.2148 1.73498 11.1979 1.6805C11.1809 1.62602 11.1519 1.57509 11.1126 1.53067L9.80559 0.016L17.5038 0L15.5313 6.61867L14.2272 5.11467C14.1885 5.0696 14.14 5.03182 14.0848 5.00351C14.0295 4.9752 13.9684 4.95692 13.9051 4.94973C13.8419 4.94254 13.7776 4.94658 13.7161 4.96161C13.6546 4.97665 13.597 5.00239 13.5468 5.03733L10.0844 7.41067C8.4915 8.50319 7.39517 10.0702 6.99671 11.824C6.46661 10.9388 6.17055 9.95775 6.13107 8.95543C6.09159 7.95311 6.30973 6.956 6.76888 6.04C6.77258 6.02889 6.77761 6.01816 6.78387 6.008Z" />
        </g>
        <defs>
          <clipPath id="clip0_1547_13833">
            <rect width="24" height="24" />
          </clipPath>
        </defs>
      </svg>
    ),
    lable: "Withdraw",
    link_to: "/dashboard/withdraw",
    has_submenu: true,
    submenu: [
      { level: "Withdraw Money", link_to: "/dashboard/withdraw" },
      { level: "Withdraw Log", link_to: "/dashboard/withdraw/log" },
    ],
  },
  {
    id: 9,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <g clipPath="url(#clip0_1547_13782)">
          <path d="M24 8.57143V1.71429C24 0.767469 23.4628 0 22.8 0H1.2C0.537228 0 0 0.767469 0 1.71429V8.57143C1.32546 8.57143 2.4 10.1064 2.4 12C2.4 13.8935 1.32546 15.4286 0 15.4286V22.2857C0 23.2324 0.537228 24 1.2 24H22.8C23.4628 24 24 23.2324 24 22.2857V15.4286C22.6745 15.4286 21.6 13.8935 21.6 12C21.6 10.1064 22.6745 8.57143 24 8.57143ZM6.6 19.9604C6.6 20.4342 6.33164 20.8175 6 20.8175C5.66836 20.8175 5.4 20.4342 5.4 19.9604V18.3683C5.4 17.8945 5.66836 17.5112 6 17.5112C6.33164 17.5112 6.6 17.8945 6.6 18.3683V19.9604ZM6.6 15.1841C6.6 15.6579 6.33164 16.0413 6 16.0413C5.66836 16.0413 5.4 15.6579 5.4 15.1841V13.5921C5.4 13.1183 5.66836 12.7349 6 12.7349C6.33164 12.7349 6.6 13.1183 6.6 13.5921V15.1841ZM6.6 10.4079C6.6 10.8817 6.33164 11.2651 6 11.2651C5.66836 11.2651 5.4 10.8817 5.4 10.4079V8.81753C5.4 8.34376 5.66836 7.96039 6 7.96039C6.33164 7.96039 6.6 8.34376 6.6 8.81753V10.4079ZM6.6 5.63337C6.6 6.10714 6.33164 6.49051 6 6.49051C5.66836 6.49051 5.4 6.10714 5.4 5.63337V4.04129C5.4 3.56751 5.66836 3.18415 6 3.18415C6.33164 3.18415 6.6 3.56751 6.6 4.04129V5.63337ZM18 18H9.6C9.26836 18 9 17.6166 9 17.1429C9 16.6691 9.26836 16.2857 9.6 16.2857H18C18.3316 16.2857 18.6 16.6691 18.6 17.1429C18.6 17.6166 18.3316 18 18 18ZM18 12.8571H9.6C9.26836 12.8571 9 12.4738 9 12C9 11.5262 9.26836 11.1429 9.6 11.1429H18C18.3316 11.1429 18.6 11.5262 18.6 12C18.6 12.4738 18.3316 12.8571 18 12.8571ZM18 7.71429H9.6C9.26836 7.71429 9 7.33092 9 6.85714C9 6.38337 9.26836 6 9.6 6H18C18.3316 6 18.6 6.38337 18.6 6.85714C18.6 7.33092 18.3316 7.71429 18 7.71429Z" />
        </g>
        <defs>
          <clipPath id="clip0_1547_13782">
            <rect width="24" height="24" />
          </clipPath>
        </defs>
      </svg>
    ),
    lable: "Tickets",
    link_to: "/dashboard/tickets",
    has_submenu: false,
    submenu: [],
  },
  {
    id: 10,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#6B788E"
      >
        <path d="M12 0.000488281C5.37328 0.000488281 0 5.37271 0 12C0 18.6272 5.37275 23.9994 12 23.9994C18.6278 23.9994 24 18.6272 24 12C24 5.37271 18.6278 0.000488281 12 0.000488281ZM12 3.58847C14.1927 3.58847 15.9696 5.36586 15.9696 7.55755C15.9696 9.74976 14.1927 11.5266 12 11.5266C9.80831 11.5266 8.03145 9.74976 8.03145 7.55755C8.03145 5.36586 9.80831 3.58847 12 3.58847ZM11.9974 20.8621C9.81042 20.8621 7.80743 20.0657 6.2625 18.7474C5.88615 18.4264 5.66898 17.9557 5.66898 17.4618C5.66898 15.239 7.46798 13.46 9.69129 13.46H14.3098C16.5336 13.46 18.3257 15.239 18.3257 17.4618C18.3257 17.9562 18.1096 18.4259 17.7328 18.7469C16.1884 20.0657 14.1848 20.8621 11.9974 20.8621Z" />
      </svg>
    ),
    lable: "Profile Setting",
    link_to: "/dashboard/profile-settings",
    has_submenu: false,
    submenu: [],
  },
  // {
  //   id: 11,
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="#6B788E"
  //     >
  //       <path d="M22.4231 3.3589C22.38 3.04946 22.1574 2.79493 21.8564 2.71127L12.2104 0.0287059C12.0729 -0.00956863 11.9277 -0.00956863 11.79 0.0287059L2.14402 2.71127C1.84305 2.79493 1.62041 3.04936 1.57733 3.3589C1.52138 3.7612 0.245041 13.2667 3.51877 17.9953C6.78862 22.7184 11.6124 23.9287 11.8161 23.978C11.8766 23.9926 11.9383 23.9998 12.0002 23.9998C12.0621 23.9998 12.1238 23.9925 12.1844 23.978C12.3882 23.9287 17.2119 22.7184 20.4817 17.9953C23.7554 13.2668 22.4791 3.76131 22.4231 3.3589ZM18.2207 8.90829L11.6411 15.4878C11.488 15.6409 11.2872 15.7176 11.0866 15.7176C10.8859 15.7176 10.6851 15.641 10.532 15.4878L6.46392 11.4198C6.31678 11.2727 6.23417 11.0732 6.23417 10.8652C6.23417 10.6572 6.31688 10.4577 6.46392 10.3106L7.27166 9.5029C7.57796 9.19671 8.07458 9.1966 8.38078 9.5029L11.0866 12.2087L16.3038 6.99132C16.4508 6.84418 16.6504 6.76157 16.8584 6.76157C17.0664 6.76157 17.2659 6.84418 17.4129 6.99132L18.2207 7.79906C18.527 8.10536 18.527 8.60199 18.2207 8.90829Z" />
  //     </svg>
  //   ),
  //   lable: "Two Factor",
  //   link_to: "/dashboard/two-factor",
  //   has_submenu: false,
  //   submenu: [],
  // },
  {
    id: 12,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#6B788E">
        <g clipPath="url(#clip0_2298_6154)">
          <path d="M18.75 9H18V6C18 2.691 15.309 0 12 0C8.691 0 6 2.691 6 6V9H5.25C4.01 9 3 10.009 3 11.25V21.75C3 22.991 4.01 24 5.25 24H18.75C19.99 24 21 22.991 21 21.75V11.25C21 10.009 19.99 9 18.75 9ZM8 6C8 3.794 9.794 2 12 2C14.206 2 16 3.794 16 6V9H8V6ZM13 16.722V19C13 19.552 12.553 20 12 20C11.447 20 11 19.552 11 19V16.722C10.405 16.375 10 15.737 10 15C10 13.897 10.897 13 12 13C13.103 13 14 13.897 14 15C14 15.737 13.595 16.375 13 16.722Z" />
        </g>
        <defs>
          <clipPath id="clip0_2298_6154">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    lable: "Change Password",
    link_to: "/dashboard/change-password",
    has_submenu: false,
    submenu: [],
  },
];

export const auctionsData = [
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 5,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 0,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 5,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 0,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 5,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 0,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 5,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 0,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Pending",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 5,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 0,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Active",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Active",
  },

  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 5,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 0,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 2,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Cancel",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Upcoming",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
  {
    productName: "Vintage Typewriters",
    productPrice: "5,000.00 ",
    bidder: 1,
    status: "Expired",
  },
];

export const winnersData = [
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Pending",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Pending",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Pending",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Pending",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Pending",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Delivered",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Delivered",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Delivered",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Delivered",
  },
  {
    winnerName: "Alex Johnson alexjohnson",
    productName: "Mini Hair Straightener Clipboard",
    winningDate: "10 Oct 2023 04:05 PM",
    status: "Delivered",
  },
];
