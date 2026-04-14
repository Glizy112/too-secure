import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <Navbar />
      {children}
    </div>
  );
}