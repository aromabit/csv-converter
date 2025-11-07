import { FC } from "react"
import {
  deleteFormatFromStorage,
  getFormatFromStorage,
  saveFormatsToStorage,
} from "../../utilities/storage"
import { Button } from "../form"
import { downloadJSON } from "../../utilities/json"
import { FileButton } from "../modules/file-button"

export const FormatList: FC<{
  formatList: Format[]
  onUpdate: () => void
}> = ({ formatList, onUpdate }) => {
  const handleImport = async (file: File) => {
    if (!file) return
    const text = await file.text()
    try {
      const data = JSON.parse(text) as FormatDataJSON
      const duplicated = data.formatList.find((f) =>
        formatList.some((format) => format.name == f.name)
      )
      if (duplicated) {
        alert(`Format is uplicated: ${duplicated.name}`)
        return
      }
      const error = saveFormatsToStorage(data.formatList)
      if (error) {
        alert(error)
        return
      }
      onUpdate()
    } catch {
      alert("Invalid data format")
    }
  }
  const handelDownload = () => {
    const formatList = getFormatFromStorage()
    downloadJSON<FormatDataJSON>({
      filename: "format.json",
      data: { formatList },
    })
  }
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Format list</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          {formatList.map((format) => (
            <tr key={format.name}>
              <td>{format.name}</td>
              <td>
                {format.column} x {format.row}
              </td>
              <td>{format.selectedIndexes.join(",")}</td>
              <td>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    const error = deleteFormatFromStorage(format)
                    if (error) {
                      alert(error)
                      return
                    }
                    onUpdate()
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          justifyContent: "space-between",
          padding: ".5rem",
        }}
      >
        <FileButton onChange={handleImport} accept=".json">
          Import format data
        </FileButton>
        <Button onClick={handelDownload}>Download format data</Button>
      </div>
    </div>
  )
}
