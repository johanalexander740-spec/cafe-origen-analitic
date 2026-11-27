export {
    GenerarVentasAzar,
    totalVendido,
    VentaMayor,
    ventasPorCiudad,
    primeraVenta
};
const PRODUCTOS = [

    { fecha: "2026-04-15", producto: "Origen Sierra 500 g", precio: 45000 },
    { fecha: "2026-05-13", producto: "Origen Huila 500 g", precio: 42000 },
    { fecha: "2026-06-01", producto: "Prensa francesa", precio: 95000 },
    { fecha: "2026-07-15", producto: "Origen Nariño 250 g", precio: 26000 },
]
const ciudades = ["Medellín", "Bogotá", "Pereira", "Cali"]


function CalculoAzar(min, max) {
    const posicion = max - min + 1;
    const resultado = Math.floor(Math.random() * posicion)
    return resultado + min;
}

function GenerarVentasAzar(n) {
    const ventas = []
    const TotalClientes = Math.max(1, Math.floor(n / 3))
    for (let i = 1; i <= n; i++) {

        const ProductIndice = CalculoAzar(0, PRODUCTOS.length - 1)
        const productosAzar = PRODUCTOS[ProductIndice]
        const CiudadIndice = CalculoAzar(0, ciudades.length - 1)
        const CiudadesAzar = ciudades[CiudadIndice]
        const cantidad = CalculoAzar(1, 5)
        const numCliente = CalculoAzar(1, TotalClientes);
        let cliente;
        if (numCliente < 10) {
            cliente = "C0" + numCliente;
        }
        else {
            cliente = "C" + numCliente;

        }
        ventas.push({ id: i, fecha: productosAzar.fecha, cliente: cliente, producto: productosAzar.producto, ciudad: CiudadesAzar, cantidad: cantidad, precio: productosAzar.precio })

    }
    return ventas
}
console.table(GenerarVentasAzar(10)); //<- el 10 es la cantiad de ventas, si yo meto otro numero digamos 11 saldran 11 generaciones de ventas y etc


const contador = { operaciones: 0 };
const listaPrueba = GenerarVentasAzar(5);
console.log("Total:", totalVendido(listaPrueba, contador), "Operaciones:", contador.operaciones);

function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido(ventas, contador) {
    let total = 0;

    for (const venta of ventas) {
        contador.operaciones++;
        total = total + valorVenta(venta);
    }

    return total;
}

function VentaMayor(ventas, contador) {
    contador.operaciones++;
    if (ventas.length === 0) {
        return null;
    }
    let mayor = ventas[0];

    for (const venta of ventas) {
        contador.operaciones++;
        contador.operaciones++;
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }
    return mayor;
}
const contadorMayor = { operaciones: 0 };
console.log("Mayor:", VentaMayor(listaPrueba, contadorMayor), "Operaciones:", contadorMayor.operaciones);

function ventasPorCiudad(ventas, ciudad, contador) {
    let totalCiudad = 0;
    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        contador.operaciones++;
        const ciudadVenta = venta.ciudad.trim().toLowerCase();
        contador.operaciones++;
        if (ciudadVenta === ciudadBuscada) {
            totalCiudad = totalCiudad + valorVenta(venta);
        }
    }

    return totalCiudad;
}
const contadorCiudad = { operaciones: 0 };
console.log("Medellín:", ventasPorCiudad(listaPrueba, "Medellín", contadorCiudad), "Operaciones:", contadorCiudad.operaciones);
console.log("Bogotá:", ventasPorCiudad(listaPrueba, "Bogotá", contadorCiudad), "Operaciones:", contadorCiudad.operaciones);
console.log("Cali:", ventasPorCiudad(listaPrueba, "Cali", contadorCiudad), "Operaciones:", contadorCiudad.operaciones);
console.log("Pereira:", ventasPorCiudad(listaPrueba, "Pereira", contadorCiudad), "Operaciones:", contadorCiudad.operaciones);

function primeraVenta(ventas, contador) {
    contador.operaciones++;
    if (ventas.length === 0) {
        return null;
    }
    return ventas[0];
}
//Analizar la complejidad espacial de las funciones del motor y comparar una cadena de métodos con un recorrido único.
function totalCiudadCadena(ventas, ciudad) {

    const ciudadBuscada = ciudad.trim().toLowerCase();    //trim y tolowecase limpan los arreys y los estandarizan
    return ventas
        .map((ventas) => ({
            ...ventas, ciudad: ventas.ciudad.trim().toLowerCase()
        }))

        .filter((ventas) => ventas.ciudad === ciudadBuscada)
        .map((ventas) => valorVenta(ventas))
        .reduce((total, valor) => total + valor, 0);

}
console.log("Resultado de la normalizacion:", totalCiudadCadena(listaPrueba, "Medellín"))

//segundo paso de normalizacion

function totalCiudadUnaPasada(ventas, ciudad) {
    let totalCiudad = 0;
    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {

        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadBuscada) {
            totalCiudad = totalCiudad + valorVenta(venta);
        }
    }
    return totalCiudad;

}

//Paso 3 comparar las 10.000

const ventas10k = GenerarVentasAzar(10000);
console.log("Cadena (10k):    ", totalCiudadCadena(ventas10k, "Medellín"));
console.log("Una pasada (10k):", totalCiudadUnaPasada(ventas10k, "Medellín"));



