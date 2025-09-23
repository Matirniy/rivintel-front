import Head from "next/head";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Rivintel - Privacy Policy</title>
        <meta
          name="description"
          content="Privacy Policy for Rivintel platform describing data collection and usage."
        />
      </Head>

      <main className="min-h-screen bg-base-200 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Privacy Policy</h1>

          <p className="mb-4">
            At Rivintel, your privacy is important to us. This policy explains how we collect, use, and protect your data.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">1. Data Collection</h2>
          <p className="mb-4">
            We collect information such as email, name, and navigation activity within the site. Demo usage does not require registration.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use of Data</h2>
          <p className="mb-4">
            Collected data is used solely for internal analytics to improve our services. We do not share or sell your information to third parties.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">3. Cookies and Tracking</h2>
          <p className="mb-4">
            Cookies and tracking technologies may be used to analyze site usage and enhance user experience.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">4. User Rights</h2>
          <p className="mb-4">
            Users can request access or deletion of their personal data. Please contact us for any such requests.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">5. Contact</h2>
          <p className="mb-4">
            For questions regarding privacy, please contact us at <a href="mailto:rivintel.contact@gmail.com" className="text-primary underline">rivintel.contact@gmail.com</a>.
          </p>
        </div>
      </main>
    </>
  );
}
