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
        <meta property="og:title" content="Rivintel – AI Business Analytics" />
        <meta
          property="og:description"
          content="Discover comprehensive company data and actionable insights with Rivintel's AI analytics platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/welcome" />
      </Head>

      <main className="flex items-center justify-center bg-base-200 min-h-screen w-full">
        <section
          className="relative flex items-center justify-center min-h-screen bg-[#1F3FC3] overflow-hidden text-white w-full"
          aria-labelledby="page-title"
        >
          <header className="absolute top-8 left-10 flex items-center gap-2 z-20">
            <Link href="/" aria-label="Rivintel Home">
              <LogoIcon
                className="h-10 w-auto text-primary ml-2"
                color="white"
              />
              <span className="text-xl md:text-2xl font-bold">Rivintel</span>
            </Link>
          </header>

          <h1
            id="page-title"
            className="absolute top-[13vh] left-2 text-6xl md:text-[18rem] font-extrabold select-none text-center animate-growFade"
          >
            Full Business Information
          </h1>
          <h2 className="absolute bottom-6 left-6 text-5xl md:text-6xl font-extrabold opacity-70 select-none">
            AI Analytics
          </h2>
          <h2 className="absolute top-16 right-6 text-5xl md:text-6xl font-extrabold opacity-50 text-right select-none">
            Flexible Filters
          </h2>
          <h2 className="absolute bottom-26 right-6 text-6xl md:text-8xl font-extrabold opacity-40 text-right select-none">
            Data Download
          </h2>

          <article className="relative z-10 w-[90%] max-w-4xl rounded-xl shadow-2xl bg-base-100 p-2">
            <h3 className="sr-only">
              Rivintel Demo Video – AI-powered business intelligence
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
        </section>
      </main>
    </>
  );
}
