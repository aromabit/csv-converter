import { ComponentProps, FC } from "react"

export const Section: FC<ComponentProps<"section">> = ({ style, ...props }) => {
  return (
    <section
      {...props}
      style={{ maxWidth: "64rem", width: "100%", ...style }}
    ></section>
  )
}

export const CardTitle: FC<ComponentProps<"h2">> = ({
  children,
  style,
  ...props
}) => {
  return (
    <h2
      {...props}
      style={{ color: "#666", fontSize: "1rem", padding: ".5rem", ...style }}
    >
      {children}
    </h2>
  )
}

export const Card: FC<ComponentProps<"div">> = ({ style, ...props }) => {
  return (
    <section
      {...props}
      style={{
        background: "#f9f9f9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
        ...style,
      }}
    />
  )
}
