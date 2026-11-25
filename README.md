# Café Origen - Motor de Analítica v0.1

Motor de analítica y reportería en consola para las ventas de Café Origen. Permite a la gerencia consultar métricas clave de negocio sin necesidad de inspeccionar el código.

---

## ❓ Preguntas de Negocio que Responde

1. **¿Cuánto dinero total se ha vendido y cuántas unidades se comercializaron?**
2. **¿Cuál es el valor del ticket promedio por venta efectiva?**
3. **¿Cuál fue la transacción de mayor valor registrada?**
4. **¿Cuánto se ha vendido en cada ciudad (sin duplicidad de nombres)?**
5. **¿Cuáles son los 3 productos que más ingresos generan al negocio?**
6. **¿Cuántas unidades se han vendido de cada producto?**
7. **¿Cómo se comportaron las ventas en un día específico (con o sin ventas)?**

---

## 📁 Estructura del Proyecto

```text
cafe-origen-analitica/
├── src/
│   ├── datos.js        # Arreglo crudo de ventas con anomalías originales
│   ├── analitica.js    # Módulo de funciones puras de cálculo y normalización
│   ├── explorar.js     # Script de inspección inicial de datos
│   ├── verificar.js    # Batería de pruebas (ciclos vs métodos de arreglo)
│   └── reporte.js      # Reporte ejecutivo formateado para gerencia
├── bitacora.md         # Diccionario de datos y registro de depuración
└── README.md           # Documentación general y guía de ejecución
```

---

## 🚀 Cómo Ejecutar el Proyecto

Requisito: Tener instalado [Node.js](https://nodejs.org/).

### 1. Ver el Reporte Ejecutivo Principal:
```bash
node src/reporte.js
```

### 2. Verificar Pruebas y Consistencia:
```bash
node src/verificar.js
```

### 3. Explorar Datos Crudos y Detección de Anomalías:
```bash
node src/explorar.js
```
