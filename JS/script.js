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