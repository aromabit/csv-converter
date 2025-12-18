import { FC, useState } from "react"
import { Button } from "../form"

export const SeekBar: FC<{
  time: number
  length: number
  onChangeTime: (t: number) => void
}> = ({ time, length, onChangeTime }) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  return (
    <div style={{ alignItems: "center", display: "flex", gap: "1rem" }}>
      <div style={{ textAlign: "right", width: "4rem" }}>{time}</div>
      <input
        type="range"
        min={0}
        max={length - 1}
        value={time}
        onChange={({ target: { value } }) => onChangeTime(Number(value))}
        style={{ width: "100%" }}
      />
      <Button
        onClick={() => {
          if (!timer) {
            const timer = setInterval(() => {
              onChangeTime(++time % length)
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
  )
}
