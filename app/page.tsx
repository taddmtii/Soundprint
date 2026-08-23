import { cookies } from "next/headers";
import LoginButton from "./components/LoginButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) {
    redirect('/now-playing');
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <header>Hey, welcome to Soundprint.</header>
      <LoginButton />
    </div>
  );
}
