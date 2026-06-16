import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface FilterOption {
  value: string
  label: string
  dot?: string // Tailwind color class for dot indicator
}

interface FilterDropdownProps {
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
  placeholder?: string
  icon?: React.ReactNode
}

function FilterDropdown({ value, onChange, options, placeholder = 'Filter', icon }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('keydown', handleKey)
      return () => document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const selectedOption = options.find((o) => o.value === value)
  const displayLabel = selectedOption?.label || placeholder

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-medium transition ${
          open
            ? 'border-blue-600 bg-white text-slate-900'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
        }`}
      >
        {icon}
        {selectedOption?.dot && (
          <span className={`h-2 w-2 rounded-full ${selectedOption.dot}`} />
        )}
        <span>{displayLabel}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-1.5 animate-in">
          {/* Header */}
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Filter by status</p>
          </div>

          {/* Options */}
          <div className="py-1">
            {options.map((option) => {
              const isSelected = value === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-[13px] transition ${
                    isSelected
                      ? 'bg-blue-50/50 text-blue-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {/* Dot indicator */}
                  {option.dot ? (
                    <span className={`h-2 w-2 rounded-full ${option.dot}`} />
                  ) : (
                    <span className="h-2 w-2" />
                  )}

                  {/* Label */}
                  <span className="flex-1 text-left">{option.label}</span>

                  {/* Check mark */}
                  {isSelected && (
                    <Check className="h-4 w-4 text-blue-600" strokeWidth={2} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
