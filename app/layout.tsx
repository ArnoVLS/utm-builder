import "./globals.css"; import Link from "next/link";
export const metadata={title:"UTM Builder MVP",description:"UTM links genereren en beheren"};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="nl"><body><header className="top"><b>UTM Builder</b><nav><Link href="/">Builder</Link><Link href="/history">History</Link><Link href="/admin">Admin</Link><Link href="/login">Login</Link></nav></header>{children}</body></html>}
