const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require('mongoose');
const app = require('../app');
const produtos = require('../models/produtos');
const { findByIdAndUpdate, findById } = require('../models/produtos');
const { route } = require('../app');

router.get('/', (req, res, next) => {
    Produto.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        });
});

//recupera apenas 1 produto
router.get('/proedutoId', (req, res, next) => {
    const _id = req.params.produtoId;
    if (_id.findById('60809d76fd093618fc0c36df')) {
        res.status(200).json({
            message: 'produto encontrado',
            _id: _id, item:req.body
        });
    }
    else {
        res.status(404).json({
            message: 'produto não encontrado'
        })
    }
});


router.post('/', (req, res, next) => {

    const produto = new Produto({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        preco: req.body.preco
    });

    produto.save()
        .then(result => {
            res.status(201).json({
                message: 'POST Request para /produtos',
                produto: produto
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

});

router.put('/', (req, res, next) => {

    const _id = req.params._id
    ({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        preco: req.body.preco
    });

    produto.save(_id)
        .then(result => {
            res.status(201).json({
                message: 'PUT Request para /produtoId',
                _id: produtoId
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

});




const DELETE = router.delete('/:_id', (req, res, next)=>{
    const _id = req.params._id;
    res.status(200).json({
        message: 'produto deletado'
    })
    _id.save(null)
    .then(result=>{
        res.status(201).json({
            message: 'Produto deletado',
            _id: produtoId
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })

});


module.exports = router;