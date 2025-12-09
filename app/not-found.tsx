import Link from 'next/link'
import { Ship } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <Ship className="w-20 h-20 text-maritime-300 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-maritime mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}