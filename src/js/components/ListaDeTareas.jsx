import React, { useState, useEffect } from "react";
import '../../styles/index.css';

const API_USER = "erwin107";

const InputTarea = ({ onAdd }) => {
  const [tarea, setTarea] = useState("");

  const manejarKeyDown = (e) => {
    if (e.key === "Enter" && tarea.trim()) {
      onAdd(tarea.trim());
      setTarea("");
    }
  };

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
};

const Tarea = ({ texto, onEliminar }) => {
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
      <span>{texto.label}</span>
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
};

const ListaTareas = ({ tareas, eliminar }) => {
  if (tareas.length === 0) {
    return <p>No hay tareas, añadir tareas</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tareas.map((tarea) => (
        <Tarea key={tarea.id} texto={tarea} onEliminar={() => eliminar(tarea.id)} />
      ))}
    </ul>
  );
};

const ListaDeTareas = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerTareas();
  }, []);

  const crearUsuario = async () => {
    await fetch(`https://playground.4geeks.com/todo/users/${API_USER}`, {
      method: 'POST',
    });
  };

  const obtenerTareas = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/users/${API_USER}`);
    if (!response.ok) {
      await crearUsuario();
    } else {
      const data = await response.json();
      setTareas(data.todos);
    }
  };

  const agregarTarea = async (texto) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${API_USER}`, {
      method: 'POST',
      body: JSON.stringify({
        label: texto,
        is_done: false,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    obtenerTareas();
  };

  const eliminarTarea = async (id) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: 'DELETE',
    });
    obtenerTareas();
  };

  const limpiarTareas = async () => {
    for (let tarea of tareas) {
      await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
        method: 'DELETE',
      });
    }
    obtenerTareas();
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h1>Lista de Tareas</h1>
      <InputTarea onAdd={agregarTarea} />
      <ListaTareas tareas={tareas} eliminar={eliminarTarea} />
      <p>{tareas.length} tarea(s)</p>
      <button onClick={limpiarTareas} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Limpiar todas las tareas
      </button>
    </div>
  );
};

export default ListaDeTareas;




