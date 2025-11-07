type Format = {
  version: string
  name: string
  column: number
  row: number
  selectedIndexes: number[]
  updatedAt: number
}

type FormatDataJSON = { formatList: Format[] }
