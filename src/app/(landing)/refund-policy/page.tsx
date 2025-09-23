import Head from "next/head";

export default function RefundPolicyPage() {
  return (
    <>
      <Head>
        <title>Rivintel - Refund Policy</title>
        <meta
          name="description"
          content="Refund Policy for Rivintel subscriptions and paid services."
        />
      </Head>

      <main className="min-h-screen bg-base-200 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Refund Policy</h1>

          <p className="mb-4">
            Rivintel offers a paid monthly subscription to access full features.
            Please read our refund rules carefully.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            1. Subscription Payments
          </h2>
          <p className="mb-4">
            Payment is processed via Paddle and charged monthly for full access
            to Rivintel.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">2. Refunds</h2>
          <p className="mb-4">
            Once a subscription starts, refunds are not available. Users may
            cancel the monthly auto-renewal to prevent future charges, in
            accordance with Paddle's rules.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">3. Contact</h2>
          <p className="mb-4">
            For subscription questions or cancellation, please contact{" "}
            <a
              href="mailto:rivintel.contact@gmail.com"
              className="text-primary underline"
            >
              rivintel.contact@gmail.com
            </a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
