const ventas = require('./datos');

console.log(`Total de ventas registradas: ${ventas.length}\n`);
console.table(ventas);

console.log("\n--- DETECCIÓN DE ANOMALÍAS EN LOS DATOS ---");

//Ciudades con problemas de mayúsculas/minúsculas o espacios
const ciudadesCrudas = [...new Set(ventas.map(v => v.ciudad))];
console.log("Ciudades encontradas:", ciudadesCrudas);
console.log("-> Anomalía detectada: 'medellín' y 'Medellín' aparecen como dos ciudades distintas.");

// Registros con cantidad cero
const ventasCero = ventas.filter(v => v.cantidad === 0);
console.log(`\nVentas con cantidad cero: ${ventasCero.length} registro(s)`);
ventasCero.forEach(v => console.log(`   - ID ${v.id}: ${v.producto} en ${v.ciudad} con cantidad ${v.cantidad}`));
