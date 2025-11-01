const FORMAT_STORAGE_KEY = "csv-converter-format" as const

export const saveFormatToStorage = (format: Format): Error | undefined => {
  const formatList: Format[] = JSON.parse(
    localStorage.getItem(FORMAT_STORAGE_KEY) ?? "[]"
  )
  if (formatList.find((f) => f.name === format.name))
    return new Error("Format name already exists")
  localStorage.setItem(
    FORMAT_STORAGE_KEY,
    JSON.stringify([...formatList, format])
  )
}

export const getFormatFromStorage = (): Format[] => {
  return JSON.parse(localStorage.getItem(FORMAT_STORAGE_KEY) ?? "[]")
}

export const clearFormatFromStorage = () => {
  localStorage.removeItem(FORMAT_STORAGE_KEY)
}
