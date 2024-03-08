import { pedido } from "../componentes/pedido"
import { tablaPedido } from "../componentes/tablaPedidos"

export const home = {
    template:
    `
    <div>
        <div id="pedido"></div>
        <div id="tablaPedido"></div>
    </div>
    `,
    script:()=>{
        document.querySelector('#pedido').innerHTML = pedido.template
        document.querySelector('#tablaPedido').innerHTML = tablaPedido.template
        pedido.script()
        tablaPedido.script()
    }

}