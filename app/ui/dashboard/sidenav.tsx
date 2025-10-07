import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut, auth } from '@/auth';
import Image from 'next/image';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.email) return null;
  
  try {
    const users = await sql`
      SELECT name, email, thumbnail
      FROM users
      WHERE email = ${session.user.email}
    `;
    return users[0] || null;
  } catch {
    return null;
  }
}

export default async function SideNav() {
  const user = await getCurrentUser();
  
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        {user && (
          <Link 
            href="/dashboard/profile"
            className="flex h-[48px] w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {user.thumbnail ? (
                <Image
                  src={user.thumbnail}
                  alt="Profile"
                  width={24}
                  height={24}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-300"></div>
              )}
            </div>
            <div className="hidden md:block truncate">{user.name}</div>
          </Link>
        )}

        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
