import tabelaBRA from "../dados/dados.js";

export const buscarTabela = () => {
    return tabelaBRA;
}

export const buscarTabelaBraPornome = (timeBra) => {
    return tabelaBRA.filter(t => t.time.toLowerCase().includes(timeBra.toLowerCase()));
};

export const buscarTimePorId = (id) => {
    const idBra = parseInt(id);
    return tabelaBRA.find(time => time.id === idBra);
};

export function buscarTimePorSigla(sigla) {
    return tabelaBRA.find(t => t.sigla.toUpperCase() === sigla.toUpperCase());
}