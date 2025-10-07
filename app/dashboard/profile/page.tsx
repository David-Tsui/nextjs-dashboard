import { auth } from '@/auth';
import ThumbnailUpload from '@/app/ui/thumbnail-upload';
import { User } from '@/app/lib/definitions';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | null> {
  try {
    const users = await sql<User[]>`
      SELECT id, name, email, thumbnail
      FROM users
      WHERE email = ${email}
    `;
    return users[0] || null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return <div>Access denied</div>;
  }

  const user = await getUser(session.user.email);
  
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h2>
            <ThumbnailUpload currentThumbnail={user.thumbnail} />
          </div>
          
          <div className="border-t pt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}