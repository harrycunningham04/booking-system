import { Cta } from "./components/Cta";
import Feature from "./components/Feature";
import { Hero } from "./components/Hero";
import { Logos } from "./components/Logos";
import { NavBar } from "./components/NavBar";
import { auth } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <Hero />
      <Logos />
      <Feature />
      <Cta />
    </div>
  );
}
