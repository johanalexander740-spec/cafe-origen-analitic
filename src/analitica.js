// Analítica Café Origen – funciones de soporte y exportacion para medir y el resto del proyecto

// ---------- Funciones básicas ----------
function ValorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let total = 0;
    for (const venta of ventas) {
        total += ValorVenta(venta);
    }
    return total;
}

// Versión con reduce – O(n)
function UnidadesVendidasM(ventas) {
    return ventas.reduce((total, venta) => total + venta.cantidad, 0);
}

// Versión clásica – O(n)
function unidadesVendidas(ventas) {
    let total = 0;
    for (const venta of ventas) {
        total += venta.cantidad;
    }
    return total;
}

function VentaMayor(ventas) {
    if (ventas.length === 0) return null;
    let mayor = ventas[0];
    for (const venta of ventas) {
        if (ValorVenta(venta) > ValorVenta(mayor)) mayor = venta;
    }
    return mayor;
}

function TicketPromedioVentas(ventas) {
    let total = 0;
    let count = 0;
    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += ValorVenta(venta);
            count++;
        }
    }
    return count === 0 ? 0 : Math.round(total / count);
}

// ---------- Ventas por ciudad ----------
function ventasPorCiudad(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();
    let total = 0;
    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();
        if (ciudadVenta === ciudadBuscada) total += ValorVenta(venta);
    }
    return total;
}

// Versión "M" – alias de la anterior (para compatibilidad)
function VentasPorCiudadM(ventas, ciudad) {
    return ventasPorCiudad(ventas, ciudad);
}

function normalizarCiudad(ciudad) {
    const limpia = ciudad.trim().toLowerCase();
    return limpia.charAt(0).toUpperCase() + limpia.slice(1);
}

function ventasDelDia(ventas, fecha) {
    return ventas.filter(v => v.fecha === fecha);
}

function unidadesPorProducto(ventas) {
    const map = {};
    for (const v of ventas) {
        map[v.producto] = (map[v.producto] || 0) + v.cantidad;
    }
    return map;
}

function topProductosPorValor(ventas, limite = 3) {
    const ingresos = {};
    for (const v of ventas) {
        ingresos[v.producto] = (ingresos[v.producto] || 0) + ValorVenta(v);
    }
    return Object.entries(ingresos)
        .map(([producto, total]) => ({ producto, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, limite);
}

function ventasPorCiudadResumen(ventas) {
    const resumen = {};
    for (const v of ventas) {
        const c = normalizarCiudad(v.ciudad);
        resumen[c] = (resumen[c] || 0) + ValorVenta(v);
    }
    return resumen;
}

// ---------- MiniReto 9 – Clientes recurrentes ----------
function clientesRecurrentes(ventas) {
    const recurrentes = [];
    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }
    return recurrentes;
}

function clientesRecurrentesSet(ventas) {
    const vistos = new Set();
    const recurrentes = new Set();
    for (const v of ventas) {
        const cli = v.cliente;
        if (vistos.has(cli)) recurrentes.add(cli);
        else vistos.add(cli);
    }
    return Array.from(recurrentes);
}

function comprasPorCliente(ventas) {
    const conteo = new Map();
    for (const v of ventas) {
        const cli = v.cliente;
        conteo.set(cli, (conteo.get(cli) || 0) + 1);
    }
    const recurrentes = [];
    for (const [cli, cant] of conteo.entries()) {
        if (cant > 1) recurrentes.push(cli);
    }
    return { mapa: conteo, recurrentes };
}

// ---------- MiniReto 10 – Combos y frecuencias ----------
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
        if (vistos.has(complement)) return [vistos.get(complement), item.producto];
        vistos.set(item.precio, item.producto);
    }
    return null;
}

function productoEstrellaPorCiudad(ventas) {
    const porCiudad = new Map(); // ciudad -> Map(producto -> count)
    for (const v of ventas) {
        const ciudad = v.ciudad.trim().toLowerCase();
        const prod = v.producto;
        if (!porCiudad.has(ciudad)) porCiudad.set(ciudad, new Map());
        const mapa = porCiudad.get(ciudad);
        mapa.set(prod, (mapa.get(prod) || 0) + 1);
    }
    const resultado = {};
    for (const [ciudad, mapa] of porCiudad.entries()) {
        let max = 0;
        let estrella = null;
        for (const [prod, cnt] of mapa.entries()) {
            if (cnt > max) { max = cnt; estrella = prod; }
        }
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
        if (cuenta.get(v.cliente) === 1) return v.cliente;
    }
    return null;
}

// ---------- Export ----------
module.exports = {
    // funciones básicas
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
