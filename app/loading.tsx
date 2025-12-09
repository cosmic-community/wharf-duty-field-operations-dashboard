import { Ship } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Ship className="w-16 h-16 text-maritime animate-bounce mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    </div>
  )
}