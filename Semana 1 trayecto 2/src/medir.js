// Medición de complejidad de las funciones
const { GenerarVentasAzar, totalVendido, VentaMayor, ventasPorCiudad, primeraVenta } = require("./generador.js");
const { clientesRecurrentes,
    clientesRecurrentesSet,
    comprasPorCliente,
    comboRegalo,
    productoEstrellaPorCiudad,
    primerClienteUnico
} = require("./analitica.js");

const tamanos = [100, 1000, 10000, 100000];
const resultados = [];

for (const n of tamanos) {
    const ventas = GenerarVentasAzar(n);

    // Versión original (fuerza bruta)
    console.time(`clientesRecurrentes n=${n}`);
    clientesRecurrentes(ventas);
    console.timeEnd(`clientesRecurrentes n=${n}`);

    // Versión optimizada con Set
    console.time(`clientesRecurrentesSet n=${n}`);
    clientesRecurrentesSet(ventas);
    console.timeEnd(`clientesRecurrentesSet n=${n}`);

    // Contadores para otras funciones
    const contadorTotal = { operaciones: 0 };
    const contadorMayor = { operaciones: 0 };
    const contadorCiudad = { operaciones: 0 };
    const contadorPrimera = { operaciones: 0 }; // contador de operaciones
    // Medir tiempo de totalVendido
    console.time(`totalVendido n=${n}`);
    totalVendido(ventas, contadorTotal);
    console.timeEnd(`totalVendido n=${n}`);
    // Medir tiempo de ventaMayor
    console.time(`ventaMayor n=${n}`);
    VentaMayor(ventas, contadorMayor);
    console.timeEnd(`ventaMayor n=${n}`);
    // Medir tiempo de ventasPorCiudad
    console.time(`ventasPorCiudad n=${n}`);
    ventasPorCiudad(ventas, "Medellín", contadorCiudad);
    console.timeEnd(`ventasPorCiudad n=${n}`);
    // Medir tiempo de primeraVenta
    console.time(`primeraVenta n=${n}`);
    primeraVenta(ventas, contadorPrimera);
    console.timeEnd(`primeraVenta n=${n}`);
    // Ahora guardamos resultados (counters)

    totalVendido(ventas, contadorTotal);
    VentaMayor(ventas, contadorMayor);
    ventasPorCiudad(ventas, "Medellín", contadorCiudad);
    primeraVenta(ventas, contadorPrimera);

    resultados.push({
        n,
        totalVendido: contadorTotal.operaciones,
        ventaMayor: contadorMayor.operaciones,
        totalPorCiudad: contadorCiudad.operaciones,
        primeraVenta: contadorPrimera.operaciones
    });
}

console.table(resultados);


