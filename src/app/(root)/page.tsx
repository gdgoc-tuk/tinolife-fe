import Image from "next/image";

import GetStartedSection from "./components/get-started-section";

const logo = "/static/logo.png";

export default function Home() {
  return (
    <main className="flex h-screen flex-col justify-between pb-10">
      <section className="mx-auto flex flex-1 flex-col items-center justify-center space-y-6">
        <Image src={logo} alt="logo" width={133} height={139} />
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">티노라이프</h1>
          <h2 className="text-tino-gray text-sm">티노라이프</h2>
        </div>
      </section>
      <GetStartedSection />
    </main>
  );
}
