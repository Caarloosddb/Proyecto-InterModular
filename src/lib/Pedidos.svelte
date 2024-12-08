<script>
    // Importa los stores de inventario y pedidos para gestionar los estados globales
    import { inventarioStore, pedidosStore } from "../store";
  
    // Objeto inicial para un nuevo pedido
    let nuevoPedido = { cliente: "", productos: [], total: 0 };
  
    // Lista de productos disponibles en el inventario
    let productosDisponibles = [];
  
    // Variables para el producto seleccionado y la cantidad a añadir al pedido
    let selectedProductId = "";
    let cantidad = 1;
  
    // Suscripción al store de inventario para mantener sincronizada la lista de productos disponibles
    inventarioStore.subscribe((value) => {
      productosDisponibles = value;
    });
  
    // Función para agregar un producto al pedido
    function agregarProductoAlPedido(productoId, cantidad) {
      const producto = productosDisponibles.find((p) => p.id === productoId); // Encuentra el producto en el inventario
      if (producto && producto.stock >= cantidad) {
        const itemExistente = nuevoPedido.productos.find((p) => p.id === productoId);
        if (itemExistente) {
          // Si el producto ya está en el pedido, actualiza la cantidad
          itemExistente.cantidad += cantidad;
        } else {
          // Si no está, agrégalo al pedido
          nuevoPedido.productos.push({ ...producto, cantidad });
        }
        // Actualiza el total del pedido
        nuevoPedido.total = calcularTotal();
      } else {
        // Mensaje de error si no hay suficiente stock
        alert("Stock insuficiente para este producto.");
      }
    }
  
    // Función para realizar el pedido
    function realizarPedido() {
      // Validación: verifica que se haya ingresado el cliente y al menos un producto
      if (!nuevoPedido.cliente || nuevoPedido.productos.length === 0) {
        alert("Debe completar todos los campos del pedido.");
        return;
      }
  
      // Actualiza el stock del inventario restando las cantidades pedidas
      inventarioStore.update((productos) =>
        productos.map((producto) => {
          const pedidoProducto = nuevoPedido.productos.find((p) => p.id === producto.id);
          if (pedidoProducto) {
            if (producto.stock < pedidoProducto.cantidad) {
              // Verifica que haya suficiente stock para completar el pedido
              alert(`Stock insuficiente para el producto ${producto.nombre}.`);
              throw new Error("Stock insuficiente.");
            }
            // Actualiza el stock del producto
            return { ...producto, stock: producto.stock - pedidoProducto.cantidad };
          }
          return producto; // Deja sin cambios los productos no incluidos en el pedido
        })
      );
  
      // Agrega el pedido al store de pedidos
      pedidosStore.update((pedidos) => [
        ...pedidos,
        { ...nuevoPedido, id: Date.now() }, // Asigna un ID único al pedido
      ]);
  
      // Reinicia el formulario de pedido
      nuevoPedido = { cliente: "", productos: [], total: 0 };
    }
  
    // Calcula el total del pedido sumando los precios de los productos multiplicados por sus cantidades
    function calcularTotal() {
      return nuevoPedido.productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    }
  </script>
  <div>
  <!-- Título de la sección -->
  <h2>Registro de Pedidos</h2>
  
  <!-- Formulario para realizar pedidos -->
  <form on:submit|preventDefault={realizarPedido}>
    <label>
      Cliente:
      <!-- Campo para ingresar el nombre del cliente -->
      <input type="text" bind:value={nuevoPedido.cliente} placeholder="Nombre del cliente" required />
    </label>
  
    <!-- Sección para agregar productos al pedido -->
    <h3>Agregar Productos</h3>
    <select bind:value="{selectedProductId}">
      <option value="" disabled selected>Seleccione un producto</option>
      {#each productosDisponibles as producto}
      <option value={producto.id}>{producto.nombre} (Stock: {producto.stock})</option>
      {/each}
    </select>
    <input type="number" placeholder="Cantidad" bind:value="{cantidad}" min="1" />
    <button type="button" on:click={() => agregarProductoAlPedido(selectedProductId, cantidad)}>
      Añadir al Pedido
    </button>
  
    <!-- Lista de productos incluidos en el pedido -->
    <h3>Productos en el Pedido</h3>
    <ul>
      {#each nuevoPedido.productos as producto}
      <li>{producto.nombre} - {producto.cantidad} x {producto.precio}€</li>
      {/each}
    </ul>
  
    <!-- Total del pedido -->
    <p><strong>Total: {nuevoPedido.total}€</strong></p>
    <button type="submit">Realizar Pedido</button>
  </form>
</div>
<style>
  form {
    display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 16px auto;
  }
  label, input, select, button {
      display: block;
      margin: 8px  0;
  }
  button {
        background-color: #960000;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 6px 16px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }
    button:hover {
        background-color: #610202;
        transform: scale(1.05);
    }

  h2, h3 {
      text-align: center;
  }
  h2{
    width: 100%;
  }
</style>
