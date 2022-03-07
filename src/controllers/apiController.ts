import { Request, Response } from "express";
import { Phrase } from "../models/phrase";
import { Op, Sequelize } from "sequelize";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true})
}

export const randon = (req: Request, res: Response) => {
    let nRandon: number = Math.floor(Math.random() * 10);
    res.json({number: nRandon});
}

export const name = (req: Request, res: Response) => {
    let nomeRecebido: string = req.params.nomeRecebido;
    res.json({nome: nomeRecebido});
}

export const createPhrases = async (req: Request, res: Response) => {
    let author: string = req.body.author;
    let txt: string = req.body.txt;

    let newPhrase = await Phrase.create({
        author: author,
        txt: txt
    })

    res.status(201);
    res.json({
        id: newPhrase.id,
        author: newPhrase.author,
        txt: newPhrase.txt
    })
}

export const getPhrases = async (req: Request, res: Response) => {
    let allPhrases = await Phrase.findAll({});

    res.json(allPhrases);
}

export const getSpecificPhrase = async (req: Request, res: Response) => {
    let id: number = req.body.id;

    let specificPhrase = await Phrase.findAll({
        where: {
            id: id
        }
    })

    if(specificPhrase) {
        res.json({specificPhrase})
    } else {
        res.json({erro: 'Frase não encontrada'})
    }
    
}

export const changePhrase = async (req: Request, res: Response) => {
    let {id, author, txt} = req.body;

    let phrase = await Phrase.findByPk(id);

    if(phrase) {
        phrase.author = author;
        phrase.txt = txt;

        await phrase.save();

        res.json({phrase})
    } else {
        res.json({erro: 'A frase não foi encontrada'})
    }
}

export const deletePhrase = async (req: Request, res: Response) => {
    let { id } = req.params;

    let phrase = await Phrase.findByPk(id);

    if(phrase) {
        await phrase.destroy();

        res.json({sucesso: 'Frase deletada com sucesso'})
    } else {
        res.json({erro: 'Frase não pode ser deletada ou encontrada'})
    }
}

export const randomPhrase = async (req: Request, res: Response) => {
    let phrase = await Phrase.findOne({
        order: [
            Sequelize.fn('RANDOM')
        ]
    });

    if(phrase) {
        res.json({phrase})
    } else {
        res.json({erro: 'Não há frases cadastradas'})
    }
}