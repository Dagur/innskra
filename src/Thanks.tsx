import React from 'react'

interface Props {
  onOk: () => void,
}

export default function Thanks({ onOk }: Props) {
  return (
    <div>
      <p>Takk fyrir. Góða skemmtun</p>
      <button
        className="input"
        onClick={onOk}>Skrá fleiri</button>
    </div>
  )
}