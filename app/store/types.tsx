interface CurrencyData {
  id: number;
  icon: null | string;
  default: number;
  symbol: string;
  code: string;
  curr_name: string;
  status: number;
  rate: string;
  charges: null | string;
  created_at: string;
  updated_at: string;
}
interface MenuItem {
  title: string;
  dropdown: "yes" | "no";
  href: string;
  target: string;
}

interface Menu {
  [key: string]: MenuItem;
}

interface SocialLink {
  icon: string;
  url: string;
}

interface Seo {
  title: string;
  description: string;
  keywords: string;
  image: string | null;
}

interface WebsiteData {
  menupage: Menu;
  "footer-menu1": Menu;
  "footer-menu2": {
    id: number;
    slug: string;
    title: string;
  }[];
  breadcumb_banner: string;
  logo: string;
  copyright: string;
  favicon: string;
  footer_text: string;
  social_link: SocialLink[];
  phone: string[];
  email: string[];
  address: string;
  seo: Seo;
  website_title: string;
  theme_color: string;
}

interface GlobalState {
  name: string;
  activePage: string;
  breadcrumb1: string;
  breadcrumb2: string;
  language: {};
  currency: CurrencyData[] | null;
  general_settings: WebsiteData | null;
  maintenance: {
    is_maintenance: string | number;
    maintance_image: string | null;
    maintenance: string;
  } | null;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    zip: string;
    address: string;
    profile_photo: string;
    email_verified: boolean;
    kyc_status: number;
    two_fa_status: number;
    two_fa: number;
    two_fa_code: string | null;
    status: number;
    created_at: string;
    updated_at: string;
  } | null;

  // increase: (by: number) => void
  setMaintenance: (data: any) => void;
  setUserData: (data: any) => void;
  setLanguage: (data: any) => void;
  setCurrency: (data: any) => void;
  setBreadcrumb1: (data: any) => void;
  setBreadcrumb2: (data: any) => void;
  setGeneralSettings: (data: any) => void;
  setActivePage: (data: any) => void;
}

export type { GlobalState };
