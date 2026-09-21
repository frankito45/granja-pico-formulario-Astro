

export async function crearProducto(nombre:string, categoria:string) {

    const response = await fetch("/api/productos",{
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nombre,
      categoria,
    })
    })
        
    const data = await response.json();

    if (!response.ok) {
        alert(data.error || 'Error al crear el producto')
        return;
    }

    alert("producto creado correctamente")

    return data

}


export async function eliminarProducto(id:number) {

    
  try{

    const response = await fetch("/api/productos",{
      method: "DELETE",
      
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        id
      })
    })
    
    const data = await response.json();
    
    if (!response.ok) {
      alert(data.error || 'Error al crear el producto')
      return;
    }
    
    alert("producto Eliminado correctamente")
    
    return data
  }catch(error){
    return Response.json({
      success:false,
      error: "Error al eliminar los datos"
    },{status:500})
  } 
  
}