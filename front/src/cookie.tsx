import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, {...option})
}

export const getCookie = (name: string) => {
  console.log("")
  return cookies.get(name);
}

export const rmCookie = (name: string) => {
    cookies.remove(name);
}
