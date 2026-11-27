const ventas = require('./datos');
const {
    totalVendido,
    unidadesVendidas,
    TicketPromedioVentas,
    VentaMayor,
    ventasPorCiudadResumen,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require('./analitica');

// Función básica para dar formato de moneda en pesos colombianos
function formatoCOP(valor) {
    return "$" + Number(valor).toLocaleString("es-CO");
}


// RESUMEN GENERAL
const ventaTop = VentaMayor(ventas);
console.log(`Total Vendido:          ${formatoCOP(totalVendido(ventas))}`);
console.log(`Unidades Vendidas:      ${unidadesVendidas(ventas)} unidades`);
console.log(`Ticket Promedio:        ${formatoCOP(TicketPromedioVentas(ventas))}`);
if (ventaTop) {
    const valorMayor = ventaTop.cantidad * ventaTop.precio;
    console.log(`Mayor Venta:            ${formatoCOP(valorMayor)} (ID: ${ventaTop.id} - ${ventaTop.producto} en ${ventaTop.ciudad})`);
}

// VENTAS POR CIUDAD (Normalizadas, sin duplicados)
const resumenCiudades = ventasPorCiudadResumen(ventas);
const tablaCiudades = Object.entries(resumenCiudades).map(([ciudad, total]) => ({
    Ciudad: ciudad,
    "Total Vendido": formatoCOP(total)
}));
console.table(tablaCiudades);

// UNIDADES POR PRODUCTO
const resumenUnidades = unidadesPorProducto(ventas);
const tablaUnidades = Object.entries(resumenUnidades).map(([producto, unidades]) => ({
    Producto: producto,
    "Unidades Vendidas": unidades
}));
console.table(tablaUnidades);

//  TOP 3 PRODUCTOS POR VALOR RECAUDADO
const top3 = topProductosPorValor(ventas, 3);
const tablaTop3 = top3.map((item, index) => ({
    Puesto: `#${index + 1}`,
    Producto: item.producto,
    "Total Recaudado": formatoCOP(item.total)
}));
console.table(tablaTop3);

// Día con ventas
const fechaConVentas = "2026-09-01";
const ventasDia1 = ventasDelDia(ventas, fechaConVentas);
console.log(`\n• Día con ventas (${fechaConVentas}):`);
console.log(`  Registros:     ${ventasDia1.length}`);
console.log(`  Total:         ${formatoCOP(totalVendido(ventasDia1))}`);
console.log(`  Promedio:      ${formatoCOP(TicketPromedioVentas(ventasDia1))}`);

// Día sin ventas
const fechaSinVentas = "2026-09-15";
const ventasDia2 = ventasDelDia(ventas, fechaSinVentas);
console.log(`\n•Día sin ventas (${fechaSinVentas}):`);
console.log(`Registros:${ventasDia2.length}`);
console.log(`Total:${formatoCOP(totalVendido(ventasDia2))}`);
console.log(`Promedio:${formatoCOP(TicketPromedioVentas(ventasDia2))} (Manejo correcto de 0, sin NaN)`);
