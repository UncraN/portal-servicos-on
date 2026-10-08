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
execute `renderizarServicos()` novamente: os cards não devem duplicar.
Para adicionar um serviço, inclua outro objeto no array e recarregue a página.

### Versionamento

1. Organização dos dados: `Organiza serviços em array de objetos`.
2. Geração dos cards: `Cria catálogo dinâmico de serviços com JavaScript`.

Repositório: https://github.com/UncraN/portal-servicos-on
Após enviar os commits com `git push`, confira o histórico no GitHub.
Se o GitHub Pages estiver habilitado, confira a publicação atualizada.
