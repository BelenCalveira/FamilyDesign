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

let pedido = [];
pedido.push({ id_pedido: 1, cliente: 1, pedido:"taza de polímero de paw patrol con nombre Cinthia" });
pedido.push({ id_pedido: 2, cliente: 24, pedido:"set de jardín" });
pedido.push({ id_pedido: 3, cliente: 32, pedido:"remera de rock" });
pedido.push({ id_pedido: 4, cliente: 19, pedido:"stickers" });

//pedidos
app.get("/pedidos", (req, res) => {
  res.json(pedido);
});


//envío de pedidos
app.post("/envio_pedido", (req, res) => {
  const nuevopedido = { ...req.body, id_pedido: pedido.at(-1).id_pedido +1};
  pedido.push(nuevopedido);
  res.send(nuevopedido);

});


//actualizar pedidos
app.put("/actualizar_pedido/:id_pedido", (req, res) => {
const nuevoPedido = req.body;
const pedidoEncontrado = pedido.find(
  (p) => p.id_pedido === parseInt(req.params.id_pedido)
);
if(!pedidoEncontrado)
return res.status(404).json({message: "pedido no encontrado"});
pedido.map((p) => 
p.id_pedido === parseInt(req.params.id_pedido) ? { ...p, ...nuevoPedido} : p
);
  res.json({
    message: "pedido actualizado"
  });
});


//eliminar pedidos
app.delete("/eliminar_pedido/:id_pedido", (req, res) => {
  const pedidoEncontrado = pedido.find( 
    (p) => p.id_pedido === parseInt(req.params.id_pedido)
  );
  if(!pedidoEncontrado)
  return res.status(404).json({message: "pedido no encontrado"});
pedido = pedido.filter((p) => p.id_pedido !== parseInt(req.params.id_pedido));
res.sendStatus(204);
});


app.use((req, res) => {
  res.status(404).send("Lamento decirle que la página no existe");
});


app.listen(app.get("puerto"));
console.log(`Servidor ${app.get("nombre")} en el puerto ${app.get("puerto")}`);