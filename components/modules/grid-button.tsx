import { FC, useState } from "react"
import { rgbToCss, valueToRGB } from "../../utilities/color"

export const GripButton: FC<{
  row: number
  col: number
  size?: number
  value?: number
}> = ({ row, col, size = 8, value }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  return (
    <button
      key={`${row}-${col}`}
      role="gridcell"
      aria-label={`row ${row + 1}, column ${col + 1}`}
      style={{
        backgroundColor: value
          ? rgbToCss(valueToRGB(value, 4000))
          : isHovered
            ? "rgba(0, 0, 0, 0.5)"
            : "#fff",
        border: "none",
        borderRadius: 0,
        cursor: "pointer",
        height: `${size}px`,
        padding: 0,
        width: `${size}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onBlur={() => setIsHovered(false)}
    />
  )
}
