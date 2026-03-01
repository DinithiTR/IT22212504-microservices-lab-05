const express = require('express');
const app = express();
const PORT = 8081;

app.use(express.json());

let items = ["Book", "Laptop", "Phone"];

// GET /items
app.get('/items', (req, res) => {
    res.json(items);
});

// POST /items  (works with lab sample {"name": "Headphones"})
app.post('/items', (req, res) => {
    const newItem = req.body.name || req.body;
    if (typeof newItem === 'string' && newItem.trim()) {
        items.push(newItem.trim());
        return res.status(201).send(`Item added: ${newItem}`);
    }
    res.status(400).send('Invalid item');
});

// GET /items/{id}
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= items.length) {
        return res.status(404).send('Item not found');
    }
    res.send(items[id]);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Item Service running on http://0.0.0.0:${PORT}`);
});