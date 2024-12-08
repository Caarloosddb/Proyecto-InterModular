<script>
    // Importa el store del inventario para manejar el estado global de los productos
    import { inventarioStore } from "../store";

    // Objeto inicial para un nuevo producto
    let nuevoProducto = { nombre: "", precio: 0, stock: 0 };

    // Lista local de productos sincronizada con el store
    let productos = [];
    let productoSeleccionado = null;
    let mostrarModal = false;
    let mostrarModalVer = false;


    // Suscripción al store del inventario para mantener actualizada la lista local
    inventarioStore.subscribe((value) => {
        productos = value; // Actualiza la lista local cuando el store cambia
    });

    // Función para agregar un nuevo producto al inventario
    function agregarProducto() {
        inventarioStore.update((productos) => {
            // Calcula el nuevo ID para el producto (incremental)
            const id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
            // Devuelve una nueva lista de productos con el nuevo producto añadido
            return [...productos, { id, ...nuevoProducto }];
        });
        // Reinicia el formulario para añadir un nuevo producto
        nuevoProducto = { nombre: "", precio: 0, stock: 0 };
    }

    // Función para eliminar un producto del inventario por su ID
    function eliminarProducto(id) {
        // Confirma la acción antes de proceder
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            inventarioStore.update((productos) =>
                // Filtra y elimina el producto con el ID proporcionado
                productos.filter((producto) => producto.id !== id)
            );
        }
    }
    // Función para abrir el modal de edición
    function abrirEdicion(producto) {
        productoSeleccionado = { ...producto }; // Copia del producto a editar
        mostrarModal = true; // Muestra el modal
    }
    // Función para guardar los cambios del producto editado
    function guardarCambios() {
        inventarioStore.update((productos) =>
            productos.map((producto) =>
                producto.id === productoSeleccionado.id
                    ? { ...producto, ...productoSeleccionado }
                    : producto
            )
        );
        cerrarModal(); // Cierra el modal tras guardar los cambios
    }
    // Función para cerrar el modal sin guardar cambios
    function cerrarModal() {
        productoSeleccionado = null;
        mostrarModal = false;
        mostrarModalVer = false;
    }
    // Función para abrir el modal de edición
    function abrirVer(producto) {
        productoSeleccionado = { ...producto }; // Copia del producto a editar
        mostrarModalVer = true; // Muestra el modal
    }
</script>

<!-- Título de la sección -->
<h2>Gestión de Productos</h2>

<!-- Tabla para mostrar la lista de productos -->
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        {#each productos as producto}
            <tr>
                <!-- Muestra los detalles del producto -->
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                    <!-- Botón para ver el producto -->
                    <button on:click={() => abrirVer(producto)}>Ver</button>
                    <!-- Botón para editar el producto -->
                    <button on:click={() => abrirEdicion(producto)}>Editar</button>
                    <!-- Botón para eliminar el producto -->
                    <button on:click={() => eliminarProducto(producto.id)}>Eliminar</button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<!-- Formulario para agregar un nuevo producto -->
<form on:submit|preventDefault={agregarProducto}>
    <h3>Agregar Producto</h3>
    <!-- Campo para el nombre del producto -->
    <input type="text" placeholder="Nombre" bind:value={nuevoProducto.nombre} required />
    <!-- Campo para el precio del producto -->
    <input type="number" placeholder="Precio (€)" bind:value={nuevoProducto.precio} required />
    <!-- Campo para el stock del producto -->
    <input type="number" placeholder="Stock" bind:value={nuevoProducto.stock} required />
    <!-- Botón para enviar el formulario y agregar el producto -->
    <button type="submit">Agregar</button>
</form>

<!-- Modal para editar producto -->
{#if mostrarModal}
    <div class="modal">
        <div class="modal-content">
            <h3>Editar Producto</h3>
            <form on:submit|preventDefault={guardarCambios}>
                <label>
                    Nombre:
                    <input type="text" bind:value={productoSeleccionado.nombre}/>
                </label>
                <label>
                    Precio (€):
                    <input type="number" bind:value={productoSeleccionado.precio}/>
                </label>
                <label>
                    Stock:
                    <input type="number" bind:value={productoSeleccionado.stock} min="0" required />
                </label>
                <div class="modal-buttons">
                    <button type="submit">Guardar</button>
                    <button type="button" on:click={cerrarModal}>Cancelar</button>
                </div>
            </form>
        </div>
    </div>
{/if}

<!-- Modal para ver producto -->
{#if mostrarModalVer}
    <div class="modal">
        <div class="modal-content">
            <h3>Detalles del Producto</h3>
            <form>
                <p><strong>Nombre:</strong> {productoSeleccionado?.nombre}</p>
                <p><strong>Precio (€):</strong> {productoSeleccionado?.precio}</p>
                <p><strong>Stock:</strong> {productoSeleccionado?.stock}</p>
                <div class="modal-buttons">
                    <button type="button" on:click={cerrarModal}>Cerrar</button>
                </div>
            </form>
        </div>
    </div>
{/if}
<style>
    h2 {
        text-align: center;
        margin-top: 16px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 24px 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        background-color: white;
        border-radius: 8px;
    }

    th, td {
        padding:13px;
        text-align: center;
    }

    th {
        background-color: #960000;
        color: white;
        font-weight: bold;
        text-transform: uppercase;
    }

    td {
        border-bottom: 1px solid #ddd;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f4f4f4;
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

    form {
        max-width: 600px;
        margin: 16px  auto;
        background: white;
        padding: 16px ;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    form h3 {
        margin-bottom: 16px ;
        color: #960000;
        text-align: center;
    }

    input[type="text"], input[type="number"] {
        width: calc(100% - 20px);
        padding: 8px ;
        margin: 8px  0;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    input:focus {
        border-color: #960000;
        outline: none;
        box-shadow: 0 0 3px rgba(150, 0, 0, 0.5);
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        text-align: center;
        max-width: 400px;
        width: 90%;
    }

    .modal-content h3 {
        color: #960000;
    }


    .modal-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
    }

    .modal-buttons button {
        flex: 1;
        margin: 0 4px;
    }
</style>
