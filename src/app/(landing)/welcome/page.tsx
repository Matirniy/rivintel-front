import Head from "next/head";
import LogoIcon from "@/components/icons/logoIcon";
import Link from "next/link";

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

      <main className="flex items-center justify-center bg-base-200 min-h-screen w-full">
        <section
          className="relative flex items-center justify-center min-h-screen bg-[#1F3FC3] overflow-hidden text-white w-full"
          aria-labelledby="page-title"
        >
          <header className="absolute top-4 left-4 md:top-8 md:left-10 flex items-center gap-2 z-20">
            <Link href="/" aria-label="Rivintel Home">
              <LogoIcon
                className="h-8 md:h-10 w-auto text-primary -ml-3.5"
                color="white"
              />
              <span className="text-lg md:text-2xl font-bold">Rivintel</span>
            </Link>
          </header>

          <h1
            id="page-title"
            className="absolute top-[14vh] md:top-[18vh] left-2 text-6xl lg:text-[12rem] 2xl:text-[18rem] font-extrabold select-none text-center animate-growFade"
          >
            Full Business Information
          </h1>

          <h2 className="absolute bottom-[28vh] md:bottom-20 right-5 md:left-50 text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl font-extrabold opacity-90 select-none">
            AI Analytics
          </h2>

          <h2 className="absolute top-12 right-5 md:right-8 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold opacity-70 text-right select-none">
            Flexible Filters
          </h2>

          <h2 className="absolute bottom-[20vh] md:bottom-10 left-5 md:right-15 text-3xl sm:text-4xl md:text-6xl 2xl:text-8xl font-extrabold opacity-50 text-right select-none">
            Data Download
          </h2>

          <article className="relative z-10 w-[95%] md:w-[90%] max-w-4xl rounded-xl shadow-2xl bg-base-100 p-2">
            <h3 className="sr-only">
              Rivintel Demo Video - AI-powered business intelligence
            </h3>
            <video
              className="w-full h-auto rounded-lg"
              src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
              autoPlay
              loop
              muted
              controls
            />
          </article>

          <div className="absolute bottom-14 md:bottom-6 z-20 flex justify-center w-full animate-bounce">
            <Link
              href="/"
              className="
                relative inline-flex items-center justify-center
                px-6 py-3 text-lg md:text-3xl font-bold
                text-primary bg-white rounded-full shadow-lg
                border-2 border-transparent
                transition-all duration-300 ease-in-out
                hover:border-primary hover:text-primary
                focus:outline-none md:w-[250px] md:h-[70px]
              "
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-0 transition-opacity duration-300" />
              <span className="relative">Try it now</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
