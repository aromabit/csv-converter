import { FC, useState, useMemo, useCallback } from "react"
import { GripButton } from "../modules/grid-button"

export const ImageGrid: FC<{
  sideCount: number
  size: number
  values?: number[]
}> = ({ sideCount, size, values }) => {
  const [isOnFocused, setIsOnFocused] = useState<boolean>(false)
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set())

  const gridItems = useMemo(() => {
    return Array(sideCount * sideCount)
      .fill(0)
      .map((_, index) => {
        const row = Math.floor(index / sideCount)
        const col = index % sideCount
        return {
          key: `${row},${col}`,
          row,
          col,
          value: values?.[index],
        }
      })
  }, [sideCount, values])

  const toggleSelectedList = useCallback(
    (item: { col: number; row: number }) => {
      const key = `${item.row},${item.col}`
      setSelectedSet((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(key)) {
          newSet.delete(key)
        } else {
          newSet.add(key)
        }
        return newSet
      })
    },
    []
  )
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
      {gridItems.map(({ key, row, col, value }) => (
        <GripButton
          key={key}
          row={row}
          col={col}
          size={size}
          value={value}
          isSelected={selectedSet.has(key)}
          onFocus={(item) => {
            setIsOnFocused(true)
            toggleSelectedList(item)
          }}
          onUnFocused={() => setIsOnFocused(false)}
          onOver={(item) => isOnFocused && toggleSelectedList(item)}
        />
      ))}
    </div>
  )
}
