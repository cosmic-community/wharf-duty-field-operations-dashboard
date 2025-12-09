import Link from 'next/link'
import { ArrowLeft, Clock, MapPin } from 'lucide-react'
import { getTrips } from '@/lib/cosmic'
import type { Trip, User, Wharf } from '@/types'

export default async function TripsPage() {
  const trips = await getTrips() as Trip[]

  // Sort by trip date (most recent first)
  const sortedTrips = [...trips].sort((a, b) => {
    const dateA = new Date(a.metadata.trip_date).getTime()
    const dateB = new Date(b.metadata.trip_date).getTime()
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
              <h1 className="text-3xl font-bold">Trip Planning</h1>
              <p className="text-maritime-200 mt-1">{trips.length} planned routes</p>
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
                <th>Trip Details</th>
                <th>Broker</th>
                <th>Base Location</th>
                <th>Planned Wharves</th>
                <th>Working Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedTrips.map((trip) => {
                const user = typeof trip.metadata.user === 'object' ? trip.metadata.user as User : null
                const plannedWharves = Array.isArray(trip.metadata.planned_wharves) 
                  ? trip.metadata.planned_wharves.filter((w): w is Wharf => typeof w === 'object')
                  : []
                const tripDate = new Date(trip.metadata.trip_date)
                
                return (
                  <tr key={trip.id}>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{trip.metadata.trip_id}</p>
                        <p className="text-sm text-gray-600">
                          {tripDate.toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
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
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-900">
                            {trip.metadata.base_location_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {trip.metadata.base_lat.toFixed(4)}, {trip.metadata.base_lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-maritime">
                          {plannedWharves.length} wharves
                        </p>
                        {plannedWharves.length > 0 && (
                          <p className="text-xs text-gray-500">
                            {plannedWharves.map(w => w.metadata.name).join(', ')}
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">
                            {trip.metadata.working_hours} hours
                          </p>
                          {trip.metadata.estimated_total_time && (
                            <p className="text-xs text-gray-500">
                              Est. {trip.metadata.estimated_total_time} min
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${trip.metadata.trip_status?.key || 'planned'}`}>
                        {trip.metadata.trip_status?.value || 'Planned'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {trips.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trips planned</h3>
            <p className="text-gray-600">Trip routes will appear here once brokers start planning their daily routes.</p>
          </div>
        )}
      </main>
    </div>
  )
}