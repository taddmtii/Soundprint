import LoginButton from "./components/LoginButton";

export default function Home() {

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <header>Hey, welcome to Soundprint.</header>
      <LoginButton />
    </div>
  );
}
