import { FC, useState, useMemo, useCallback, useEffect } from "react"
import { GripButton } from "../modules/grid-button"

export const ImageGrid: FC<{
  sideCount: number
  size: number
  values?: number[]
  isSelectMode?: boolean
  onSelected?: (selectedIndexes: number[]) => void
}> = ({ sideCount, size, values, isSelectMode, onSelected }) => {
  const [isOnFocused, setIsOnFocused] = useState<boolean>(false)
  const [isOnSelecting, setIsOnSelecting] = useState<boolean>(false)
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
        if (isOnSelecting) {
          newSet.add(key)
        } else {
          newSet.delete(key)
        }
        return newSet
      })
    },
    [isOnSelecting]
  )

  useEffect(() => {
    if (!isSelectMode) return
    if (!isOnFocused && onSelected) {
      onSelected(
        [...selectedSet]
          .map((key) => key.split(","))
          .map(([row, col]) => Number(row) * sideCount + Number(col))
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnFocused])
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
      onMouseLeave={() => isOnFocused && setIsOnFocused(false)}
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
            if (!isSelectMode) return
            setIsOnFocused(true)
            setIsOnSelecting(!selectedSet.has(key))
            toggleSelectedList(item)
          }}
          onUnFocused={() => isSelectMode && setIsOnFocused(false)}
          onOver={(item) => {
            if (isSelectMode && isOnFocused) toggleSelectedList(item)
          }}
        />
      ))}
    </div>
  )
}
