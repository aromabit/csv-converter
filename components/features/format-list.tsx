import { FC } from "react"
import { deleteFormatFromStorage } from "../../utilities/storage"

export const FormatList: FC<{
  formatList: Format[]
  onUpdate: () => void
}> = ({ formatList, onUpdate }) => {
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
    </div>
  )
}
