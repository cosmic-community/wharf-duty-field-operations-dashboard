import Link from 'next/link'
import { BarChart3, MapPin, Ship, Users, TrendingUp, Clock } from 'lucide-react'
import { getWharves, getVisits, getTrips, getUsers } from '@/lib/cosmic'
import type { Wharf, Visit, Trip, User } from '@/types'

export default async function HomePage() {
  // Fetch all data for dashboard statistics
  const wharves = await getWharves() as Wharf[]
  const visits = await getVisits() as Visit[]
  const trips = await getTrips() as Trip[]
  const users = await getUsers() as User[]

  // Calculate dashboard statistics
  const stats = {
    totalWharves: wharves.length,
    totalVisits: visits.length,
    totalTrips: trips.length,
    totalUsers: users.length,
    highPriorityWharves: wharves.filter(w => w.metadata.priority?.key === 'high').length,
    activeTrips: trips.filter(t => t.metadata.trip_status?.key === 'in_progress').length,
    completedVisits: visits.filter(v => v.metadata.status?.key === 'completed').length,
  }

  // Calculate average boats per visit
  const totalBoats = visits.reduce((sum, visit) => sum + (visit.metadata.boat_count || 0), 0)
  const avgBoatsPerVisit = visits.length > 0 ? Math.round(totalBoats / visits.length) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-maritime text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Wharf Duty Dashboard</h1>
              <p className="text-maritime-200 mt-1">Novi Marine Brokers Field Operations</p>
            </div>
            <Ship className="w-12 h-12 text-maritime-300" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Wharves</p>
                <p className="text-3xl font-bold text-maritime mt-1">{stats.totalWharves}</p>
              </div>
              <MapPin className="w-10 h-10 text-primary-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.highPriorityWharves} high priority
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visits</p>
                <p className="text-3xl font-bold text-maritime mt-1">{stats.totalVisits}</p>
              </div>
              <Ship className="w-10 h-10 text-ocean" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.completedVisits} completed
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Trips</p>
                <p className="text-3xl font-bold text-maritime mt-1">{stats.activeTrips}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.totalTrips} total trips
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Boats/Visit</p>
                <p className="text-3xl font-bold text-maritime mt-1">{avgBoatsPerVisit}</p>
              </div>
              <BarChart3 className="w-10 h-10 text-purple-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.totalUsers} active users
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/wharves" className="block">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 rounded-lg p-3">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Wharves</h3>
                  <p className="text-sm text-gray-600">View wharf database</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/visits" className="block">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-ocean-light/20 rounded-lg p-3">
                  <Ship className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Visits</h3>
                  <p className="text-sm text-gray-600">Track field visits</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/trips" className="block">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Trips</h3>
                  <p className="text-sm text-gray-600">Plan routes</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/users" className="block">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                  <p className="text-sm text-gray-600">Manage team</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {visits.slice(0, 5).map((visit) => {
              const wharf = typeof visit.metadata.wharf === 'object' ? visit.metadata.wharf : null
              const user = typeof visit.metadata.user === 'object' ? visit.metadata.user : null
              
              return (
                <div key={visit.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="bg-ocean-light/20 rounded-full p-2">
                      <Ship className="w-5 h-5 text-ocean" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {wharf ? wharf.title : 'Unknown Wharf'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user ? user.metadata.full_name : 'Unknown User'} • {visit.metadata.boat_count} boats observed
                      </p>
                    </div>
                  </div>
                  <span className={`badge badge-${visit.metadata.status?.key || 'completed'}`}>
                    {visit.metadata.status?.value || 'Completed'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}