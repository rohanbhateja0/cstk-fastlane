import { BaseComponent } from "./BaseComponent";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type UserListContent = {
  title: string;
  description: string;
  $: any;
};

export type UserListRenderingOptions = {
  layout: string; // 'grid' | 'list'
  items_per_row: string;
  show_company: boolean;
  show_address: boolean;
  show_contact: boolean;
  colspan: string;
  $: any;
};

export type UserListFields = {
  content: UserListContent;
  rendering_options: UserListRenderingOptions;
  $: any;
};
