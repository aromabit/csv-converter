import { ComponentProps, FC } from "react"

export const Dialog: FC<ComponentProps<"dialog"> & { onClose: () => void }> = ({
  onClose,
  children,
  open,
  ...props
}) => {
  return (
    <div
      onClick={() => onClose()}
      role="button"
      tabIndex={0}
      onKeyDown={() => onClose()}
      style={{
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: open ? "flex" : "none",
        height: "100vh",
        justifyContent: "center",
        left: 0,
        position: "fixed",
        top: 0,
        width: "100vw",
        zIndex: 1000,
      }}
    >
      <dialog
        {...props}
        open={open}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        style={{
          border: "none",
          borderRadius: ".5rem",
          maxHeight: "90vh",
          minHeight: "20rem",
          minWidth: "20rem",
          overflow: "scroll",
          padding: ".5rem",
          position: "relative",
          width: "80vw",
          zIndex: 1001,
        }}
      >
        {children}
      </dialog>
    </div>
  )
}
