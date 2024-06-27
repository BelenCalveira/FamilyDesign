/* 

HTTP Methods:


. GET : Se obtienen pedidos
. POST : Envío de pedidos
. PUT : Actualizacion de pedidos
. DELETE : Eliminación de pedido


. Todas las URLs que se escriban en la barra de direcciones del navegador serán peticiones GET
. El resto de las peticiones (POST, PUT, DELETE) se probar por Postman o 
. Instalando en VSC el plugin Thunder Client (aparece un rayo) y un botón New Request

*/


const express = require("express");
const morgan = require("morgan");
const { Database } = require("@sqlitecloud/drivers");

const app = express();
app.use(express.static("./static"));
app.set("nombre", "pweb2");
app.set("puerto", 3000);

// Es para que express procese el texto que le envia el cliente. Sin esta línea req.body es undefined
app.use(express.text());

// Es para que express procese el json que le envia el cliente. Sin esta línea req.body es vacio {}
app.use(express.json());

// Es para que express pueda entender los datos que vienen de un formulario.
app.use(express.urlencoded({ extended: false}));

app.use(morgan("dev"));



async function connectDB(query){
  const database = new Database(
    "sqlitecloud://cvdzea0yik.sqlite.cloud:8860?apikey=XTsZa9UKykWyKUJgz6pmVXHZJQVvLFz2Zf7MWe2CwIQ"
  );
  await database.sql("USE DATABASE Pedidos");
  resultado = await database.sql(query);
  return resultado;
}


let pedido = [];
pedido.push({ idPedido: 1, idCliente: 1, pedido:"taza de polímero de paw patrol con nombre Cinthia" });
pedido.push({ idPedido: 2, idCliente: 24, pedido:"set de jardín" });
pedido.push({ idPedido: 3, idCliente: 32, pedido:"remera de rock" });
pedido.push({ idPedido: 4, idCliente: 19, pedido:"stickers" });

//pedidos
/* 
app.get("/pedidos", (req, res) => {
  res.json(pedido);
});
*/
app.get("/pedidos", (req, res) => {
  const query = "SELECT * FROM pedido";
  const resultado = connectDB(query);
  res.send(resultado);
});

//envío de pedidos 
//adaptar a la base de datos
/*datos para recopilar del body
{
  "cliente": 4,
  "pedido": "set de jardín",
  "estado": "false"
}
 */
app.post("/envio_pedido", (req, res) => {
  const nuevoPedido = { ...req.body, idPedido: pedido.at(-1).idPedido +1};
  pedido.push(nuevoPedido);
  res.send(nuevoPedido);
});

app.get("/envio_pedido", (req, res) => {
  const nuevoPedido =
  res.send(nuevoPedido);
});


//actualizar pedidos
app.put("/actualizar_pedido/:id_pedido", (req, res) => {
const nuevoPedido = req.body;
const pedidoEncontrado = pedido.find(
  (p) => p.idPedido === parseInt(req.params.idPedido)
);
if(!pedidoEncontrado)
return res.status(404).json({message: "pedido no encontrado"});
pedido.map((p) => 
p.idPedido === parseInt(req.params.idPedido) ? { ...p, ...nuevoPedido} : p
);
  res.json({
    message: "pedido actualizado"
  });
});


//eliminar pedidos
app.delete("/eliminar_pedido/:id_pedido", (req, res) => {
  const pedidoEncontrado = pedido.find( 
    (p) => p.idPedido === parseInt(req.params.idPedido)
  );
  if(!pedidoEncontrado)
  return res.status(404).json({message: "pedido no encontrado"});
pedido = pedido.filter((p) => p.idPedido !== parseInt(req.params.idPedido));
res.sendStatus(204);
});


app.use((req, res) => {
  res.status(404).send("Lamento decirle que la página no existe");
});


app.listen(app.get("puerto"));
console.log(`Servidor ${app.get("nombre")} en el puerto ${app.get("puerto")}`);