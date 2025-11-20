import { useMemo, memo } from "react"
import { rgbToCss, valueToRGB } from "../../utilities/color"

export const GripButton = memo(function GripButton({
  index,
  size = 8,
  value,
  isSelected,
  isHovered
}: {
  index: number
  size?: number
  value?: number
  isSelected?: boolean
  isHovered?: boolean
}) {
  const backgroundColor = useMemo(() => {
    return value ? rgbToCss(valueToRGB(value, 4000)) : "#fff"
  }, [value])

  return (
    <button
      key={index}
      role="gridcell"
      aria-label={`${index}`}
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
    />
  )
})
