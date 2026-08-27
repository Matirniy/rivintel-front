import Head from "next/head";
import LogoIcon from "@/components/icons/logoIcon";
import Link from "next/link";

import AdvertisingIdHandler from "@/components/shared/advertisingIdHandler";

export default function WelcomePage() {
  return (
    <>
      <Head>
        <title>Rivintel - Business Analytics & Market Intelligence</title>
        <meta
          name="description"
          content="Rivintel provides full business information, AI-driven analytics and flexible data filters to help you research companies, industries and markets."
        />
        <meta
          name="keywords"
          content="business analysis, company data, market research, AI analytics, business intelligence"
        />
        <meta property="og:title" content="Rivintel - AI Business Analytics" />
        <meta
          property="og:description"
          content="Discover comprehensive company data and actionable insights with Rivintel's AI analytics platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rivintel.com/welcome" />
      </Head>

      <main className="min-h-screen w-full bg-primary text-primary-content">
        <section
          className="relative flex flex-col min-h-screen w-full overflow-hidden"
          aria-labelledby="page-title"
        >
          <header className="flex items-center gap-2 px-4 pt-5 sm:px-8 sm:pt-8">
            <Link href="/" aria-label="Rivintel Home" className="flex items-center gap-2">
              <LogoIcon className="h-7 w-auto -ml-2 sm:h-9" color="white" />
              <span className="text-lg font-bold sm:text-2xl">Rivintel</span>
            </Link>
          </header>

          <div className="relative flex-1 flex flex-col items-center justify-center gap-6 px-4 py-10 text-center sm:gap-8 sm:px-8">
            <h1
              id="page-title"
              className="max-w-4xl text-[clamp(2.5rem,10vw,7rem)] font-extrabold leading-[0.95] select-none animate-growFade"
            >
              Full Business Information
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[clamp(1.1rem,4vw,2rem)] font-bold">
              <span className="opacity-90">AI Analytics</span>
              <span className="opacity-70">Flexible Filters</span>
              <span className="opacity-50">Data Download</span>
            </div>

            <article className="relative z-10 w-full max-w-3xl rounded-xl shadow-2xl bg-base-100 p-2">
              <h3 className="sr-only">
                Rivintel Demo Video - AI-powered business intelligence
              </h3>
              <video
                className="w-full h-auto rounded-lg"
                src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            </article>

            <Link
              href="/"
              className="
                relative inline-flex items-center justify-center
                px-6 py-3 text-lg sm:px-8 sm:py-4 sm:text-xl font-bold
                text-primary bg-white rounded-full shadow-lg
                border-2 border-transparent
                transition-all duration-300 ease-in-out
                hover:border-white hover:bg-transparent hover:text-white
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                animate-bounce
              "
            >
              Try it now
            </Link>
          </div>
        </section>
      </main>
      <AdvertisingIdHandler />
    </>
  );
}
