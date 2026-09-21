import { eliminarProducto } from "../lib/producto";
const contenedor = document.getElementById(
  "contentEliminarProducto"
) as HTMLDivElement;

const categoriaEliminar = document.getElementById(
  "categoria-Eliminar"
) as HTMLSelectElement;

const listaProductos = document.getElementById(
  "listaProductos"
) as HTMLDivElement;


// ==========================================
// OBTENER PRODUCTOS DESDE ASTRO
// ==========================================

const productos = JSON.parse(
  contenedor.dataset.productos || "[]"
);


// ==========================================
// CAMBIAR CATEGORÍA
// ==========================================

categoriaEliminar.addEventListener("change", () => {

  const categoriaSeleccionada = categoriaEliminar.value;

  // Limpiar lista
  listaProductos.innerHTML = "";

  // No hay categoría seleccionada
  if (!categoriaSeleccionada) {
    return;
  }


  // Filtrar productos
  const productosFiltrados = productos.filter(
    (producto: {
      id: number;
      nombre: string;
      categoria: string;
    }) => producto.categoria === categoriaSeleccionada
  );


  // Si no hay productos
  if (productosFiltrados.length === 0) {

    listaProductos.innerHTML = `
      <p class="rounded-lg bg-gray-100 p-3 text-center text-gray-500">
        No hay productos en esta categoría.
      </p>
    `;

    return;
  }


  // ==========================================
  // CREAR TARJETAS
  // ==========================================

  productosFiltrados.forEach((producto) => {

    const card = document.createElement("div");

    card.className =
      "flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3";


    card.innerHTML = `
      <div>
        <p class="font-semibold text-gray-800">
          ${producto.nombre}
        </p>

        <p class="text-sm text-gray-500">
          ID: ${producto.id}
        </p>
      </div>

      <button
        type="button"
        class="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white active:scale-95"
        data-id="${producto.id}"
      >
        Eliminar
      </button>
    `;


    // ==========================================
    // BOTÓN ELIMINAR
    // ==========================================

    const botonEliminar = card.querySelector(
      "button"
    ) as HTMLButtonElement;


    botonEliminar.addEventListener("click", async () => {
      const confirmar = confirm(
        `¿Seguro que quieres eliminar "${producto.nombre}"?`
      );

      if (!confirmar) {
        return;
      }

      const resultado = await eliminarProducto(producto.id);

      if (resultado?.success) {
        card.remove();
      }
    });


    listaProductos.appendChild(card);

  });

});
