# Café Origen – Motor de Analítica v0.1

Este es el motor de analítica y reportería en consola para las ventas de Café Origen. Permite a la gerencia consultar métricas clave sin tener que inspeccionar el código.

## Preguntas de negocio que responde

1. ¿Cuánto dinero total se ha vendido y cuántas unidades se comercializaron?
2. ¿Cuál es el valor del ticket promedio por venta efectiva?
3. ¿Cuál fue la transacción de mayor valor registrada?
4. ¿Cuánto se ha vendido en cada ciudad (sin duplicar nombres)?
5. ¿Cuáles son los tres productos que más ingresos generan?
6. ¿Cuántas unidades se han vendido de cada producto?
7. ¿Cómo se comportaron las ventas en un día específico?
8. ¿Qué clientes son recurrentes? (Mini‑Reto 9)
9. ¿Qué combinaciones de productos completan una tarjeta regalo? (Mini‑Reto 10)
10. ¿Cuál fue la mejor semana de ventas? (Mini‑Reto 11)

## Estructura del proyecto

```
cafe-origen-analitica/
├── src/
│   ├── datos.js        # Arreglo crudo de ventas con anomalías originales
│   ├── analitica.js    # Funciones puras de cálculo y normalización
│   ├── medir.js        # Script de medición de rendimiento (Mini‑Retos)
│   ├── reporte.js      # Reporte ejecutivo formateado para gerencia
│   ├── verificar.js    # Batería de pruebas y comparaciones de versiones
│   └── bitacora.md     # Registro de depuración y aprendizajes
├── README.md           # Documentación general y guía de ejecución
└── .git/               # Repositorio Git
```

## Cómo ejecutar el proyecto

Requisito: Tener instalado Node.js.

1. Ejecutar el reporte ejecutivo principal:

```bash
node src/reporte.js
```

2. Medir rendimiento de los algoritmos (Mini‑Retos 9‑11):

```bash
node src/medir.js
```

El script muestra una tabla con los tiempos de ejecución para la versión original (O(n²)) y las versiones optimizadas con `Set` y `Map` (O(n)). También incluye los algoritmos de los Mini‑Retos 10 y 11.

3. Verificar consistencia y pruebas:

```bash
node src/verificar.js
```

4. Explorar datos crudos y detectar anomalías:

```bash
node src/explorar.js
```

## Cambios recientes y especificaciones

- Refactoricé completamente `src/analitica.js`: eliminé código duplicado, unifiqué funciones y corregí las exportaciones.
- Añadí un wrapper `VentasPorCiudadM` para mantener compatibilidad con importaciones antiguas.
- Actualicé la bitácora (`src/bitacora.md`) con un registro breve en primera persona de los arreglos y lecciones aprendidas.
- El script `medir.js` ahora incluye mediciones para los Mini‑Retos 9, 10 y 11; las versiones optimizadas procesan 100 000 ventas en menos de un segundo.
- La documentación del proyecto (este README) se amplió para reflejar los Mini‑Retos y los criterios de complejidad O(n).

## Referencias a Mini‑Retos

| Mini‑Reto | Tema | Implementación clave |
|-----------|------|----------------------|
| 9 | Clientes recurrentes | `clientesRecurrentesSet`, `comprasPorCliente` (uso de `Set` y `Map`)
| 10 | Combos de regalo y frecuencias | `comboRegalo` (Map de precios), `productoEstrellaPorCiudad`, `primerClienteUnico`
| 11 | Ventana deslizante y dos punteros | `mejorSemana`, `parMasCercano`

---

Entregables:
- Código fuente limpio y funcional.
- Bitácora actualizada con registro de aprendizajes.
- Tabla de tiempos de ejecución incluida en la salida de `medir.js`.
- Documentación actualizada (este archivo).
