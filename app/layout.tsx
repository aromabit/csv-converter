import "./reset.css"

export const metadata = {
  title: "Aroma CSV converter",
  description: "Aroma CSV converter is for CMOS Image sensor",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>
        <header
          style={{
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: ".5rem",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "1rem",
              margin: 0,
            }}
          >
            Aroma CSV converter
          </h1>
        </header>
        <main
          style={{
            alignItems: "center",
            background: "#f0f0f0",
            display: "flex",
            flexFlow: "column",
            gap: "1rem",
            justifyContent: "center",
            minHeight: "calc(100dvh - 3rem)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
export default RootLayout
