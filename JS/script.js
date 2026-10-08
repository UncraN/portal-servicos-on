// Cada objeto reúne os dados de um serviço do portal.
const servicos = [
    {
        nome: "Formatação de computadores",
        descricao: "Serviço de formatação e instalação do sistema operacional."
    },
    {
        nome: "Manutenção de computadores",
        descricao: "Análise e manutenção de computadores e notebooks com problemas."
    },
    {
        nome: "Instalação de programas",
        descricao: "Instalação e configuração de programas para o usuário."
    }
];

console.table(servicos);
console.log(servicos[0].nome);
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