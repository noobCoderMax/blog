export interface todo {
  id: number;
  name: string;
  address: string;
  startTime: string;
  endTime: string;
  type: string[];
  resource: string;
  content: string;
  isFinish: boolean;
}

export interface myBlog {
  id: string;
  title: string;
  type: string;
  content: string;
  imgSrc?: string;
  author: string;
  desc: string;
}

export interface User {
  name: string;
  sign: string;
  avator: string;
  age?: number;
  email: string;
  phone: string;
  habit: string[];
}

export interface RestaurantItem {
  value: string;
  link: string;
}
