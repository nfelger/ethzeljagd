import React from 'react'

export default function Para({ children, extraClassNames}) {
  return (
    <div className={`p-6 text-center ${extraClassNames || ""}`}>
      {children}
    </div>
  )
}

