import { ChangeEvent, FC, ReactNode, useRef } from "react"
import { Button } from "../form"

export const FileButton: FC<{
  children: ReactNode
  accept: string
  onChange: (File) => void
}> = ({ accept, onChange, children }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    onChange(file)
    e.target.value = null
  }
  return (
    <>
      <Button onClick={() => fileInputRef.current.click()}>{children}</Button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={handleChangeFile}
      />
    </>
  )
}
