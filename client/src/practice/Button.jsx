import React from 'react'

function Button({increment}) {
  return (
    <div>
        <button onClick={increment}> + </button>
    </div>
  )
}

export default Button