'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteInvoice } from '@/app/lib/actions';
import Swal from 'sweetalert2';
import { useRef } from 'react';

export default function DeleteInvoiceButton({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const confirmedRef = useRef(false); // To prevent multiple confirmations

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    if (confirmedRef.current) {
      confirmedRef.current = false;
      return;
    }

    e.preventDefault();
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This invoice will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      confirmedRef.current = true;
      (e.target as HTMLFormElement).requestSubmit();
    }
  };

  return (
    <form action={deleteInvoiceWithId} onSubmit={handleDelete}>
      <button type="submit" className="cursor-pointer rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
