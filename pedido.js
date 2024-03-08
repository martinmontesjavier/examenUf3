import { bd } from "../bd/bdCervezas"

export const pedido = {
template:`<div class="container mt-3 p-5 border shadow-lg ">
<h1 class="text-center mb-5 ">----- Vista usuario -----</h1>
<div class="row">
  
  <div class="col-6">
  <form novalidate id="formulario">
    <h3>Grupo</h3>
    <label for="nombreGrupo" class="label-control">Nombre del grupo:</label>
    <input required minlength="4" maxlength="10" id="nombreGrupo" name="nombreGrupo" type="text" class="form-control mt-2" placeholder ="Borrachos de DAW2">
    <div class="invalid-feedback small">Minimo 4, Maximo 10 caracteres</div>
    <label for="mesa" class="label-control">Mesa numero</label>
    <input required min="1" max="15" id="mesa" name="mesa" type="number" class="form-control mt-2" placeholder ="1">
    <div class="invalid-feedback small">Minimo 1, Maximo 15</div>
  
    <h3 class="mt-5">Haz tu pedido</h3>
    <div class="d-flex gap-3 ">
      <select required name="cervezas" id="cervezas" class="form-control">
        <option value="">Selecciona qué birra quieres</option>
        <option value="">Estrella Galicia</option>
      </select>
      <div class="invalid-feedback small">Selecciona minimo 1</div>

      <input required id="cantidad" name="cantidad" type="number" min="1" value="1" class="form-control">
      <div class="invalid-feedback small">Minimo 1</div>
    </div>
    <button class="btn btn-success mt-4 w-100 btnAñadir">¡Enviar pedido!</button>
    </form>
  </div>
  <div class="col-6 border ">
    <div id="tarjeta" class="p-3 d-flex">
      <div class="w-50">
        <img src="estrella.jpg" alt="" class="w-100">
      </div>
      <div>
        <h4 class="">Estrella Galicia</h4>
        <p>Cerveza suave y equilibrada con un sabor ligeramente amargo y aroma a malta.</p>
      </div>
    </div>
  </div>
</div>`,
  script:()=>{
    let selectCerveza = '<option value="">Selecciona una opción</option>'
    bd.map((item) =>{
        selectCerveza += `<option value="${item.id}">${item.nombre}</option>`
      
    })

    document.querySelector('#cervezas').innerHTML = selectCerveza

    document.querySelector('#cervezas').addEventListener('change',()=>{
        let valueSelect = document.querySelector('#cervezas').value
        console.log(valueSelect)
        bd.forEach(cerveza => {
            if(cerveza.id == valueSelect){
                let html=` 
                <div class="w-50">
                    <img src="${cerveza.imagen}" alt="" class="w-100">
                </div>
                <div>
                    <h4 class="">${cerveza.nombre}</h4>
                    <p>${cerveza.descripcion}</p>
                </div>`
                document.querySelector('#tarjeta').innerHTML = html
            }
            
        });
        
    })
    }
  
}