import { useEffect, useState, type FC, type FormEvent } from "react"
import { Button, Input } from "../form"
import { saveFormatToStorage } from "../../utilities/storage"
import { isSquare } from "../../utilities/math"
import { ImageGrid } from "./image-grid"
import { FileButton } from "../modules/file-button"
import { extractRawDataRows } from "../../utilities/csv"

const selectionModeList = ["image", "manual"] as const
type SelectionMode = (typeof selectionModeList)[number]

const TextField: FC<{
  label: string
  value: string | number
  type?: "text" | "number"
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ label, value, type = "text", onChange }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
      <label htmlFor={label} style={{ textTransform: "capitalize" }}>
        {label}
      </label>
      <Input type={type} value={value} onChange={onChange} />
    </div>
  )
}

export const FormatForm: FC<{ onCreate: () => void }> = ({ onCreate }) => {
  const [format, setFormat] = useState<Format>({
    version: "0.1",
    name: "New format",
    sourceCount: 3600,
    targetCount: 12,
    selectedIndexes: [],
    updatedAt: Date.now(),
  })
  const [mode, setMode] = useState<SelectionMode>("manual")
  const [sideCount, setSideCount] = useState<number>()
  const [values, setValues] = useState<number[][]>()
  useEffect(() => {
    const root = isSquare(format.sourceCount)
    setSideCount(root)
  }, [format.sourceCount])
  useEffect(() => {
    setFormat({
      ...format,
      selectedIndexes: Array(format.targetCount).fill(0),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format.targetCount])
  const handleFileChange = async (file: File) => {
    if (!file) return
    const text = await file.text()
    const rows = extractRawDataRows(text)
    const sensorCount = rows[0].length - 1
    const root = isSquare(sensorCount)
    setSideCount(root)
    if (root) {
      setValues(
        rows.map((row) => row.slice(1).map((c) => Math.floor(Number(c))))
      )
    }
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  const handleCreate = () => {
    const error = saveFormatToStorage({ ...format, updatedAt: Date.now() })
    if (error) {
      alert(error)
      return
    }
    onCreate()
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
          {["name", "sourceCount", "targetCount"].map((key) => (
            <TextField
              key={key}
              type={key == "name" ? "text" : "number"}
              label={key}
              value={format[key]}
              onChange={({ target: { value } }) =>
                setFormat({
                  ...format,
                  [key]: key == "name" ? value : Number(value),
                })
              }
            />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: ".5rem" }}>
          {selectionModeList.map((value) => (
            <label key={value} style={{ textTransform: "capitalize" }}>
              <input
                type="radio"
                name="mode"
                value={mode}
                checked={mode === value}
                onChange={() => setMode(value)}
              />
              &nbsp;{value}
            </label>
          ))}
        </div>
        {mode == "image" && (
          <>
            {values && (
              <ImageGrid
                sideCount={sideCount}
                size={8}
                values={values[0]}
                isSelectMode={true}
                onSelected={(selectedIndexes) =>
                  setFormat({ ...format, selectedIndexes })
                }
              />
            )}
            {!values && (
              <div>
                <FileButton accept=".csv" onChange={handleFileChange}>
                  Choose csv file
                </FileButton>
              </div>
            )}
          </>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: ".5rem",
          }}
        >
          {format.selectedIndexes.map((s, i) => (
            <div key={i} style={{ position: "relative" }}>
              <Input
                value={s}
                max={format.sourceCount}
                placeholder={`${i + 1}`}
                style={{
                  maxWidth: "6rem",
                  padding: ".5rem",
                  paddingLeft: "1.5rem",
                  textAlign: "right",
                }}
                onChange={({ target: { value } }) =>
                  setFormat({
                    ...format,
                    selectedIndexes: format.selectedIndexes.map((s, si) =>
                      si == i ? Number(value) : s
                    ),
                  })
                }
              />
              <div
                style={{
                  fontSize: ".5rem",
                  position: "absolute",
                  left: ".5rem",
                  top: ".5rem",
                }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleCreate}>Create</Button>
      </form>
    </>
  )
}
