import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col p-6">
      <h1 className="text-2xl font-bold">
        Dashboard Page
      </h1>
      {/* customers page */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Customers</h2>
        <p className="text-gray-600">Manage your customers here.</p>
        <Link href="/dashboard/customers">
          <button className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
            View Customers
          </button>
        </Link>
      </div>

      {/* invoices page */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Invoices</h2>
        <p className="text-gray-600">Manage your invoices here.</p>
        <Link href="/dashboard/invoices">
          <button className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
            View Invoices
          </button>
        </Link>
      </div>
    </div>
  )
}
