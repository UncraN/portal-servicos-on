# ON Notebooks e Celulares

Portal de Serviços desenvolvido para a disciplina de Programação Web.

## Entrega 1 - Aulas 1 a 6

O projeto apresenta uma página de serviços da ON Notebooks e Celulares.

Foram utilizados:

- HTML5 semântico
- Navegação entre páginas
- Listas
- Imagens com texto alternativo
- Formulário com validação HTML
- Acessibilidade básica
- CSS externo
- Git e GitHub

## Páginas

- Página Inicial
- Serviços
- Contato

## Autor

Rafael Wammes
## Aulas 09 e 10 - Catálogo dinâmico

Os três serviços reais do portal estão organizados no array `servicos`, em
`JS/script.js`. Cada objeto contém `nome` e `descricao`.

- `console.table` permite conferir os objetos; os índices começam em zero.
- `forEach` executa uma ação para cada serviço.
- `renderizarServicos()` limpa o container e cria um card para cada objeto.
- `document.createElement` cria os elementos; `textContent` define seus textos.
- `append` coloca o título, a descrição e o link dentro do card;
  `appendChild` insere o card em `#listaServicos`.
- A consulta com select, botão e if/else da Aula 08 foi preservada.

### Como conferir

Abra `servicos.html` no navegador. Confira os três cards e o Console (F12).
Teste a consulta sem seleção e com cada um dos três serviços. No Console,
execute `renderizarServicos(servicos)` novamente: os cards não devem duplicar.
Para adicionar um serviço, inclua outro objeto no array e recarregue a página.

### Versionamento

1. Organização dos dados: `Organiza serviços em array de objetos`.
2. Geração dos cards: `Cria catálogo dinâmico de serviços com JavaScript`.

Repositório: https://github.com/UncraN/portal-servicos-on
Após enviar os commits com `git push`, confira o histórico no GitHub.
Se o GitHub Pages estiver habilitado, confira a publicação atualizada.


## Aula 11 - Filtro interativo de serviços

O catálogo agora contém cinco serviços, com `nome`, `descricao` e `categoria`.
As categorias são `software` (formatação e instalação de programas) e
`manutencao` (computadores, celulares e consoles/controles). Os dois serviços
acrescentados já são mencionados na página inicial do portal.

O campo `#filtroCategoria` permite escolher Todos, Software ou Manutenção.
Os cards são atualizados sem recarregar a página, mantendo o link de contato,
o CSS responsivo e a consulta da Aula 8. A mensagem do filtro usa `aria-live`.

### Como explicar o código

- `change` percebe a troca de opção; `value` devolve o valor selecionado.
- `filter` cria uma nova lista de serviços da categoria, sem alterar o array original.
- `forEach` percorre essa lista para criar os cards no DOM.
- `renderizarServicos(lista)` recebe tanto o catálogo completo quanto uma lista filtrada.
- A limpeza do container evita duplicações. `length` informa a quantidade de itens;
  quando é zero, a função mostra uma orientação e `return` encerra a execução.

### Roteiro de testes

1. Abra `servicos.html`: devem aparecer cinco cards e a mensagem de todos os serviços.
2. Selecione Software: devem aparecer dois cards.
3. Selecione Manutenção: devem aparecer três cards.
4. Volte para Todos: devem reaparecer cinco cards, sem duplicação.
5. No Console, execute `renderizarServicos([])` para conferir a mensagem de lista vazia.
   Execute `renderizarServicos(servicos)` para restaurar o catálogo.
6. Teste a consulta sem seleção e com cada uma das três opções originais.
7. Confira o Console, o acesso ao filtro com Tab e o layout em tela estreita.

### Registro do uso de IA

- Pedido: ler a atividade da Aula 11 e atualizar o projeto existente.
- Alterações produzidas: categorias nos objetos, dois serviços já citados no portal,
  select acessível, evento change, filter, renderização por parâmetro e lista vazia.
- Revisão do aluno: executar o roteiro acima, revisar o código e registrar aqui
  quaisquer ajustes próprios antes da entrega. Não declarar testes pessoais ainda não feitos.

### Entrega no GitHub

Após revisar e testar as alterações locais:

```sh
git status
git add JS/script.js servicos.html README.md
git commit -m "Adiciona filtro de categorias ao catálogo"
git push
```

Confira o repositório e, se habilitado, o GitHub Pages após a publicação.


## Aula 12 - Validação do formulário

O formulário de contato mantém seus campos, labels, `required` e `type="email"`.
O arquivo `JS/contato.js` é carregado somente em `contato.html`, preservando o
catálogo e a consulta de serviços. A mensagem `#mensagemForm` usa `aria-live`.

- `submit` trata o envio por botão ou teclado; `click` trata um clique.
- `preventDefault()` impede o envio e a navegação padrão nesta demonstração.
- `value` lê o campo e `trim()` remove espaços nas extremidades.
- `||` significa OU; `return` encerra a função quando falta uma informação.
- O evento `invalid` mostra orientação no DOM sem desativar a validação HTML.
- O formulário apenas valida e confirma na página: não envia à loja nem salva
  nome, e-mail, telefone ou mensagem no armazenamento do navegador.

### Testar a validação

Use dados fictícios (por exemplo, Pessoa Teste e pessoa@example.com).
Teste campos vazios, e-mail inválido, textos só com espaços e todos os campos
preenchidos. Confira que a confirmação aparece sem recarregar a página.
Percorra os campos e o botão com Tab e confira o Console sem erros.

### Uso de IA nesta etapa

Foi solicitado adaptar a atividade ao portal existente. A implementação inclui
validação dos campos reais, orientação no DOM e confirmação de demonstração.
O aluno deve executar os testes, compreender o código e registrar seus próprios
ajustes antes da entrega.


## Aula 13 - Serviço favorito com LocalStorage

Em `servicos.html`, a seção Meu serviço favorito oferece os cinco serviços reais
do catálogo. O arquivo `JS/favorito.js` salva somente o código escolhido na chave
`servicoFavorito`. Nenhum dado do formulário é armazenado.

- `setItem(chave, valor)` grava ou substitui o favorito no navegador.
- `getItem(chave)` recupera o valor ao abrir ou atualizar a página.
- O armazenamento pertence à origem do site e ao perfil do navegador; não é
  gravado no HTML e não é compartilhado automaticamente com outros aparelhos.
- `try/catch` permite orientar quando o navegador bloqueia o armazenamento.
- Valores antigos que não correspondem às opções atuais são ignorados.
- `textContent` mostra o nome legível do serviço nas mensagens.

### Testar a preferência

1. Clique em Salvar favorito sem escolher: deve aparecer uma orientação.
2. Escolha um serviço e salve: a confirmação deve mostrar seu nome.
3. Pressione F5: a seleção e a mensagem devem retornar.
4. Salve outro serviço e atualize: o novo favorito substitui o anterior.
5. Em F12 > Application > Local Storage, confira `servicoFavorito`.
6. Confira que o formulário, o filtro e a consulta continuam funcionando.

Para testar de forma consistente, use um servidor local (por exemplo, Live Server)
ou o site publicado. O comportamento de LocalStorage em endereços `file://` pode
variar entre navegadores. Limpar os dados do site remove a preferência.

### Verificação automatizada das Aulas 12 e 13

Testes executados com dados fictícios em navegador: campos vazios, e-mail inválido,
textos apenas com espaços, confirmação sem navegação, acesso por teclado,
filtro e catálogo anteriores, consulta e telas de 320, 375 e 1280 pixels.
Preferência testada ao salvar, recarregar e substituir; também foram verificados
valor antigo e armazenamento indisponível. Nenhum erro JavaScript foi observado.
O teste confirmou que somente o código do favorito fica no LocalStorage.

### Evoluções no Git

1. `Adiciona validação JavaScript ao formulário`: validação e mensagens em contato.
2. `Adiciona preferência de serviço com LocalStorage`: gravação e recuperação do favorito.

### Uso de IA na preferência

A atividade foi adaptada com os cinco serviços do portal e mensagens acessíveis.
O código foi testado automaticamente; o aluno ainda deve repetir o roteiro,
explicar `setItem` e `getItem` e registrar eventuais alterações próprias.
