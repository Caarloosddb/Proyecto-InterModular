<script>
  import Productos from "./lib/Productos.svelte";
  import Pedidos from "./lib/Pedidos.svelte";
  import ControlDeInventario from "./lib/ControlDeInventario.svelte";
  import Informes from "./lib/Informes.svelte";

  // Variables para controlar qué sección está visible
  let activo = "control"; // Comienza mostrando solo la tabla de stock
</script>

  <nav>
    <button on:click={() => activo = "productos"}>Gestión de Productos</button>
    <button on:click={() => activo = "pedidos"}>Registro de Pedidos</button>
    <button on:click={() => activo = "control"}>Control de Inventario</button>
    <button on:click={() => activo = "informes"}>Informes de Ventas</button>
  </nav>

  <main>

    {#if activo === "productos"}
      <Productos/>
    {/if}

    {#if activo === "pedidos"}
      <Pedidos/>
    {/if}

    {#if activo === "control"}
      <ControlDeInventario/>
    {/if}

    {#if activo === "informes"}
      <Informes/>
    {/if}
  </main>

<style>
main {
    text-align: center;
  }

  nav {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background-color: #960000;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  button {
    background-color: #960000;;
    color: #fff;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    border: none;
    width: 25%;
  }

  button:hover {
    background-color: #d40000;
    color: #fff;
    transform: scale(1.05);
  }
</style>
