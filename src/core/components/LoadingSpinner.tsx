interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  const sizeMap = { sm: '16px', md: '32px', lg: '48px' }

  return (
    <div
      className="loading-spinner"
      style={{ width: sizeMap[size], height: sizeMap[size] }}
      role="status"
      aria-label="Loading"
    />
  )
}

export default LoadingSpinner
