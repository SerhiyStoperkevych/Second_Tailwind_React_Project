import React from 'react'

const Test: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg border-2 border-transparent hover:border-4 hover:border-blue-500 transition-all duration-300">
            Hover Me!
        </button>
    </div>
  )
}

export default Test
