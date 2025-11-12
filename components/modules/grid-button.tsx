import { FC, useState } from "react"
import { rgbToCss, valueToRGB } from "../../utilities/color"

export const GripButton: FC<{
  row: number
  col: number
  size?: number
  value?: number
  onClick?: (props: { col: number; row: number }) => void
}> = ({ row, col, size = 8, value, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  return (
    <button
      key={`${row}-${col}`}
      role="gridcell"
      aria-label={`row ${row + 1}, column ${col + 1}`}
      style={{
        background: value ? rgbToCss(valueToRGB(value, 4000)) : "#fff",
        border: "none",
        borderRadius: 0,
        cursor: "pointer",
        filter: isHovered && "brightness(20%)",
        height: `${size}px`,
        padding: 0,
        width: `${size}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
      onClick={() => onClick?.({ row, col })}
      onDragOver={() => onClick?.({ row, col })}
    />
  )
}
