import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
import { getWharves } from '@/lib/cosmic'
import type { Wharf } from '@/types'

export default async function WharvesPage() {
  const wharves = await getWharves() as Wharf[]

  // Sort by priority (high first) and then by name
  const sortedWharves = [...wharves].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const aPriority = priorityOrder[a.metadata.priority?.key || 'low']
    const bPriority = priorityOrder[b.metadata.priority?.key || 'low']
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }
    
    return a.title.localeCompare(b.title)
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
              <h1 className="text-3xl font-bold">Wharves Database</h1>
              <p className="text-maritime-200 mt-1">{wharves.length} fishing wharves across Atlantic Canada</p>
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
                <th>Wharf Name</th>
                <th>Location</th>
                <th>Fishing District</th>
                <th>Type</th>
                <th>Avg Boats</th>
                <th>Last Visit</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {sortedWharves.map((wharf) => {
                const lastVisitDate = wharf.metadata.last_visit_date
                  ? new Date(wharf.metadata.last_visit_date).toLocaleDateString()
                  : 'Never visited'
                
                return (
                  <tr key={wharf.id}>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{wharf.metadata.name}</p>
                        {wharf.metadata.local_name && (
                          <p className="text-xs text-gray-500">{wharf.metadata.local_name}</p>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {wharf.metadata.province_state?.value || 'Unknown'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {wharf.metadata.latitude.toFixed(4)}, {wharf.metadata.longitude.toFixed(4)}
                      </p>
                    </td>
                    <td className="font-medium text-gray-700">
                      {wharf.metadata.fishing_district}
                    </td>
                    <td>
                      <span className="badge bg-blue-100 text-blue-800">
                        {wharf.metadata.wharf_type?.value || 'Unknown'}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-lg font-semibold text-maritime">
                        {wharf.metadata.avg_boat_count || 0}
                      </span>
                    </td>
                    <td className="text-sm text-gray-600">
                      {lastVisitDate}
                    </td>
                    <td>
                      <span className={`badge badge-${wharf.metadata.priority?.key || 'low'}`}>
                        {wharf.metadata.priority?.value || 'Low'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {wharves.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No wharves found</h3>
            <p className="text-gray-600">Start by adding wharves to your Cosmic bucket.</p>
          </div>
        )}
      </main>
    </div>
  )
}