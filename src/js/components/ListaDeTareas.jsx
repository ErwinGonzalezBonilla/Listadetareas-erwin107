import React, { useState } from "react";
import '../../styles/index.css';



function InputTarea({ onAdd }) {
  const [tarea, setTarea] = useState("");

  function manejarKeyDown(e) {
    if (e.key === "Enter" && tarea.trim()) {
      onAdd(tarea.trim());
      setTarea("");
    }
  }

  return (
    <input
      type="text"
      placeholder="Añadir tarea..."
      value={tarea}
      onChange={(e) => setTarea(e.target.value)}
      onKeyDown={manejarKeyDown}
      style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
    />
  );
}

function Tarea({ texto, onEliminar }) {
  const [hover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span>{texto}</span>
      {hover && (
        <button
          onClick={onEliminar}
          style={{
            background: "transparent",
            border: "none",
            color: "red",
            cursor: "pointer",
          }}
        >
          ❌
        </button>
      )}
    </li>
  );
}

function ListaTareas({ tareas, eliminar }) {
  if (tareas.length === 0) {
    return <p>No hay tareas, añadir tareas</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tareas.map((tarea, i) => (
        <Tarea key={i} texto={tarea} onEliminar={() => eliminar(i)} />
      ))}
    </ul>
  );
}

export default function ListaDeTareas() {
  const [tareas, setTareas] = useState([]);

  function agregarTarea(tarea) {
    setTareas([...tareas, tarea]);
  }

  function eliminarTarea(index) {
    setTareas(tareas.filter((_, i) => i !== index));
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h1>Lista de Tareas</h1>
      <InputTarea onAdd={agregarTarea} />
      <ListaTareas tareas={tareas} eliminar={eliminarTarea} />
    </div>
  );
}

