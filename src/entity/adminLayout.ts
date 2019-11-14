export interface LayoutData {
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
