import { GenerarVentasAzar, totalVendido, ventaMayor, totalPorCiudad, primeraVenta } from "./generador.js";
const tamanos = [100, 1000, 10000, 100000];
const resultados = [];

for (const n of tamanos) {
    const ventas = GenerarVentasAzar(n);

    const contadorTotal = { operaciones: 0 };
    const contadorMayor = { operaciones: 0 };
    const contadorCiudad = { operaciones: 0 };
    const contadorPrimera = { operaciones: 0 };

    totalVendido(ventas, contadorTotal);
    ventaMayor(ventas, contadorMayor);
    totalPorCiudad(ventas, "Medellín", contadorCiudad);
    primeraVenta(ventas, contadorPrimera);

    resultados.push({
        n,
        totalVendido: contadorTotal.operaciones,
        ventaMayor: contadorMayor.operaciones,
        totalPorCiudad: contadorCiudad.operaciones,
        primeraVenta: contadorPrimera.operaciones
    });
}

console.table(resultados)