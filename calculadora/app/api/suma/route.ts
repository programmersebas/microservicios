import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // para recibir los datos del fronted de next
    const body = await request.json();
    const { expresion } = body;

    //  Llamar al microservicio de Go (dentro de la red de Docker)

    const resGo = await fetch("http://localhost:8080/add?num1=?&num2=?", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expresion }),
    });

    const data = await resGo.json();

    // Devolver la respuesta al cliente
    return NextResponse.json(data);
  } catch (error) {
    console.error("DETALLE DEL ERROR:", error); // imprimir el error en terminal
    return NextResponse.json({ error: "Fallo interno" }, { status: 500 });
  }
  //return NextResponse.json(
  //  { error: "Error conectando con Go" },
  // { status: 500 },
  // );
}
