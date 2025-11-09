import { useEffect, useState, type FC, type FormEvent } from "react"
import { Button, Input } from "../form"
import { saveFormatToStorage } from "../../utilities/storage"

const selectionModeList = ["manual"] as const
type SelectionMode = (typeof selectionModeList)[number]

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
  useEffect(() => {
    setFormat({
      ...format,
      selectedIndexes: Array(format.targetCount).fill(0),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format.targetCount])
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
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".25rem",
              }}
            >
              <label htmlFor="row" style={{ textTransform: "capitalize" }}>
                {key}
              </label>
              <Input
                type={key == "name" ? "text" : "number"}
                value={format[key]}
                onChange={({ target: { value } }) =>
                  setFormat({
                    ...format,
                    [key]: key == "name" ? value : Number(value),
                  })
                }
              />
            </div>
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
        {mode == "manual" && (
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
        )}
        <Button onClick={handleCreate}>Create</Button>
      </form>
    </>
  )
}
