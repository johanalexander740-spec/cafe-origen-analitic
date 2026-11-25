const ventas = require('./datos');
const {
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ventasPorCiudadM
} = require('./analitica');

// Función auxiliar para comparar e imprimir el resultado
function comprobar(nombreIndicador, valorCiclo, valorMetodo) {
    const estado = valorCiclo === valorMetodo ? "OK" : "DIFERENTE";
    console.log(`${nombreIndicador}: Ciclo = ${valorCiclo} | Métodos = ${valorMetodo} -> [${estado}]`);
}
// Función auxiliar para normalizar nombres de ciudad ("  Bogotá " y "medellín" -> "Bogotá" y "Medellín")
function normalizarCiudad(ciudad) {
    const limpia = ciudad.trim().toLowerCase();
    if (!limpia) return "";
    return limpia.charAt(0).toUpperCase() + limpia.slice(1);
}

// 2. Total vendido agrupado por ciudad (usando reduce)
function totalPorCiudad(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const ciudad = normalizarCiudad(venta.ciudad);
        acumulador[ciudad] = (acumulador[ciudad] || 0) + valorVenta(venta);
        return acumulador;
    }, {});
}

// Unidades vendidas agrupadas por producto (usando reduce)
function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const producto = venta.producto.trim();
        acumulador[producto] = (acumulador[producto] || 0) + venta.cantidad;
        return acumulador;
    }, {});
}

//  Top K productos que más dinero generaron, de mayor a menor (sin mutar el arreglo original)
function topProductosPorValor(ventas, k) {
    // Agrupamos el dinero total generado por cada producto con reduce
    const totalesPorProducto = ventas.reduce((acumulador, venta) => {
        const producto = venta.producto.trim();
        acumulador[producto] = (acumulador[producto] || 0) + valorVenta(venta);
        return acumulador;
    }, {});

    // Transformamos el objeto en arreglo con Object.entries y .map
    return Object.entries(totalesPorProducto)
        .map(([producto, total]) => ({ producto, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, k);
}

