const server='https://juicy-incident-records.hollyfree85.chatgpt.site';
const key='jsb_manager_session';
export function saveSession(token:string){if(typeof token!=='string'||!token)throw Error('Invalid session');sessionStorage.setItem(key,token)}
export function clearSession(){sessionStorage.removeItem(key)}
export function hasSession(){try{const token=sessionStorage.getItem(key);if(!token)return false;const part=token.split('.')[0];const data=JSON.parse(atob(part.replaceAll('-','+').replaceAll('_','/')));return data.expires>Date.now()}catch{return false}}
export async function apiFetch(path:string,options:RequestInit={}){const headers=new Headers(options.headers);const token=sessionStorage.getItem(key);if(token)headers.set('Authorization','Bearer '+token);const res=await window.fetch(server+path,{...options,headers,credentials:'omit',cache:'no-store'});if(path==='/api/logout'&&res.ok)clearSession();if(res.status===401&&path!=='/api/login'){clearSession();window.dispatchEvent(new Event('jsb-signout'))}return res}
