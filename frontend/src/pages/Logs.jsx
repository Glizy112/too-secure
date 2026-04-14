import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/admin/logs").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <Layout>
      <h2>Security Logs</h2>
      {logs.map((log) => (
        <div 
          key={log.id}
          style={{
            borderBottom: "1px solid #eee",
            padding: "10px 0",
          }}
        >
          <strong>{log.action}</strong>
          <p>{log.status}</p>
          <small>{log.timestamp}</small>
        </div>
      ))}
    </Layout>
  );
}