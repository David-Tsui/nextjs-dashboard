export default function Page() {
  const renderTableColumns = () => (
    <tr>
      <th className="border border-gray-300 px-4 py-2">Name</th>
      <th className="border border-gray-300 px-4 py-2">Email</th>
      <th className="border border-gray-300 px-4 py-2">Total Invoices</th>
      <th className="border border-gray-300 px-4 py-2">Total Paid</th>
      <th className="border border-gray-300 px-4 py-2">Total Pending</th>
      <th className="border border-gray-300 px-4 py-2">Actions</th>
    </tr>
  )

  const customers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john02222131@gmail.com',
      total_invoices: 5,
      total_paid: 3,
      total_pending: 2,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane_0282452@yahoo.com.tw',
      total_invoices: 8,
      total_paid: 6,
      total_pending: 2,
    },
  ]

  const renderTableRows = () => (
    customers.map((customer) => (
      <tr key={customer.id} className="border-b border-gray-300">
        <td className="px-4 py-2">{customer.name}</td>
        <td className="px-4 py-2">{customer.email}</td>
        <td className="px-4 py-2">{customer.total_invoices}</td>
        <td className="px-4 py-2">{customer.total_paid}</td>
        <td className="px-4 py-2">{customer.total_pending}</td>
        <td className="px-4 py-2">
          <button className="text-blue-500 hover:underline">Edit</button>
        </td>
      </tr>
    ))
  )

  return (
    <div className="flex min-h-screen flex-col p-6">
      <h1 className="text-2xl font-bold">
        Customers Page
      </h1>
      <table className="mt-4 w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-50">
        { renderTableColumns() }
        </thead>
        <tbody>
          { renderTableRows() }
        </tbody>
      </table>
    </div>
  )
}
