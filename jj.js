
// ===============================
// COMENTARIOS PÚBLICOS
// ===============================

// GUARDAR COMENTARIO
function guardarComentario(){

    let nombre = document.getElementById('nombre').value.trim();

    let comentario = document.getElementById('comentario').value.trim();

    if(nombre === "" || comentario === ""){

        alert("Complete todos los campos");

        return;

    }

    // GUARDAR USUARIO ACTUAL
    localStorage.setItem('usuarioActual',nombre);

    // OBTENER COMENTARIOS
    let comentarios =
    JSON.parse(localStorage.getItem('comentarios')) || [];

    // AGREGAR NUEVO COMENTARIO
    comentarios.push({

        nombre:nombre,
        comentario:comentario

    });

    // GUARDAR EN LOCALSTORAGE
    localStorage.setItem(
    'comentarios',
    JSON.stringify(comentarios)
    );

    // ACTUALIZAR
    mostrarComentarios();

    limpiarFormulario();

}

// MOSTRAR COMENTARIOS
function mostrarComentarios(){

    let comentarios =
    JSON.parse(localStorage.getItem('comentarios')) || [];

    let usuarioActual =
    localStorage.getItem('usuarioActual');

    let contenedor =
    document.getElementById('contenedorComentarios');

    if(!contenedor){

        return;

    }

    contenedor.innerHTML = "";

    comentarios.slice().reverse().forEach((com,index)=>{

        let botonEliminar = "";

        // SOLO EL DUEÑO DEL COMENTARIO
        if(com.nombre === usuarioActual){

            botonEliminar = `

            <button onclick="eliminarComentario(${comentarios.length-1-index})">
            Eliminar Comentario
            </button>

            `;

        }

        contenedor.innerHTML += `

        <div class="card-comentario">

            <h3>${com.nombre}</h3>

            <p>${com.comentario}</p>

            ${botonEliminar}

        </div>

        `;

    });

}

// ELIMINAR COMENTARIO
function eliminarComentario(index){

    let confirmar =
    confirm("¿Desea eliminar este comentario?");

    if(confirmar){

        let comentarios =
        JSON.parse(localStorage.getItem('comentarios')) || [];

        comentarios.splice(index,1);

        localStorage.setItem(
        'comentarios',
        JSON.stringify(comentarios)
        );

        mostrarComentarios();

    }

}

// LIMPIAR FORMULARIO
function limpiarFormulario(){

    document.getElementById('nombre').value = "";

    document.getElementById('comentario').value = "";

}

// INICIAR
window.addEventListener("load",()=>{

    mostrarComentarios();

});

await addDoc(collection(db,"leyes"),{

titulo:titulo,
contenido:contenido,
fecha:Date.now()

});