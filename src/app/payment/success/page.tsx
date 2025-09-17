export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
        <h2 className="text-xl font-bold">✅ Payment Successful!</h2>
        <p className="mt-2">Your subscription is now active.</p>
      </div>
    </div>
  );
}
