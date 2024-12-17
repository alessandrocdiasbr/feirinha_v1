import express, {json, query} from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const items = []

app.post("/items", (req, res) => {
    const { name, quantify, type } = req.body;

    if(!name || !quantify || !type) {
        return res.status(422).json({
            message: "Você deve informar o nome do item, a quantidade do item e o tipo do item"
        });
    }

    const itemExistente = items.find(
        item => item.name.toLowerCase() === name.toLowerCase());

        if(itemExistente) {
            return res.status(409).json({
                message: "Item já existe na lista de compras"
            })
        }
    
    const novoItem = {
        id: items.length + 1,
        name,
        quantify: Number(quantify),
        type
    };

    items.push(novoItem);
    return res.json(201).json(novoItem);
});

app.get("/items", (req, res) => {
    const { type } = req.query;
    if(type) {
        const itemsFiltrados = items.filter(item => item.type.toLowerCase() === type.toLowerCase()
    );
    return res.json(itemsFiltrados)
    }
    return res.json(items);
});

app.get("/items/:id", (req, res) => {
    const { id } = req.params;

    const item = items.find( i => i.id === Number(id));
    if(!item) {
        return res.status(404).json({
            message: "Item não encontrado"
        });
    };
    return res.json(item);
    
}) 


app.listen(5000, () => {
    console.log("servidor rodando na porta 5000");
});
