import express, {json, query} from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const items = []

app.post("/items", (req, res) => {
    const items = req.body.items;

    if (!items.name || !items.quantify || !items.type) {
        return res.status(422).send("Você deve informar o nome do item, a quantidade do item e o tipo do item!");
    } 

    items.push({
        id: items.length + 1,
        ...items
    });
    return res.status(201).send("Item adicionado com sucesso!")
});



app.listen(5000, () => {
    console.log("servidor rodando na porta 5000");
});
