import { useState, type FC, type FormEvent } from "react"
import { Button, Input } from "../form"

export const FormatForm: FC = () => {
  const [format, setFormat] = useState<{ column: number; row: number }>({
    column: 60,
    row: 60,
  })
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {["row", "column"].map((key) => (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".25rem",
              }}
            >
              <label htmlFor="row">{key.toUpperCase()}</label>
              <Input
                type="number"
                value={format[key]}
                onChange={({ target: { value } }) =>
                  setFormat({ ...format, [key]: value })
                }
              />
            </div>
          ))}
        </div>
        <Button>Create</Button>
        <table>
          <tbody>
            {Array(format.row)
              .fill(0)
              .map((_, r) => (
                <tr key={r}>
                  {Array(format.column)
                    .fill(0)
                    .map((_, c) => (
                      <td key={c}>
                        <input type="radio" name={`${r}`} required />
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </form>
    </>
  )
}
