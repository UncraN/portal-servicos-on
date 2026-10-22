const formulario = document.querySelector("#formContato");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoAssunto = document.querySelector("#assunto");
const campoTelefone = document.querySelector("#telefone");
const campoMensagem = document.querySelector("#mensagem");
const mensagemForm = document.querySelector("#mensagemForm");

// A validação HTML continua ativa. invalid permite orientar também pelo DOM.
formulario.addEventListener("invalid", () => {
    mensagemForm.textContent = "Confira os campos obrigatórios e informe um e-mail válido.";
}, true);

formulario.addEventListener("input", () => {
    mensagemForm.textContent = "";
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const assunto = campoAssunto.value;
    const telefone = campoTelefone.value.trim();
    const mensagem = campoMensagem.value.trim();

    // required não rejeita textos formados apenas por espaços; trim resolve isso.
    if (nome === "" || email === "" || assunto === "" || telefone === "" || mensagem === "") {
        mensagemForm.textContent = "Preencha os campos obrigatórios antes de continuar. Não use apenas espaços.";
        const campoVazio = [campoNome, campoEmail, campoAssunto, campoTelefone, campoMensagem]
            .find((campo) => campo.value.trim() === "");
        campoVazio.focus();
        return;
    }

    mensagemForm.textContent = `Obrigado, ${nome}! Sua solicitação foi validada nesta demonstração. Nenhum dado foi enviado à loja.`;
});
