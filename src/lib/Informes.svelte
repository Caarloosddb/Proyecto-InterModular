<script>
  // Importa el store de pedidos para gestionar el estado global de los pedidos
  import { pedidosStore } from "../store";

  // Variable local para almacenar los pedidos
  let pedidos = [];

  // Suscripción al store de pedidos para sincronizar los datos locales
  pedidosStore.subscribe((value) => {
      pedidos = value; // Actualiza la lista de pedidos cuando el store cambia
  });

  // Función para exportar los pedidos a un archivo CSV
  function exportarCSV() {
      // Definición de los encabezados para el archivo CSV
      const encabezados = ["ID Pedido", "Cliente", "Producto", "Cantidad", "Precio", "Total"];

      // Genera las filas del archivo CSV mapeando los datos de cada pedido y producto
      const filas = pedidos.flatMap((pedido) =>
          pedido.productos.map((producto) =>
              [
                  pedido.id, // ID del pedido
                  pedido.cliente, // Nombre del cliente
                  producto.nombre, // Nombre del producto
                  producto.cantidad, // Cantidad del producto
                  producto.precio, // Precio unitario
                  producto.cantidad * producto.precio, // Total (cantidad * precio)
              ].join(",") // Combina los valores de cada fila en una cadena separada por comas
          )
      );

      // Combina los encabezados y las filas en un solo contenido para el archivo CSV
      const csvContenido = [encabezados.join(","), ...filas].join("\n");

      // Crea un archivo CSV en memoria usando Blob
      const blob = new Blob([csvContenido], { type: "text/csv" });

      // Genera una URL temporal para el archivo
      const url = URL.createObjectURL(blob);

      // Crea un enlace de descarga y simula un clic para descargar el archivo
      const link = document.createElement("a");
      link.href = url;
      link.download = "pedidos.csv"; // Nombre del archivo
      link.click(); // Inicia la descarga

      // Libera la URL temporal del archivo
      URL.revokeObjectURL(url);
  }
</script>

<!-- Título de la sección -->
<h2>Informes de Ventas</h2>

<!-- Botón para exportar los pedidos a CSV -->
<button on:click={exportarCSV}>Exportar Pedidos (CSV)</button>

<!-- Lista de pedidos y detalles -->
<h3>Historial de Pedidos</h3>
<ul>
{#each pedidos as pedido}
  <li>
    <!-- Información básica del pedido -->
    Pedido #{pedido.id} - Cliente: {pedido.cliente} - Total: {pedido.total}€
    <ul>
      {#each pedido.productos as producto}
        <!-- Información de cada producto en el pedido -->
        <li>{producto.nombre} - {producto.cantidad} x {producto.precio}€</li>
      {/each}
    </ul>
  </li>
{/each}
</ul>

<style>
    h2 {
    text-align: center;
    margin-bottom: 16px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 8px  0;
  }
  button {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #960000;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  button:hover {
    background-color: #610202;
  }
</style>