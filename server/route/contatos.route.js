const path = require('path');

const express = require('express');
const multer = require('multer');

const router = express.Router();

const contatosService = require('../service/contatosService');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage});

router.post('/upload', upload.single('image'), (req, res, next) => {
    console.log('File', req.file)
    res.end('send! -_-')
});

router.get('/contatos', async (req, res, next) => {
    try {
        const contatos = await contatosService.getContatos();
        res.json(contatos);
    } catch (e) {
        next(e);
    }
});

router.get('/contatos/:id', async (req, res, next) => {
    try {
        const contato = await contatosService.getContato(req.params.id);
        res.status(201).json(contato);
    } catch (e) {
        next(e);
    }
});

router.post('/contatos', async (req, res, next) => {
    const contato = req.body;
    try {
        const novoContato = await contatosService.saveContato(contato);
        res.status(201).json(novoContato);
    } catch (e) {
        next(e);
    }
});

router.put('/contatos/:id', async (req, res, next) => {
    const contato = req.body;
    try {
        await contatosService.updateContato(req.params.id, contato);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});

router.delete('/contatos/:id', async (req, res, next) => {
    try {
        const contato = req.params.id;
        await contatosService.deleteContato(contato)
        res.status(204).end()
    } catch (e) {
        next(e);
    }
});

module.exports = router;