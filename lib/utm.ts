export const normalize=(s:string)=>s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/&/g,"and").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_");
export const join=(...v:(string|undefined)[])=>v.filter(Boolean).map(x=>normalize(x!)).join("_");
export const compactDate=(s?:string)=>s?.replaceAll("-","")||"";
export function addParams(destination:string,params:Record<string,string>){const u=new URL(destination);const h=u.hash;u.hash="";Object.entries(params).forEach(([k,v])=>v&&u.searchParams.set(k,v));u.hash=h;return u.toString()}
