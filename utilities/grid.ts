type Direction = { dr: number; dc: number }
type Position = { r: number; c: number }

const CARDINAL_DIRECTIONS: Direction[] = [
  { dr: -1, dc: 0 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
]

const DIAGONAL_DIRECTIONS: Direction[] = [
  { dr: -1, dc: -1 },
  { dr: -1, dc: 1 },
  { dr: 1, dc: -1 },
  { dr: 1, dc: 1 },
]

export const groupAdjacent = (
  cells: Set<number>,
  side: number = 60,
  diagonal = true
): number[][] => {
  const visited = new Set<number>()
  const groups: number[][] = []

  const directions = diagonal
    ? [...CARDINAL_DIRECTIONS, ...DIAGONAL_DIRECTIONS]
    : CARDINAL_DIRECTIONS

  const indexToPosition = (index: number): Position => ({
    r: Math.floor(index / side),
    c: index % side,
  })

  const positionToIndex = (r: number, c: number): number => r * side + c

  const isValidPosition = (r: number, c: number): boolean =>
    r >= 0 && r < side && c >= 0 && c < side

  const getAdjacentCells = (index: number): number[] => {
    const { r, c } = indexToPosition(index)
    return directions
      .map(({ dr, dc }) => ({ r: r + dr, c: c + dc }))
      .filter(({ r, c }) => isValidPosition(r, c))
      .map(({ r, c }) => positionToIndex(r, c))
      .filter((adjIndex) => cells.has(adjIndex) && !visited.has(adjIndex))
  }

  const exploreGroup = (startIndex: number): number[] => {
    const stack = [startIndex]
    const group: number[] = []
    visited.add(startIndex)

    while (stack.length > 0) {
      const currentIndex = stack.pop()!
      group.push(currentIndex)

      const adjacentCells = getAdjacentCells(currentIndex)
      adjacentCells.forEach((adjIndex) => {
        visited.add(adjIndex)
        stack.push(adjIndex)
      })
    }

    return group
  }

  for (const cellIndex of cells) {
    if (!visited.has(cellIndex)) {
      const group = exploreGroup(cellIndex)
      groups.push(group)
    }
  }

  return groups
}
