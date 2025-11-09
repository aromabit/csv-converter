import { FC, useState } from "react"

export const GripButton: FC<{ row: number; col: number; size?: number }> = ({
  row,
  col,
  size = 8,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  return (
    <button
      key={`${row}-${col}`}
      role="gridcell"
      aria-label={`row ${row + 1}, column ${col + 1}`}
      style={{
        backgroundColor: isHovered ? "rgba(0, 0, 0, 0.5)" : "#fff",
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
