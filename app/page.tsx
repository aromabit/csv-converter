"use client"

import React, { ChangeEvent, FC, useRef, useState } from "react"
import { Button } from "../components/form"
import { downloadCSV } from "../utilities/csv"
import { Dialog } from "../components/modules/dialog"
import { FormatForm } from "../components/features/format-form"

const Page: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [format, setFormat] = useState<string>("Random")
  const [csvData, setCsvData] = useState<{
    filename: string
    data: string[][]
    timestamps: string[]
    columnLength: number
    rowLength: number
  }>()
  const [randomList, setRandomList] = useState<number[]>([])
  const [isOpenFromatFormDialog, setIsOpenFromatFormDialog] =
    useState<boolean>(false)

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
    const rowLength = Number(rows[1][1])
    const columnLength = Number(rows[1][2])
    const expectedCells = rowLength * columnLength
    if (rows[0].length - 3 !== expectedCells) {
      alert(
        `The number of cells does not match. Expected number of cells: ${expectedCells}, Actual number of cells: ${rows[0].length - 3}`
      )
      return
    }
    setCsvData({
      filename: file.name,
      timestamps: rows.map((row) => row[0]),
      data: rows.map((row) => row.slice(3)),
      columnLength,
      rowLength,
    })
    e.target.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (format == "Random")
      setRandomList(
        Array(csvData.rowLength)
          .fill(0)
          .map(
            (_, r) =>
              Math.floor(Math.random() * csvData.columnLength) +
              r * csvData.columnLength
          )
      )
    downloadCSV({
      filename: `converted-${csvData.filename}`,
      data: convertedData,
    })
    setCsvData(undefined)
  }

  const convertedData = csvData?.data.map((row, i) => {
    const { rowLength, columnLength, timestamps } = csvData
    return [
      timestamps[i],
      ...Array(rowLength)
        .fill(0)
        .map((_, j) => {
          if (format === "First") {
            return row[j * columnLength]
          } else {
            return row[randomList[j]]
          }
        }),
    ]
  })

  return (
    <React.Fragment>
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
              {["Random", "First"].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="format"
                    value={format}
                    onChange={() => setFormat(value)}
                  />
                  &nbsp;{value}
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
        <FormatForm />
      </Dialog>
    </React.Fragment>
  )
}

export default Page
