import { FC } from "react"
import { Card, CardTitle, Section } from "../components/layout"
import { FileButton } from "../components/modules/file-button"

export const ImageViewer: FC = () => {
  return (
    <Section>
      <CardTitle>Image viewer</CardTitle>
      <Card>
        <div>
          <FileButton accept=".csv" onChange={() => {}}>
            Select file
          </FileButton>
        </div>
      </Card>
    </Section>
  )
}
