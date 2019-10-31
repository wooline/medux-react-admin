export interface MenuItem {
  name: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
  target?: string;
}
export interface Item {
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
