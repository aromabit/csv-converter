import type { ComponentProps, FC } from "react"

export const Button: FC<ComponentProps<"button">> = ({
  children,
  style,
  ...props
}) => (
  <button
    {...props}
    style={{
      background: "linear-gradient(135deg, #666 0%, #222 100%)",
      border: "none",
      borderRadius: ".5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      color: "#fff",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      padding: ".75rem 1.5rem",
      transition: "all 0.2s ease-in-out",
      ...style,
    }}
  >
    {children}
  </button>
)
