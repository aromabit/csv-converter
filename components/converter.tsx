import { FC, useEffect, useState } from "react"
import { Card, CardTitle, Section } from "../components/layout"
import { FileButton } from "../components/modules/file-button"
import { downloadCSV, extractRawDataRows } from "../utilities/csv"
import { getFormatFromStorage } from "../utilities/storage"
import { Button } from "./form"
import { Dialog } from "./modules/dialog"
import { FormatForm } from "./features/create-format-form"
import { FormatList } from "./features/format-list"

export const Converter: FC = () => {
  const [format, setFormat] = useState<Format>()
  const [csvData, setCsvData] = useState<{
    filename: string
    data: string[][]
    timestamps: string[]
    length: number
    columnLength?: number
    rowLength?: number
  }>()
  const [isOpenFormatFormDialog, setIsOpenFormatFormDialog] =
    useState<boolean>(false)
  const [isOpenFormatListDialog, setIsOpenFormatListDialog] =
    useState<boolean>(false)
  const [formatList, setFormatList] = useState<Format[]>([])

  useEffect(() => {
    Promise.resolve().then(() => setFormatList(getFormatFromStorage()))
  }, [])

  const handleChangeFile = async (file: File) => {
    if (!file) return
    const text = await file.text()
    const rows = extractRawDataRows(text)
    const length = rows[0].length - 1
    const lengthSquareRoot = Math.sqrt(length)

    setCsvData({
      filename: file.name,
      timestamps: rows.map((row) => row[0]),
      data: rows.map((row) => row.slice(1)),
      length,
      columnLength: Number.isInteger(lengthSquareRoot)
        ? lengthSquareRoot
        : undefined,
      rowLength: Number.isInteger(lengthSquareRoot)
        ? lengthSquareRoot
        : undefined,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!csvData) return
    if (!format) {
      alert("Please select a format")
      return
    }
    const convertedData = csvData.data.map((row) =>
      format.selectedIndexes.map((i) => row[i - 1])
    )
    console.log({ formatList })
    downloadCSV({
      filename: `converted-${csvData.filename}`,
      data: convertedData,
    })
    setCsvData(undefined)
  }
  return (
    <Section>
      <CardTitle>Converter</CardTitle>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h2 style={{ fontSize: "1rem", margin: 0 }}>Format</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".5rem",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: ".5rem" }}>
              {formatList.map((format) => (
                <label key={format.name}>
                  <input
                    type="radio"
                    name="format"
                    value={format.name}
                    onChange={() => setFormat(format)}
                  />
                  &nbsp;{format.name}
                </label>
              ))}
            </div>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Button onClick={() => setIsOpenFormatListDialog(true)}>
                Detail
              </Button>
              <Button onClick={() => setIsOpenFormatFormDialog(true)}>
                New
              </Button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h2 style={{ fontSize: "1rem", margin: 0 }}>Convert csv</h2>
          <form
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <FileButton accept=".csv" onChange={handleChangeFile}>
                Choose CSV File
              </FileButton>
            </div>
            {csvData && (
              <div>
                <p>{csvData.filename}</p>
                <p>
                  Sensor count: {csvData.length} ({csvData.columnLength}
                  &times;
                  {csvData.rowLength})
                </p>
              </div>
            )}
            <div>
              <Button type="submit" disabled={!csvData}>
                Convert
              </Button>
            </div>
          </form>
        </div>
      </Card>
      <Dialog
        onClose={() => setIsOpenFormatFormDialog(false)}
        open={isOpenFormatFormDialog}
      >
        {isOpenFormatFormDialog && (
          <FormatForm
            onCreate={() => {
              setIsOpenFormatFormDialog(false)
              setFormatList(getFormatFromStorage())
            }}
          />
        )}
      </Dialog>
      <Dialog
        onClose={() => setIsOpenFormatListDialog(false)}
        open={isOpenFormatListDialog}
      >
        {isOpenFormatListDialog && (
          <FormatList
            formatList={formatList}
            onUpdate={() => {
              setFormatList(getFormatFromStorage())
            }}
          />
        )}
      </Dialog>
    </Section>
  )
}
