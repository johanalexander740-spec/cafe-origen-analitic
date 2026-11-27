//Min reto 1//

/**
 * MiniReto 9 – Implementaciones lineales
 */

/**
 * Devuelve un array con los IDs de los clientes que aparecen más de una vez
 * usando un Set para registrar los clientes vistos.
 * @param {Array} ventas - arreglo de objetos venta
 * @returns {Array} lista de clientes recurrentes (sin duplicados)
 */
function clientesRecurrentesSet(ventas) {
    const vistos = new Set();
    const recurrentes = new Set();
    for (const v of ventas) {
        const cli = v.cliente;
        if (vistos.has(cli)) {
            recurrentes.add(cli);
        } else {
            vistos.add(cli);
        }
    }
    return Array.from(recurrentes);
}

/**
 * Cuenta cuántas compras hizo cada cliente y devuelve un objeto con:
 *  - mapa: Map<cliente, cantidad>
 *  - recurrentes: array de clientes con más de una compra
 * @param {Array} ventas
 * @returns {{mapa: Map, recurrentes: Array}}
 */
function comprasPorCliente(ventas) {
    const mapa = new Map();
    for (const v of ventas) {
        const cli = v.cliente;
        mapa.set(cli, (mapa.get(cli) || 0) + v.cantidad);
    }
    const recurrentes = [];
    for (const [cli, cant] of mapa.entries()) {
        if (cant > 1) recurrentes.push(cli);
    }
    return { mapa, recurrentes };
}


const ventas = require('./datos');

console.log("Cantidad de registro ", ventas.length);

console.log("Primer registro:", ventas[0]);

console.log("Ultimo registro:", ventas[ventas.length - 1]);

console.log("Producto en posicion 4:", ventas[4].producto);

console.table(ventas);


//Min reto 2//


//Valor de las ventas totales//
function ValorVenta(ventas) {

    return ventas.cantidad * ventas.precio;
}
console.log(ValorVenta(ventas[0]));




//Total vendido//
function totalVendido(ventas) {

    let total = 0;


    for (const venta of ventas) {

        total = total + ValorVenta(venta);
    }
    return total;

}

console.log("Total vendido:", totalVendido(ventas));

// For = para, le pido que lea la constante venta de ventas "venta son los alores individuales de toda la lista, mientras que ventas es la lista completa"
//El error fue en el cierre de la funcion y colocar 
// totalVendido en la sumatoria del total en ves de 
// crear una nueva variable en este caso llamada ValorVenta//


//Unidades vendidas//

function unidadesVendidas(ventas) {

    let TotalUnidades = 0;
    for (const venta of ventas) {

        TotalUnidades = TotalUnidades + venta.cantidad

    }

    return TotalUnidades;
}
console.log("Total unidades:", unidadesVendidas(ventas));

//Para ver el resultado en consola debo de llamar a la funcion, en este caso a unidadesVendidas,//
//antes no salia porque estaba era llamando a la variable let TotalUnidades//
//¿Por qué da NaN? En el ciclo definiste: for (const venta of ventas).venta (en singular) es cada fila u objeto individual (el que sí tiene { cantidad: 2 }).
//ventas (en plural) es el arreglo completo de 12 registros.
//Un arreglo en JavaScript no tiene la propiedad .cantidad (los arreglos tienen .length, no .cantidad). Por eso, ventas.cantidad devuelve undefined.
//Cuando intentas sumar un número con algo indefinido:
//0 + undefined= 𝑁𝑎𝑁 (Not a Number) 0 + undefined=NaN (Not a Number)//



//Venta mayor//

function VentaMayor(ventas) {

    if (ventas.length === 0) {
        return null;
    }
    let mayor = ventas[0];

    for (const venta of ventas) {

        if (ValorVenta(venta) > ValorVenta(mayor)) {
            mayor = venta;
        }
    }
    return mayor;
}
console.log("La venta mayor:", VentaMayor(ventas));
//Primero miramos si existen ventas (if(ventas.lenght === 0)) si no , devuelve null, si no fue el caso continua
//Lo explicare con en ejemplo, en ves de ventas esto es una baraja y vamos a comparar la carta de mayor valor
// Para eso primero miramos si tenemos baraja, con el if de antes, luego creamos una variable la cual tomara la primera carta y la usara de referencia
// Digamos que salio 1 en la primera cara, bueno el let mayor la tendra almacenada, luego, mirar toda la baraja con el for of
// si al mirar de nuevo la baraja sale una carta mayor al 1 digamos 4 let mayor cambia su valos de 1 a 4
// y asi se repite hasta que la baraja se acabe y quedamos con la carta en este caso ventas de mayor valor



function TicketPromedioVentas(ventas) {

    let total = 0
    let ventasValidadas = 0;

    for (const venta of ventas)

        if (venta.cantidad > 0) {

            total = total + ValorVenta(venta);
            ventasValidadas++;
        }

    if (ventasValidadas === 0) return 0;

    return Math.round(total / ventasValidadas);

}

console.log("Promedio de ventas:", TicketPromedioVentas(ventas));


//let es un estado = puede cambiar, const es una constante = no puede variar


function ventasPorCiudad(ventas, ciudad) {
    let totalCiudad = 0;
    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadBuscada) {
            totalCiudad = totalCiudad + ValorVenta(venta);
        }
    }

    return totalCiudad;
}


console.log("Ventas Medellín:", ventasPorCiudad(ventas, "  Medellín "));

console.log("Ventas Bogotá:", ventasPorCiudad(ventas, "bogotá"));

console.log("Ventas vacío:", ventasPorCiudad([], "Medellín"));

//arrgelos//

const unaSolaVenta = [ventas[0]];
const sinVentas = [];

console.log("=== 1. PRUEBAS totalVendido ===");

console.log("Completo (12):", totalVendido(ventas));

console.log("Un elemento:  ", totalVendido(unaSolaVenta));

console.log("Vacío:        ", totalVendido(sinVentas));


console.log("\n=== 2. PRUEBAS unidadesVendidas ===");

console.log("Completo (12):", unidadesVendidas(ventas));

console.log("Un elemento:  ", unidadesVendidas(unaSolaVenta));

console.log("Vacío:        ", unidadesVendidas(sinVentas));


console.log("\n=== 3. PRUEBAS ventaMayor ===");

console.log("Completo (12):", VentaMayor(ventas));

console.log("Un elemento:  ", VentaMayor(unaSolaVenta));

console.log("Vacío:        ", VentaMayor(sinVentas));

console.log("\n=== 4. PRUEBAS ticketPromedio ===");

console.log("Completo (12):", TicketPromedioVentas(ventas));

console.log("Un elemento:  ", TicketPromedioVentas(unaSolaVenta));

console.log("Vacío:        ", TicketPromedioVentas(sinVentas));

console.log("\n=== 5. PRUEBAS ventasPorCiudad (Medellín) ===");

console.log("Completo (12):", ventasPorCiudad(ventas, "Medellín"));

console.log("Un elemento:  ", ventasPorCiudad(unaSolaVenta, "Medellín"));

console.log("Vacío:        ", ventasPorCiudad(sinVentas, "Medellín"));


//arreglos de array//


//total vendidos//

function totalVendidoM(ventas) {
    return ventas.reduce((total, venta) => {
        const valorActual = ValorVenta(venta);
        console.log(`Acumulado=${total} | Venta actual=${valorActual}`);
        return total + valorActual;
    }, 0);
}

console.log("Total vendido con reduce:", totalVendidoM(ventas));

//UnidadesVendidas//

function UnidadesVendidasM(ventas) {
    return ventas.reduce((total, venta) => {
        console.log(`Acumulado=${total} | Cantidad=${venta.cantidad}`);
        return total + venta.cantidad;
    }, 0);
}

console.log("Unidades vendidas con reduce:", UnidadesVendidasM(ventas));

//ventas por ciudad//

function VentasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter((venta) => venta.ciudad.trim().toLowerCase() === ciudadBuscada)
        .reduce((acumulado, venta) => {
            const valor = ValorVenta(venta);
            console.log(`Acumulado=${acumulado} | Ciudad=${venta.ciudad} | Venta actual=${valor}`);
            return acumulado + valor;
        }, 0);
}

console.log("Ventas por ciudad con reduce:", VentasPorCiudadM(ventas, "Medellín"));



function normalizarCiudad(ciudad) {
    const limpia = ciudad.trim().toLowerCase();
    return limpia.charAt(0).toUpperCase() + limpia.slice(1);
}

console.log("Normalizar Medellín:", normalizarCiudad("  medellín "));

function ventasDelDia(ventas, fecha) {
    return ventas.filter(venta => venta.fecha === fecha);
}

// Unidades totales por cada producto
function unidadesPorProducto(ventas) {
    const unidades = {};
    for (const venta of ventas) {
        unidades[venta.producto] = (unidades[venta.producto] || 0) + venta.cantidad;
    }
    return unidades;
}


function topProductosPorValor(ventas, limite = 3) {
    const ingresos = {};
    for (const venta of ventas) {
        ingresos[venta.producto] = (ingresos[venta.producto] || 0) + ValorVenta(venta);
    }
    return Object.entries(ingresos)
        .map(([producto, total]) => ({ producto, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, limite);
}


function ventasPorCiudadResumen(ventas) {
    const resumen = {};
    for (const venta of ventas) {
        const ciudadNormalizada = normalizarCiudad(venta.ciudad);
        resumen[ciudadNormalizada] = (resumen[ciudadNormalizada] || 0) + ValorVenta(venta);
    }
    return resumen;
}


// Versión original (fuerza bruta) – O(n²)
function clientesRecurrentes(ventas) {

    const recurrentes = [];
    let comparaciones = 0;

    for (let i = 0; i < ventas.length; i++) {

        for (let j = i + 1; j < ventas.length; j++) {

            comparaciones++;

            if (

                ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente))
                recurrentes.push(ventas[i].cliente);
        }

    }
    recurrentes._comparaciones = comparaciones;
    return recurrentes;
}

// ------------------------------------------------------------

// Optimización 2 – usando Map para contar compras por cliente
function comprasPorCliente(ventas) {
    const conteo = new Map();
    for (const venta of ventas) {
        const actual = conteo.get(venta.cliente) || 0;
        conteo.set(venta.cliente, actual + 1);
    }
    // obtener los clientes con más de una compra
    const recurrentes = [];
    for (const [cliente, cant] of conteo.entries()) {
        if (cant > 1) recurrentes.push(cliente);
    }
    // retornamos tanto el mapa como el arreglo de recurrentes
    return { mapa: conteo, recurrentes };
}


const recurrentes = [];
let comparaciones = 0;

for (let i = 0; i < ventas.length; i++) {

    for (let j = i + 1; j < ventas.length; j++) {

        comparaciones++;

        if (

            ventas[i].cliente === ventas[j].cliente &&
            !recurrentes.includes(ventas[i].cliente))
            recurrentes.push(ventas[i].cliente);
    }

}
recurrentes._comparaciones = comparaciones;
return recurrentes;




// Optimización 2 – usando Map para contar compras por cliente
function comprasPorCliente(ventas) {
    const conteo = new Map();
    for (const venta of ventas) {
        const actual = conteo.get(venta.cliente) || 0;
        conteo.set(venta.cliente, actual + 1);
    }
    const recurrentes = [];
    for (const [cliente, cant] of conteo.entries()) {
        if (cant > 1) recurrentes.push(cliente);
    }
    return { mapa: conteo, recurrentes };
}

// Import catalog for combo functions
const catalogo = require('./catalogo');

function comboRegaloBruto(catalogo, valor) {
    for (let i = 0; i < catalogo.length; i++) {
        for (let j = i + 1; j < catalogo.length; j++) {
            if (catalogo[i].precio + catalogo[j].precio === valor) {
                return [catalogo[i].producto, catalogo[j].producto];
            }
        }
    }
    return null;
}


function comboRegalo(catalogo, valor) {
    const vistos = new Map(); // precio -> producto
    for (const item of catalogo) {
        const complement = valor - item.precio;
        if (vistos.has(complement)) {
            return [vistos.get(complement), item.producto];
        }
        vistos.set(item.precio, item.producto);
    }
    return null;
}


function productoEstrellaPorCiudad(ventas) {
    const porCiudad = new Map(); // ciudad -> Map(producto -> count)
    for (const v of ventas) {
        const ciudad = v.ciudad.trim().toLowerCase();
        const prod = v.producto;
        if (!porCiudad.has(ciudad)) {
            porCiudad.set(ciudad, new Map());
        }
        const mapaProd = porCiudad.get(ciudad);
        mapaProd.set(prod, (mapaProd.get(prod) || 0) + 1);
    }
    const resultado = {};
    for (const [ciudad, mapaProd] of porCiudad.entries()) {
        let maxCount = 0;
        let estrella = null;
        for (const [prod, cnt] of mapaProd.entries()) {
            if (cnt > maxCount) {
                maxCount = cnt;
                estrella = prod;
            }
        }
        // capitalizar ciudad para salida legible
        const ciudadFmt = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
        resultado[ciudadFmt] = estrella;
    }
    return resultado;
}

function primerClienteUnico(ventas) {
    const cuenta = new Map();
    for (const v of ventas) {
        const cli = v.cliente;
        cuenta.set(cli, (cuenta.get(cli) || 0) + 1);
    }
    for (const v of ventas) {
        if (cuenta.get(v.cliente) === 1) {
            return v.cliente;
        }
    }
    return null;
}

// Export new functions (add to existing export block)
module.exports = {
    // Funciones básicas
    ValorVenta,
    totalVendido,
    unidadesVendidas,
    unidadesVendidasM: UnidadesVendidasM,
    VentaMayor,
    ventaMayor: VentaMayor,
    TicketPromedioVentas,
    ticketPromedio: TicketPromedioVentas,
    ventasPorCiudad,
    ventasPorCiudadM: VentasPorCiudadM,
    normalizarCiudad,
    ventasDelDia,
    VentasDelDia: ventasDelDia,
    unidadesPorProducto,
    topProductosPorValor,
    ventasPorCiudadResumen,
    // MiniReto 9
    clientesRecurrentes,
    clientesRecurrentesSet,
    comprasPorCliente,
    // MiniReto 10
    comboRegaloBruto,
    comboRegalo,
    productoEstrellaPorCiudad,
    primerClienteUnico
};
