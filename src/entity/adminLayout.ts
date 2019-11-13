export interface MenuItem {
  name: string;
  icon?: string;
  keys: string | string[];
  link?: string;
  children?: MenuItem[];
  target?: string;
  disable?: boolean;
}
export interface LayoutData {
  menu: MenuItem[];
  footer: FooterData;
  globalSearch: GlobalSearchData;
}
export interface GlobalSearchData {
  placeholder: string;
  dataSource: string[];
}
export interface FooterData {
  links: {
    key: string;
    title: string;
    href: string;
    blankTarget: boolean;
  }[];
  copyright: string;
  className?: string;
}
