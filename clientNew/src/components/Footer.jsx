import React from 'react'

const Footer = () => {
  return (
    <>
    
    {/* Footer */}
    <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">AutoFix Pro</span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} AutoFix Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer