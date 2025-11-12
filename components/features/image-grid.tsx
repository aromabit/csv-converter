import { FC, useState } from "react"
import { GripButton } from "../modules/grid-button"

export const ImageGrid: FC<{
  sideCount: number
  size: number
  values?: number[]
}> = ({ sideCount, size, values }) => {
  const [isOnFocused, setIsOnFocused] = useState<boolean>(false)
  const [selectedList, setSelectedList] = useState<
    { col: number; row: number }[]
  >([])
  const toggleSelectedList = (item: { col: number; row: number }) =>
    selectedList.some((s) => s.col == item.col && s.row == item.row)
      ? setSelectedList(
          selectedList.filter((s) => !(s.col == item.col && s.row == item.row))
        )
      : setSelectedList([...selectedList, item])
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
                value={values && values[row * sideCount + col]}
                isSelected={selectedList.some(
                  (s) => s.col == col && s.row == row
                )}
                onFocus={(item) => {
                  setIsOnFocused(true)
                  toggleSelectedList(item)
                }}
                onUnFocused={() => setIsOnFocused(false)}
                onOver={(item) => isOnFocused && toggleSelectedList(item)}
              />
            ))
        )}
      {JSON.stringify(selectedList)}
    </div>
  )
}
