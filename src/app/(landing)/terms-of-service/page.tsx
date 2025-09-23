import Head from "next/head";

export default function TermsOfServicePage() {
  return (
    <>
      <Head>
        <title>Rivintel - Terms of Service</title>
        <meta
          name="description"
          content="Terms of Service for Rivintel platform providing business analytics and AI-powered insights."
        />
      </Head>

      <main className="min-h-screen bg-base-200 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Terms of Service
          </h1>

          <p className="mb-4">
            Welcome to Rivintel. By accessing or using our platform, you agree
            to these Terms of Service. If you do not agree, please do not use
            our services.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            1. Access and Registration
          </h2>
          <p className="mb-4">
            Users can access a demo version of Rivintel without registration,
            with limited functionality. Full access requires registration and a
            paid monthly subscription.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            2. Subscription Payment
          </h2>
          <p className="mb-4">
            Payment for the subscription is charged monthly. After subscribing,
            users gain full access to Rivintel. Refunds are not available once
            the subscription has started, but monthly auto-renewal can be
            canceled at any time according to the rules of the payment provider.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Conduct</h2>
          <p className="mb-4">
            Users must not resell or redistribute any data obtained from
            Rivintel. The platform is for personal or business research use
            only.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            4. Intellectual Property
          </h2>
          <p className="mb-4">
            All content, data, and materials on Rivintel are owned by Rivintel
            or its licensors and are protected by copyright laws.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            5. Limitation of Liability
          </h2>
          <p className="mb-4">
            Rivintel provides information for research purposes and does not
            guarantee accuracy or results. Use the platform at your own risk.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">6. Termination</h2>
          <p className="mb-4">
            Rivintel may suspend or terminate access for users who violate these
            Terms of Service.
          </p>
        </div>
      </main>
    </>
  );
}
