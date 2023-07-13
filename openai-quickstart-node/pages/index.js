import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [preguntaInput, setPreguntaInput] = useState("");
  const [respuestaInput, setRespuestaInput] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pregunta_elaborada: preguntaInput,
          respuesta_corta: respuestaInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setPreguntaInput("");
      setRespuestaInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Banco Herramientas Test IA</h3>
        <form onSubmit={onSubmit}>
          <textarea
            name="pregunta_elaborada"
            placeholder="Enter an elaborated question"
            value={preguntaInput}
            onChange={(e) => setPreguntaInput(e.target.value)}
            className={styles.textarea}
            rows={4} // Establecer el número de filas para que quepan 4 párrafos
          />
          <textarea
            name="respuesta_corta"
            placeholder="Enter a short answer"
            value={respuestaInput}
            onChange={(e) => setRespuestaInput(e.target.value)}
            className={styles.textarea}
            rows={4} // Establecer el número de filas para que quepan 4 párrafos
          />
          <input type="submit" value="Generate report" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
