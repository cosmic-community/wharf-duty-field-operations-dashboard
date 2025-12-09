import Link from 'next/link'
import { ArrowLeft, Ship, Image as ImageIcon } from 'lucide-react'
import { getVisits } from '@/lib/cosmic'
import type { Visit, Wharf, User } from '@/types'

export default async function VisitsPage() {
  const visits = await getVisits() as Visit[]

  // Sort by check-in time (most recent first)
  const sortedVisits = [...visits].sort((a, b) => {
    const dateA = new Date(a.metadata.check_in_time).getTime()
    const dateB = new Date(b.metadata.check_in_time).getTime()
    return dateB - dateA
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
              <h1 className="text-3xl font-bold">Wharf Visits</h1>
              <p className="text-maritime-200 mt-1">{visits.length} field visits recorded</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Visit Details</th>
                <th>Wharf</th>
                <th>Broker</th>
                <th>Date/Time</th>
                <th>Boats</th>
                <th>Photos</th>
                <th>Status</th>
                <th>CRM Sync</th>
              </tr>
            </thead>
            <tbody>
              {sortedVisits.map((visit) => {
                const wharf = typeof visit.metadata.wharf === 'object' ? visit.metadata.wharf as Wharf : null
                const user = typeof visit.metadata.user === 'object' ? visit.metadata.user as User : null
                const checkInDate = new Date(visit.metadata.check_in_time)
                const checkOutDate = visit.metadata.check_out_time ? new Date(visit.metadata.check_out_time) : null
                
                // Calculate duration
                let duration = 'In progress'
                if (checkOutDate) {
                  const durationMinutes = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 60000)
                  duration = `${durationMinutes} min`
                }
                
                return (
                  <tr key={visit.id}>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{visit.metadata.visit_id}</p>
                        <p className="text-xs text-gray-500">{duration}</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">
                          {wharf ? wharf.metadata.name : 'Unknown Wharf'}
                        </p>
                        {wharf && (
                          <p className="text-xs text-gray-500">
                            {wharf.metadata.fishing_district} • {wharf.metadata.province_state?.value}
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-sm text-gray-900">
                          {user ? user.metadata.full_name : 'Unknown User'}
                        </p>
                        {user && (
                          <p className="text-xs text-gray-500">
                            {user.metadata.user_role?.value}
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-sm text-gray-900">
                          {checkInDate.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {checkInDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="text-lg font-semibold text-maritime">
                        {visit.metadata.boat_count}
                      </span>
                    </td>
                    <td className="text-center">
                      {visit.metadata.photos && visit.metadata.photos.length > 0 ? (
                        <div className="flex items-center justify-center space-x-1">
                          <ImageIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {visit.metadata.photos.length}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">None</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge badge-${visit.metadata.status?.key || 'completed'}`}>
                        {visit.metadata.status?.value || 'Completed'}
                      </span>
                    </td>
                    <td className="text-center">
                      {visit.metadata.synced_to_crm ? (
                        <span className="text-green-600 font-medium">✓ Synced</span>
                      ) : (
                        <span className="text-gray-400">Pending</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {visits.length === 0 && (
          <div className="text-center py-12">
            <Ship className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No visits recorded</h3>
            <p className="text-gray-600">Field visits will appear here once brokers start logging wharf visits.</p>
          </div>
        )}
      </main>
    </div>
  )
}