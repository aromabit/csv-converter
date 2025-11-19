import { FC, useState, useMemo } from "react"
import { rgbToCss, valueToRGB } from "../../utilities/color"

export const GripButton: FC<{
  row: number
  col: number
  size?: number
  value?: number
  isSelected?: boolean
  onFocus?: (props: { col: number; row: number }) => void
  onOver?: (props: { col: number; row: number }) => void
  onUnFocused?: () => void
}> = ({
  row,
  col,
  size = 8,
  value,
  isSelected,
  onFocus,
  onOver,
  onUnFocused,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const backgroundColor = useMemo(() => {
    return value ? rgbToCss(valueToRGB(value, 4000)) : "#fff"
  }, [value])

  return (
    <button
      key={`${row}-${col}`}
      role="gridcell"
      aria-label={`row ${row + 1}, column ${col + 1}`}
      style={{
        background: backgroundColor,
        border: "none",
        borderRadius: 0,
        cursor: "pointer",
        filter: isSelected
          ? "brightness(20%)"
          : isHovered
            ? "invert(100%)"
            : undefined,
        height: `${size}px`,
        padding: 0,
        width: `${size}px`,
      }}
      onPointerEnter={() => {
        setIsHovered(true)
        onOver?.({ row, col })
      }}
      onPointerLeave={() => setIsHovered(false)}
      onMouseDown={() => onFocus?.({ row, col })}
      onMouseUp={() => onUnFocused?.()}
    />
  )
}
