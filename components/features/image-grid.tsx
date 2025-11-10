import { FC } from "react"
import { GripButton } from "../modules/grid-button"

export const ImageGrid: FC<{
  sideCount: number
  size: number
  values?: number[]
}> = ({ sideCount, size, values }) => {
  return (
    <div
      style={{
        border: "solid 1px #ccc",
        display: "grid",
        gridTemplateColumns: `repeat(${sideCount}, ${size}px)`,
        gridAutoRows: `${size}px`,
        gap: 0,
        width: "max-content",
      }}
    >
      {Array(sideCount)
        .fill(0)
        .map((_, row) =>
          Array(sideCount)
            .fill(0)
            .map((_, col) => (
              <GripButton
                key={`${row},${col}`}
                row={row}
                col={col}
                size={size}
                value={values[row * sideCount + col]}
              />
            ))
        )}
    </div>
  )
}
