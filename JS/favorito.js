const campoFavorito = document.querySelector("#servicoFavorito");
const botaoFavorito = document.querySelector("#btnSalvarFavorito");
const mensagemFavorito = document.querySelector("#favoritoSalvo");

botaoFavorito.addEventListener("click", () => {
    const servico = campoFavorito.value;

    if (servico === "") {
        mensagemFavorito.textContent = "Escolha um serviço primeiro.";
        campoFavorito.focus();
        return;
    }

    try {
        // Guardamos apenas o código do serviço, sem dados do formulário.
        localStorage.setItem("servicoFavorito", servico);
        const nomeServico = campoFavorito.selectedOptions[0].textContent;
        mensagemFavorito.textContent = `Favorito salvo: ${nomeServico}.`;
    } catch {
        mensagemFavorito.textContent = "Não foi possível salvar o favorito neste navegador. Verifique se o armazenamento está permitido.";
    }
});

try {
    const favoritoSalvo = localStorage.getItem("servicoFavorito");
    // Uma preferência antiga pode apontar para um serviço que não existe mais.
    const opcaoSalva = Array.from(campoFavorito.options).find((opcao) => {
        return opcao.value !== "" && opcao.value === favoritoSalvo;
    });

    if (opcaoSalva) {
        campoFavorito.value = favoritoSalvo;
        mensagemFavorito.textContent = `Seu serviço favorito é: ${opcaoSalva.textContent}.`;
    }
} catch {
    mensagemFavorito.textContent = "Não foi possível recuperar o favorito neste navegador. Você ainda pode consultar o catálogo.";
}
