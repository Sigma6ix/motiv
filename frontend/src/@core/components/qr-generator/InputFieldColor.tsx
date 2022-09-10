import * as React from 'react'

interface IInputFieldProps {
  className: string
  name: string
  min?: number
  max?: number
  step?: number
  defaultValue?: string | number
  handleChange: (target: any) => void
  hideLabel?: boolean
  value?: string | number
}

export const InputFieldColor = ({
  name,
  handleChange,
  min,
  max,
  step,
  defaultValue,
  hideLabel,
  value,
  className
}: IInputFieldProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
      {!hideLabel && <label>{name}</label>}
      <input
        type='color'
        id={name}
        name={name}
        onChange={handleChange}
        min={min}
        max={max}
        step={step || 1}
        defaultValue={defaultValue}
        value={value}
        className={className}
      />
    </div>
  )
}
