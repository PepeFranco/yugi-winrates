const Main = ({ children }) => (
  <main
    style={{
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyItems: "center",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "720px",
      }}
    >
      {children}
    </div>

    <style jsx global>{`
      html,
      body {
        margin: 0px;
        padding: 0px;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </main>
);

export default Main;
