type Format = {
  version: string
  name: string
  sourceCount: number
  targetCount: number
  selectedIndexes: number[]
  groupedIndexes?: number[][]
  updatedAt: number
}

type FormatDataJSON = { formatList: Format[] }
