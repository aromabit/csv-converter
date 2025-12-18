import { FC, useState } from "react"
import { Card, CardTitle, Section } from "../components/layout"
import { FileButton } from "../components/modules/file-button"
import { isSquare } from "../utilities/math"
import { ImageGrid } from "./features/image-grid"
import { extractRawDataRows } from "../utilities/csv"
import { SeekBar } from "./features/seek-bar"

export const ImageViewer: FC = () => {
  const [sideCount, setSideCount] = useState<number>()
  const [values, setValues] = useState<number[][]>()
  const [time, setTime] = useState<number>(0)

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
            <SeekBar
              time={time}
              length={values.length}
              onChangeTime={(time) => setTime(time)}
            />
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
