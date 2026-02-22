"use client";
import { useState } from "react";

export default function Calculadora() {
  const [display, setDisplay] = useState("0");

  const inputDigit = (digit: string) => {
    setDisplay(display === "0" ? digit : display + digit);
  };

  {
    /*const calculate = () => {
    try {
      // eval realiza calculos entre string
      setDisplay(eval(display).toString());
    } catch {
      setDisplay("Error");
    }
  };
  */
  }

  const calcular = async () => {
    try {
      let operador = ""; // para poder obtener simbolo matematico
      let endpoint = ""; // guarda la ruta del backend

      if (display.includes("+")) {
        operador = "+";
        endpoint = "add";
      } else if (display.includes("-")) {
        operador = "-";
        endpoint = "subtract";
      } else if (display.includes("*")) {
        operador = "*";
        endpoint = "multiply";
      } else if (display.includes("/")) {
        operador = "/";
        endpoint = "divide";
      }

      const [num1, num2] = display.split(operador);

      const res = await fetch(
        ` http://localhost:8080/${endpoint}?num1=${num1}&num2=${num2}`,
      );

      if (!res.ok) throw new Error("Server error");

      //const data = await res.text();// recoje texto
      const data = await res.json();

      setDisplay(data.resultado.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  {
    /*
  const calculo = async () => {
    try {
      const response = await fetch('/api/calcular', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expresion: display }), // Envías la operación a Go
      });
      const data = await response.json();
      setDisplay(data.resultado.toString());
    } catch (error) {
      setDisplay("Error de Conexión");
    }
  };
  */
  }
  const clear = () => setDisplay("0");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500">
      <div className="w-72 rounded-2xl bg-black p-4 shadow-xl">
        {/* Creacion de Pantalla */}
        <div className="mb-4 text-right text-4xl text-white overflow-hidden">
          {display}
        </div>

        {/* creacion de Teclado */}
        <div className="grid grid-cols-4 gap-2">
          {[
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "*",
            "1",
            "2",
            "3",
            "-",
            "0",
            ".",
            "=",
            "+",
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => (btn === "=" ? calcular() : inputDigit(btn))}
              className="h-14 rounded-full bg-gray-700 text-xl text-white hover:bg-gray-600 transition-colors"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={clear}
            className="col-span-4 mt-2 h-12 rounded-full bg-red-500 text-white font-bold"
          >
            AC
          </button>
        </div>
      </div>
    </div>
  );
}
