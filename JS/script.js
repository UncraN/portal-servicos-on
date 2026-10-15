// Cada objeto reúne os dados de um serviço do portal.
const servicos = [
    {
        nome: "Formatação de computadores",
        descricao: "Serviço de formatação e instalação do sistema operacional.",
        categoria: "software"
    },
    {
        nome: "Manutenção de computadores",
        descricao: "Análise e manutenção de computadores e notebooks com problemas.",
        categoria: "manutencao"
    },
    {
        nome: "Instalação de programas",
        descricao: "Instalação e configuração de programas para o usuário.",
        categoria: "software"
    },
    {
        nome: "Assistência técnica para celulares",
        descricao: "Análise e manutenção de celulares com problemas.",
        categoria: "manutencao"
    },
    {
        nome: "Manutenção de consoles e controles",
        descricao: "Diagnóstico e manutenção de consoles de videogame e controles.",
        categoria: "manutencao"
    }
];

console.table(servicos);
console.log(servicos[0].categoria);
console.log(servicos[1].descricao);

servicos.forEach((servico) => {
    console.log(servico.nome);
});

const campoServico = document.querySelector("#servico");
const botaoConsultar = document.querySelector("#btnConsultar");
const resultado = document.querySelector("#resultado");

botaoConsultar.addEventListener("click", () => {

    const escolha = campoServico.value;

    if (escolha === "") {

        resultado.textContent = "Escolha um serviço antes de consultar.";

    } else if (escolha === "formatacao") {

        resultado.textContent = "A formatação inclui a instalação do sistema operacional.";

    } else if (escolha === "manutencao") {

        resultado.textContent = "Realizamos análise e manutenção de computadores e notebooks.";

    } else if (escolha === "programas") {

        resultado.textContent = "Realizamos instalação e configuração de programas.";

    } else {

        resultado.textContent = "Serviço não identificado.";

    }

});
// O HTML fornece o container; a função cria os cards a partir do array.
const listaServicos = document.querySelector("#listaServicos");

function renderizarServicos(lista) {
    if (!listaServicos) {
        return;
    }

    // Limpar antes de renderizar evita cards duplicados.
    listaServicos.innerHTML = "";

    if (lista.length === 0) {
        listaServicos.textContent = "Nenhum serviço foi encontrado nesta categoria.";
        return;
    }

    lista.forEach((servico) => {
        const card = document.createElement("article");
        card.classList.add("card-servico");

        const titulo = document.createElement("h3");
        titulo.textContent = servico.nome;

        const descricao = document.createElement("p");
        descricao.textContent = servico.descricao;

        const link = document.createElement("a");
        link.href = "contato.html";
        link.textContent = "Solicitar serviço";

        card.append(titulo, descricao, link);
        listaServicos.appendChild(card);
    });
}

const filtroCategoria = document.querySelector("#filtroCategoria");
const mensagemFiltro = document.querySelector("#mensagemFiltro");

filtroCategoria.addEventListener("change", () => {
    const categoriaEscolhida = filtroCategoria.value;
    console.log(categoriaEscolhida);

    if (categoriaEscolhida === "todos") {
        renderizarServicos(servicos);
        mensagemFiltro.textContent = "Mostrando todos os serviços.";
    } else {
        // filter cria uma nova lista sem modificar o array original.
        const servicosFiltrados = servicos.filter((servico) => {
            return servico.categoria === categoriaEscolhida;
        });

        renderizarServicos(servicosFiltrados);
        mensagemFiltro.textContent = servicosFiltrados.length + " serviço(s) encontrado(s).";
    }
});

renderizarServicos(servicos);
mensagemFiltro.textContent = "Mostrando todos os serviços.";
