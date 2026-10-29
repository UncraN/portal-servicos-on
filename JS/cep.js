const formularioCep = document.querySelector("#formCep");
const campoCep = document.querySelector("#cep");
const botaoBuscarCep = document.querySelector("#btnBuscarCep");
const statusCep = document.querySelector("#statusCep");
const resultadoCep = document.querySelector("#resultadoCep");

async function buscarCep() {
    // Evita consultas duplicadas enquanto a primeira ainda está em andamento.
    if (botaoBuscarCep.disabled) {
        return;
    }

    const cep = campoCep.value.replace(/\D/g, "");
    resultadoCep.textContent = "";

    if (cep.length !== 8) {
        statusCep.textContent = "Digite um CEP com 8 números.";
        campoCep.setAttribute("aria-invalid", "true");
        campoCep.focus();
        return;
    }

    campoCep.removeAttribute("aria-invalid");
    statusCep.textContent = "Consultando CEP...";
    botaoBuscarCep.disabled = true;
    campoCep.readOnly = true;
    resultadoCep.setAttribute("aria-busy", "true");

    // Se o serviço demorar demais, libera a tela para uma nova tentativa.
    const controle = new AbortController();
    const limite = setTimeout(() => controle.abort(), 10000);

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            signal: controle.signal
        });

        if (!resposta.ok) {
            throw new Error("Falha na consulta ao serviço.");
        }

        const dados = await resposta.json();

        if (dados && dados.erro) {
            statusCep.textContent = "CEP não encontrado.";
            return;
        }

        if (!dados || typeof dados.localidade !== "string" || !dados.localidade.trim() ||
            typeof dados.uf !== "string" || !/^[A-Z]{2}$/.test(dados.uf)) {
            throw new Error("Resposta de endereço incompleta.");
        }

        // textContent exibe os dados como texto, sem interpretar HTML externo.
        resultadoCep.textContent =
            `${dados.logradouro || "Logradouro não informado"} - ` +
            `${dados.bairro || "Bairro não informado"} - ` +
            `${dados.localidade}/${dados.uf}`;
        statusCep.textContent = "CEP encontrado.";
    } catch (erro) {
        statusCep.textContent = erro.name === "AbortError"
            ? "A consulta demorou demais. Tente novamente."
            : "Não foi possível consultar o CEP agora. Verifique sua conexão e tente novamente.";
    } finally {
        // Executado também para CEP inexistente e falhas de rede/HTTP/JSON.
        clearTimeout(limite);
        botaoBuscarCep.disabled = false;
        campoCep.readOnly = false;
        resultadoCep.setAttribute("aria-busy", "false");
    }
}

// submit atende tanto ao clique no botão quanto à tecla Enter no campo.
formularioCep.addEventListener("submit", (evento) => {
    evento.preventDefault();
    buscarCep();
});

campoCep.addEventListener("input", () => {
    campoCep.removeAttribute("aria-invalid");
    statusCep.textContent = "";
    resultadoCep.textContent = "";
});
