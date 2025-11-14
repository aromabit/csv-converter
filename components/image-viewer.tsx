import { FC, useState } from "react"
import { Card, CardTitle, Section } from "../components/layout"
import { FileButton } from "../components/modules/file-button"
import { isSquare } from "../utilities/math"
import { ImageGrid } from "./features/image-grid"
import { extractRawDataRows } from "../utilities/csv"
import { Button } from "./form"

export const ImageViewer: FC = () => {
  const [sideCount, setSideCount] = useState<number>()
  const [values, setValues] = useState<number[][]>()
  const [time, setTime] = useState<number>(0)
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const handleChangeFile = async (file: File) => {
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
  return (
    <Section>
      <CardTitle>Image viewer</CardTitle>
      <Card>
        {sideCount && (
          <>
            <ImageGrid sideCount={sideCount} size={10} values={values[time]} />
            <div style={{ alignItems: "center", display: "flex", gap: "1rem" }}>
              <div style={{ textAlign: "right", width: "4rem" }}>{time}</div>
              <input
                type="range"
                min={0}
                max={values.length - 1}
                value={time}
                onChange={({ target: { value } }) => setTime(Number(value))}
                style={{ width: "100%" }}
              />
              <Button
                onClick={() => {
                  if (!timer) {
                    const timer = setInterval(() => {
                      setTime((time) => ++time % values.length)
                    }, 100)
                    setTimer(timer)
                  } else {
                    clearTimeout(timer)
                    setTimer(undefined)
                  }
                }}
              >
                {timer ? "Stop" : "Start"}
              </Button>
            </div>
          </>
        )}
        <div>
          <FileButton accept=".csv" onChange={handleChangeFile}>
            Select file
          </FileButton>
        </div>
      </Card>
    </Section>
  )
}
