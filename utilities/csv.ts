export const downloadCSV = ({
  filename,
  data,
}: {
  filename: string
  data: (string | number)[][]
}) => {
  const blob = new Blob(
    [
      new Uint8Array([0xef, 0xbb, 0xbf]),
      data.map((row) => row.map((col) => `${col}`).join(",")).join("\n"),
    ],
    { type: "text/csv" }
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  a.remove()
}
