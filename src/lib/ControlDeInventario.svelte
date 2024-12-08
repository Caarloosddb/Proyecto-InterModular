<script>
    import { inventarioStore } from "../store";

    let inventario = [];

    inventarioStore.subscribe((value) => {
        inventario = value;
    });


</script>

<h2>Control de Inventario</h2>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
        </tr>
    </thead>
    <tbody>
        {#each inventario as producto}
            <tr>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}€</td>
                <td>{producto.stock}</td>
            </tr>
        {/each}
    </tbody>
</table>


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
</style>
