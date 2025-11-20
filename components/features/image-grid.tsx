import { useState, useMemo, useCallback, useEffect, useRef, memo } from "react"
import { GripButton } from "../modules/grid-button"

export const ImageGrid = memo(function ImageGrid({
  sideCount,
  size,
  values,
  isSelectMode,
  onSelected,
}: {
  sideCount: number
  size: number
  values?: number[]
  isSelectMode?: boolean
  onSelected?: (selectedIndexes: number[]) => void
}) {
  const [isOnFocused, setIsOnFocused] = useState<boolean>(false)
  const [isOnSelecting, setIsOnSelecting] = useState<boolean>(false)
  const [selectedSet, setSelectedSet] = useState<Set<number>>(new Set())
  const [hoverIndex, setHoverIndex] = useState<number>()
  const [lastPointerIndex, setLastPointerIndex] = useState<number>()
  const gridRef = useRef<HTMLDivElement>(null)

  const gridItems = useMemo(() => {
    return Array(sideCount * sideCount)
      .fill(0)
      .map((_, index) => {
        return {
          index,
          value: values?.[index],
        }
      })
  }, [sideCount, values])

  const getIndexFromRect = useCallback(
    ({ clientX, clientY }: { clientX: number; clientY: number }) => {
      const rect = gridRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = clientX - rect.left
      const y = clientY - rect.top

      const col = Math.floor(x / size)
      const row = Math.floor(y / size)

      if (col < 0 || col >= sideCount || row < 0 || row >= sideCount) {
        return undefined
      }

      return row * sideCount + col
    },
    [size, sideCount]
  )

  const getLineIndexes = useCallback(
    (from: number, to: number) => {
      const indexes: number[] = []

      const fromCol = from % sideCount
      const fromRow = Math.floor(from / sideCount)
      const toCol = to % sideCount
      const toRow = Math.floor(to / sideCount)

      const dx = Math.abs(toCol - fromCol)
      const dy = Math.abs(toRow - fromRow)
      const sx = fromCol < toCol ? 1 : -1
      const sy = fromRow < toRow ? 1 : -1

      let err = dx - dy
      let currentCol = fromCol
      let currentRow = fromRow

      while (true) {
        const index = currentRow * sideCount + currentCol
        indexes.push(index)

        if (currentCol === toCol && currentRow === toRow) break

        const e2 = 2 * err
        if (e2 > -dy) {
          err -= dy
          currentCol += sx
        }
        if (e2 < dx) {
          err += dx
          currentRow += sy
        }
      }

      return indexes
    },
    [sideCount]
  )

  const toggleSelectedList = useCallback(
    ({ index }: { index: number }) => {
      setSelectedSet((prev) => {
        const newSet = new Set(prev)
        if (isOnSelecting) {
          newSet.add(index)
        } else {
          newSet.delete(index)
        }
        return newSet
      })
    },
    [isOnSelecting]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const index = getIndexFromRect(e)
      if (index === undefined) return

      if (!isOnFocused) {
        setHoverIndex(index)
        return
      }

      if (lastPointerIndex !== undefined && lastPointerIndex !== index) {
        const lineIndexes = getLineIndexes(lastPointerIndex, index)
        lineIndexes.forEach((lineIndex) => {
          if (lineIndex !== lastPointerIndex) {
            toggleSelectedList({ index: lineIndex })
          }
        })
      } else {
        toggleSelectedList({ index })
      }

      setLastPointerIndex(index)
      setHoverIndex(undefined)
    },
    [
      isOnFocused,
      lastPointerIndex,
      getIndexFromRect,
      getLineIndexes,
      toggleSelectedList,
    ]
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const index = getIndexFromRect(e)
      if (index === undefined) return

      setIsOnFocused(true)
      setIsOnSelecting(!selectedSet.has(index))
      setLastPointerIndex(index)
      toggleSelectedList({ index })
    },
    [getIndexFromRect, toggleSelectedList, selectedSet]
  )

  useEffect(() => {
    if (!isSelectMode) return
    if (!isOnFocused && onSelected) {
      onSelected([...selectedSet].toSorted((a, b) => a - b))
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
      onMouseLeave={useCallback(() => {
        setIsOnFocused(false)
        setHoverIndex(undefined)
        setLastPointerIndex(undefined)
      }, [])}
      onPointerDown={handlePointerDown}
      onPointerUp={useCallback(() => {
        setIsOnFocused(false)
        setLastPointerIndex(undefined)
      }, [])}
      onPointerMove={handlePointerMove}
      ref={gridRef}
    >
      {gridItems.map(({ index, value }) => (
        <GripButton
          key={index}
          index={index}
          size={size}
          value={value}
          isSelected={selectedSet.has(index)}
          isHovered={hoverIndex === index}
        />
      ))}
    </div>
  )
})
