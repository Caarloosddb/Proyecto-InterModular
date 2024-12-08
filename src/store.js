import { writable } from "svelte/store";

export const pedidosStore = writable([]);
export const inventarioStore = writable([
    { id: 1, nombre: "Producto A", precio: 10, stock: 50 },
    { id: 2, nombre: "Producto B", precio: 15, stock: 30 },
    { id: 3, nombre: "Producto C", precio: 20, stock: 70 },
]);