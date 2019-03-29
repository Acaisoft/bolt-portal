import React from 'react'

function TestRun(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      {...props}
    >
      <path
        d="M14.0239 8.78087L6.62469 14.7002C5.96993 15.2241 5 14.7579 5 13.9194L5 8L5 2.08062C5 1.24212 5.96993 0.775945 6.6247 1.29976L14.0239 7.21913C14.5243 7.61946 14.5243 8.38054 14.0239 8.78087Z"
        stroke="#CFCFEA"
        strokeWidth="1.5"
      />
      <path d="M1 1V15" stroke="#CFCFEA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default TestRun
