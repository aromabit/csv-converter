"use client"

import { ChangeEvent, FC, useRef, useState } from "react"
import { Button } from "../components/form"
import { downloadCSV } from "../utilities/csv"
import { Dialog } from "../components/modules/dialog"
import { FormatForm } from "../components/features/format-form"
import { getFormatFromStorage } from "../utilities/storage"

const Page: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [format, setFormat] = useState<Format>()
  const [csvData, setCsvData] = useState<{
    filename: string
    data: string[][]
    timestamps: string[]
    length: number
    columnLength?: number
    rowLength?: number
  }>()
  const [isOpenFromatFormDialog, setIsOpenFromatFormDialog] =
    useState<boolean>(false)
  const [formatList, setFormatList] = useState<Format[]>(() =>
    getFormatFromStorage()
  )

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const rows = text
      .split(/\r\n|\n/)
      .map((row) => row.split(",").map((cell) => cell.trim()))
      .filter((row) => row.length > 1)
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
    e.target.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!csvData) return
    if (!format) {
      alert("Please select a format")
      return
    }
    const convertedData = csvData.data.map((row) =>
      format.selectedIndexes.map((i) => row[i])
    )
    console.log({ formatList })
    downloadCSV({
      filename: `converted-${csvData.filename}`,
      data: convertedData,
    })
    setCsvData(undefined)
  }

  return (
    <>
      <section
        style={{
          background: "#f9f9f9",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          maxWidth: "64rem",
          padding: "1rem",
          width: "100%",
        }}
      >
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
            <div style={{ display: "flex", gap: "1rem" }}>
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
            <Button onClick={() => setIsOpenFromatFormDialog(true)}>New</Button>
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
              <Button type="button" onClick={handleFileButtonClick}>
                Choose CSV File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleChangeFile}
              />
            </div>
            {csvData && (
              <div>
                <p>{csvData.filename}</p>
                <p>
                  Sensor count: {csvData.length} ({csvData.columnLength}&times;
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
      </section>
      <Dialog
        onClose={() => setIsOpenFromatFormDialog(false)}
        open={isOpenFromatFormDialog}
      >
        {isOpenFromatFormDialog && (
          <FormatForm
            onCreate={() => {
              setIsOpenFromatFormDialog(false)
              setFormatList(getFormatFromStorage())
            }}
          />
        )}
      </Dialog>
    </>
  )
}

export default Page
