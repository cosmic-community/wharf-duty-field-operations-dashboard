import Link from 'next/link'
import { ArrowLeft, Users as UsersIcon, Mail, Phone } from 'lucide-react'
import { getUsers } from '@/lib/cosmic'
import type { User } from '@/types'

export default async function UsersPage() {
  const users = await getUsers() as User[]

  // Sort by role (admin first) and then by name
  const sortedUsers = [...users].sort((a, b) => {
    const roleOrder = { admin: 0, broker: 1, remote_worker: 2, referral_agent: 3 }
    const aRole = roleOrder[a.metadata.user_role?.key || 'referral_agent']
    const bRole = roleOrder[b.metadata.user_role?.key || 'referral_agent']
    
    if (aRole !== bRole) {
      return aRole - bRole
    }
    
    return a.metadata.full_name.localeCompare(b.metadata.full_name)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-maritime text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-maritime-200 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Team Directory</h1>
              <p className="text-maritime-200 mt-1">{users.length} team members</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUsers.map((user) => {
            const profilePhoto = user.metadata.profile_photo?.imgix_url
            const regions = user.metadata.assigned_regions || []
            
            return (
              <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  {profilePhoto ? (
                    <img
                      src={`${profilePhoto}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={user.metadata.full_name}
                      className="w-16 h-16 rounded-full object-cover"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-maritime-100 flex items-center justify-center">
                      <UsersIcon className="w-8 h-8 text-maritime-600" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.metadata.full_name}
                    </h3>
                    <span className={`badge mt-1 ${
                      user.metadata.user_role?.key === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.metadata.user_role?.key === 'broker' ? 'bg-blue-100 text-blue-800' :
                      user.metadata.user_role?.key === 'remote_worker' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {user.metadata.user_role?.value || 'Unknown'}
                    </span>
                  </div>
                  
                  <div>
                    {user.metadata.active ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${user.metadata.email}`} className="hover:text-primary-600">
                      {user.metadata.email}
                    </a>
                  </div>
                  
                  {user.metadata.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${user.metadata.phone}`} className="hover:text-primary-600">
                        {user.metadata.phone}
                      </a>
                    </div>
                  )}
                </div>
                
                {regions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Assigned Regions:</p>
                    <div className="flex flex-wrap gap-1">
                      {regions.map((region, index) => (
                        <span key={index} className="badge bg-gray-100 text-gray-700">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Team members will appear here once added to your Cosmic bucket.</p>
          </div>
        )}
      </main>
    </div>
  )
}