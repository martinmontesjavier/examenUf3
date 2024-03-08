import { cervezasTabla } from "../bd/bdTabla"

export const tablaPedido = {
template:`<div id="tablaPedidos" class="container mt-5 mb-5 p-5 border shadow-lg ">
<div class="row">
  <h1 class="text-center mb-5 ">----- Vista camareros -----</h1>
<h3>Pedidos</h3>
<table id="tablaPedidos" class="table">
  <thead>
    <tr>
      <th>Id</th>
      <th>Grupo</th>
      <th>Mesa</th>
      <th>Cerveza</th>
      <th>Cantidad</th>
      <th>Estado</th>
    </tr>        
  </thead>
  <tbody id="filasCervezas">
    <tr>
      <td>1</td>
      <td>Borrachos de DAW2</td>
      <td>1</td>
      <td>Estrella Galicia</td>
      <td>3</td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-warning w-100 btn-sm">Pedido pendiente...</button>
          <button class="btn btn-outline-danger w-100 btn-sm"> 🗑 Borrar pedido</button>
        </div>
        
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>Cabezones contentos</td>
      <td>1</td>
      <td>Estrella DAM</td>
      <td>2</td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-success w-100 btn-sm">¡Pedido servido!</button>
          <button class="btn btn-outline-danger w-100 btn-sm"> 🗑 Borrar pedido</button>
        </div>       
      </td>
    </tr>
  </tbody>
</table>
</div>

</div>`,
    script:()=>{
        pintarTabla(cervezasTabla)

        function pintarTabla(arrayC) {
            let html = '';
            
            arrayC.forEach((cerveza, index) => {
                if(cerveza.estado == 'Pendiente'){
                    html += `
                    <tr>
                        <td>${cerveza.id}</td>
                        <td>${cerveza.grupo}</td>
                        <td>${cerveza.mesa}</td>
                        <td>${cerveza.nombre}</td>
                        <td>${cerveza.cantidad}</td>
                        <td>${cerveza.estado}</td>
                        <td><button data-index="${cerveza.id}" class="btn btn-outline-warning w-100 btn-sm resolverPedido">Pedido pendiente...</button></td>
                        <td>
                        <button data-index="${index}" class="btn btn-outline-danger w-100 btn-sm eliminar"> 🗑 Borrar pedido</button></td>
                    </tr>
                `;
                }else{
                    html += `
                    <tr>
                        <td>${cerveza.id}</td>
                        <td>${cerveza.grupo}</td>
                        <td>${cerveza.mesa}</td>
                        <td>${cerveza.nombre}</td>
                        <td>${cerveza.cantidad}</td>
                        <td>${cerveza.estado}</td>
                        <td><button data-index="${cerveza.id}" class="btn btn-outline-success w-100 btn-sm">¡Pedido servido!</button></td>
                        <td>
                        <button data-index="${index}" class="btn btn-outline-danger w-100 btn-sm eliminar"> 🗑 Borrar pedido</button></td>
                    </tr>
                `;
                }
               
            });
        
            document.querySelector('#filasCervezas').innerHTML = html;
        }

        function Eliminar(arrayC, index) {
            arrayC.splice(index, 1); 
            pintarTabla(arrayC);
        }

        function Resolver (arrayC, index){
            arrayC.forEach((cerveza)=>{
                if(cerveza.id == index){
                    console.log('id de la cerveza', cerveza.id)
                    cerveza.estado = 'Resuelto'
                }
            })
            pintarTabla(arrayC)
        }

        function Añadir(arrayC) {
            let grupo = document.querySelector('#nombreGrupo').value
            let indiceCerveza= document.querySelector('#cervezas').selectedIndex
            let cerveza = document.querySelector('#cervezas').options[indiceCerveza].textContent;
            let mesa = document.querySelector('#mesa').value;
            let cantidad =  document.querySelector('#cantidad').value;

            // console.log(document.querySelector('#cervezas'))

            let nuevaCerveza = {
                id: arrayC.length + 1,
                grupo: grupo,
                mesa: mesa,
                nombre: cerveza,
                cantidad: cantidad,
                estado:'Pendiente'
            };
        
            arrayC.push(nuevaCerveza);
            pintarTabla(arrayC);
        }

        document.querySelector('body').addEventListener('click', (e) => {
            e.preventDefault()
            if (e.target.classList.contains('btnAñadir')) {

                const formulario = document.querySelector('#formulario')
                    if(!formulario.checkValidity()){
                        console.log(formulario)
                        console.log('el formulario no valida')
                        
                    }else{
                        formulario.classList.add('was-validated')
                    }
                    
                if(formulario.classList.contains('was-validated')){
                    Añadir(cervezasTabla);
                }  
            }
        
            if (e.target.classList.contains('eliminar')) {
                let index = e.target.dataset.index;
                console.log('indice que mando Eliminar',index)
                Eliminar(cervezasTabla, index);
            }
        
            if(e.target.classList.contains('resolverPedido')){
                let index = e.target.dataset.index;
                console.log('indice que mando Resolver',index)
                Resolver(cervezasTabla, index)
            }
            
        });


        
    }
}