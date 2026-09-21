import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

import type { Producto } from "../../models/productos";



export const prerender = false

export const GET:APIRoute = async () => {
    const {data, error} = await supabase
    .from('productos')
    .select('*')
    
    if(error){
        return Response.json(
            {
                error: error.message
            },
            {
                status:500
            }
        )
    }
    
    return Response.json(data)
}


export const POST:APIRoute = async ({request}) => {
    try{

        const data = await request.json() as Producto;   
        
        const {nombre, categoria} = data
        if (!nombre || !categoria) {
            return Response.json(
                {
                success: false,
                error: "Faltan datos obligatorios"
                },
                {
                status: 400
                }
            );
        }

        const {error} = await supabase.from('productos').insert(data)

        if(error){
            return Response.json(
                {
                    success:false,
                    error: error.message
                },

                {status:504}

            )
        }

        return Response.json(
            {success:true}
        )

    }catch(error){
        return Response.json(
                {
                    success:false,
                    error: "Error al guardar los datos"
                },
                {status:500}
        )
    }

}

export const DELETE:APIRoute = async({request}) => {
    try{

        const data = await request.json()
        console.log(data)
        const {id} = data 
        if (isNaN(id)) {
            return Response.json({
                success:false,
                error: 'Faltan seleccionar un producto'

            }, {status:404})
            
        }

        
        const {error} = await supabase.from('productos').delete().eq("id",Number(id))

        return Response.json({
            success:true,
            message:"producto eliminado"
        },{status:200})


    }catch(error){
        return Response.json({
            success:false,
            error: "Error al eliminar los datos"
        },{status:500})
    }
}