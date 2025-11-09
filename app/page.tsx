"use client"

import { FC } from "react"

import { ImageViewer } from "../components/image-viewer"
import { Converter } from "../components/converter"

const Page: FC = () => {
  return (
    <>
      <ImageViewer />
      <Converter />
    </>
  )
}

export default Page
