interface BigConnectLogoProps {
  className?: string
  variant?: 'full' | 'icon'
  color?: 'light' | 'dark'
}

function BigConnectLogo({ className = '', variant = 'full', color = 'dark' }: BigConnectLogoProps) {
  const textColor = color === 'light' ? '#ffffff' : '#1e293b'
  const accentColor = color === 'light' ? '#93c5fd' : '#2563eb'
  const circleColor = '#2563eb'

  return (
    <svg
      viewBox={variant === 'full' ? '0 0 280 60' : '0 0 60 60'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BigConnect AI"
    >
      {/* Circle */}
      <circle cx="30" cy="30" r="27" stroke={circleColor} strokeWidth="4" fill="none" />

      {/* Waveform bars inside circle */}
      {/* Left dot */}
      <circle cx="16" cy="30" r="2.5" fill={circleColor} />

      {/* Left bar */}
      <rect x="22" y="20" width="3.5" height="20" rx="1.75" fill={circleColor} />

      {/* Center bar (tallest) */}
      <rect x="28.25" y="15" width="3.5" height="30" rx="1.75" fill={circleColor} />

      {/* Right bar */}
      <rect x="34.5" y="22" width="3.5" height="16" rx="1.75" fill={circleColor} />

      {/* Right plus/cross */}
      <rect x="41.5" y="28" width="7" height="3.5" rx="1.75" fill={circleColor} />
      <rect x="43.25" y="24" width="3.5" height="12" rx="1.75" fill={circleColor} />

      {/* Text (only for full variant) */}
      {variant === 'full' && (
        <>
          <text
            x="68"
            y="37"
            fontFamily="'Manrope', system-ui, sans-serif"
            fontWeight="600"
            fontSize="24"
            fill={textColor}
          >
            BigConnect
          </text>
          <text
            x="222"
            y="37"
            fontFamily="'Manrope', system-ui, sans-serif"
            fontWeight="700"
            fontSize="24"
            fill={accentColor}
          >
            AI
          </text>
        </>
      )}
    </svg>
  )
}

export default BigConnectLogo
