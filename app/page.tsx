"use client"

import React, { FC, useRef, useState } from "react"
import { Button } from "../components/form"

const Page: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [format, setFormat] = useState<string>("Random")

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <React.Fragment>
      <section
        style={{
          background: "#f9f9f9",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          maxWidth: "64rem",
          padding: "1rem",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "1rem", margin: 0 }}>Format</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          {["Random", "Sample1"].map((value) => (
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
            />
          </div>
          <div>
            <Button type="submit">Convert</Button>
          </div>
        </form>
      </section>
    </React.Fragment>
  )
}

export default Page
