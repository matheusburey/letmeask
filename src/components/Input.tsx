interface IProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export default function Input({ value, onChange, placeholder }: IProps) {
  return (
    <input
      className="border border-gray-300 py-3 px-4 rounded mb-2"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  )
}