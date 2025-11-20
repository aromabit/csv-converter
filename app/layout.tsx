import "./reset.css"

export const metadata = {
  title: "Aroma Image sensor utility",
  description:
    "Aroma Image sensor utility is application which visializes raw data and converts CSV for CMOS Image sensor",
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
            Aroma Image sensor utility
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
            padding: "1rem",
          }}
        >
          {children}
        </main>
        <footer
          style={{
            fontSize: ".75rem",
            padding: "1rem",
          }}
        >
          <p>&copy; 2025 Aroma Bit, Inc.</p>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout
