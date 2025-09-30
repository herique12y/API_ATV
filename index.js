import express from 'express';
import { 
    buscarTabela, 
    buscarTimePorId, 
    buscarTabelaBraPornome, 
    buscarTimePorSigla
} from './servico/servico.js';

const app = express();

app.get('/bra', (req, res) => {
    const timeBRA = req.query.busca;
    const resultado = timeBRA ? buscarTabelaBraPornome(timeBRA) : buscarTabela();

    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro": "Nenhum Time encontrado" });
    }
});

app.get('/bra/:idbra', (req, res) => {
    const idBRA = parseInt(req.params.idbra);
    const bra = buscarTimePorId(idBRA);

    if (isNaN(idBRA)) {
        return res.status(400).json({ "erro": "Requisição inválida" });
    }

    if (bra) {
        res.json(bra);
    } else {
        res.status(404).json({ "erro": "Time não encontrado" });
    }
});

app.get('/bra/sigla/:sigla', (req, res) => {
    const sigla = (req.params.sigla || "").toUpperCase();
    const time = buscarTimePorSigla(sigla);

    if (!/^[A-Z]{2,4}$/.test(sigla)) {
        return res.status(400).json({ "erro": "Sigla inválida. Exemplo: FLA, PAL, COR" });
    }

    if (time) {
        res.json(time);
    } else {
        res.status(404).json({ "erro": "Time não encontrado" });
    }
});

app.listen(6060, () => {
    let data = new Date();
    console.log("Servidor iniciado na porta 6060 em: " + data);
});
