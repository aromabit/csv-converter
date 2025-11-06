export const downloadJSON = <D>({
  filename,
  data,
}: {
  filename: string
  data: D
}) => {
  const blob = new Blob([JSON.stringify(data, null, "  ")], {
    type: "application/json",
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  a.remove()
}
