import { crearProducto } from "../lib/producto"

const contentCreaProducto = document.querySelector("#contentCreateProducto")

const createProduto = document.querySelector("#crearProductos") 


contentCreaProducto?.addEventListener("click",(e) => {
    const target = e.target as HTMLElement

    const card = target.closest("#crearProductos")

    if (card){
        return
    }

    const result = createProduto?.classList.toggle("hidden")
    createProduto?.classList.toggle("active",result)
    
})


const categoriaSelec = document.querySelector("#categoria") as HTMLSelectElement
const inputNewCategoria = document.querySelector("#inputNuevaCategoria")
const newCategoria = document.querySelector("#nuevaCategoria") as HTMLInputElement

// mostrar / ocultar input de nueva categorìa 
categoriaSelec.addEventListener("change",(e)=> {
    inputNewCategoria?.classList.toggle(
        "hidden",categoriaSelec.value !== "nueva"
    )
})


// crear Prodcucto


const formCrearProducto = document.querySelector("#formCrearProducto") as HTMLFormElement
const nombreProducto = document.querySelector("#nombreProducto") as HTMLInputElement


formCrearProducto.addEventListener("submit",async(e) => {
    e.preventDefault();

    const nombre = nombreProducto.value.trim()
    
    let categoria = categoriaSelec.value

    if(categoria == "nueva"){
        categoria = newCategoria.value.trim()
    }

    if (!nombre) {
        alert("Ingrese el nombre del producto");
        return
    }

    if (!categoria) {
        alert("Ingrese el nombre del producto")
        return
    }

    try{
        await crearProducto(nombre,categoria)
        
        // Limpiar formulario
        formCrearProducto.reset();

        // Ocultar input de nueva categoria

        inputNewCategoria?.classList.add("hidden")

    }catch(error) {
        console.error(error)
        alert('Error de conexion con el servidor')
    }



})