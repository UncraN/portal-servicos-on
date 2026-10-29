# ON Notebooks e Celulares

## Sobre o projeto

Portal de serviços desenvolvido para a disciplina de Programação Web Front-End.
Reúne informações sobre assistência técnica para celulares, notebooks, computadores e consoles.
O visitante pode filtrar o catálogo, consultar orientações e guardar um serviço favorito.
Também pode testar um formulário de contato e consultar endereços brasileiros por CEP.

## Tecnologias utilizadas

- HTML5 semântico e recursos de acessibilidade.
- CSS3 externo, Flexbox, Grid e media query para telas pequenas.
- JavaScript: eventos, DOM, arrays de objetos, `forEach`, `filter` e validação.
- LocalStorage para a preferência de serviço no navegador.
- Fetch API, `async/await`, JSON e API pública ViaCEP.
- Git, GitHub e GitHub Pages.

## Funcionalidades

- Catálogo com cinco serviços criado a partir do array `servicos`.
- Filtro com duas opções de Software, três de Manutenção e opção Todos.
- Consulta de orientações dos três serviços originais.
- Formulário com labels, campos obrigatórios, e-mail e validação JavaScript de espaços em branco.
- Favorito persistido na chave `servicoFavorito`, com tratamento de armazenamento bloqueado.
- Consulta de CEP com validação, carregamento, endereço, CEP inexistente e tratamento de falhas.
- Navegação por teclado, link para pular ao conteúdo, foco visível e página atual identificada.

O formulário é uma demonstração: valida os dados e mostra uma confirmação, sem enviar à loja nem armazenar dados pessoais. Não há servidor de atendimento.

## Organização dos arquivos

```text
portal-servicos-on/
  index.html          Página inicial
  servicos.html       Catálogo, filtro, orientação, favorito e consulta de CEP
  contato.html        Formulário de demonstração
  css/style.css       Estilos e responsividade
  img/logo.png        Logotipo da ON
  JS/script.js        Array, cards, filtro e orientação de serviços
  JS/favorito.js      Gravação e recuperação da preferência
  JS/contato.js       Validação do formulário
  JS/cep.js           Integração com ViaCEP
  README.md           Documentação e roteiro de revisão
```

Os caminhos usam `JS/` com letras maiúsculas, como a pasta existente. Isso precisa ser respeitado no GitHub Pages.

## API utilizada

O [ViaCEP](https://viacep.com.br/) é um serviço público de consulta de endereços. A aplicação faz uma requisição HTTPS GET e recebe JSON, sem precisar de chave de acesso.

Exemplo: `https://viacep.com.br/ws/01001000/json/`.

Em `JS/cep.js`, a função `buscarCep()` segue este fluxo:

1. `replace(/\D/g, "")` remove caracteres não numéricos. Se não restarem oito dígitos, mostra orientação, posiciona o foco e encerra com `return`, sem chamar a API.
2. Mostra “Consultando CEP...”, limpa o resultado e bloqueia consultas repetidas durante a espera.
3. `fetch` inicia a consulta; `await` espera a resposta sem travar o restante da página.
4. `resposta.ok` confere o sucesso HTTP. `await resposta.json()` converte o JSON em objeto JavaScript.
5. `dados.erro` identifica um CEP inexistente. Uma resposta sem cidade/UF utilizáveis também é tratada como falha.
6. `textContent` mostra logradouro, bairro e cidade/UF no DOM, sem interpretar HTML vindo da API. Campos opcionais vazios recebem textos alternativos.
7. `catch` mostra orientação em falhas de rede, HTTP ou JSON. `AbortController` encerra a espera após dez segundos.
8. `finally` libera os controles e encerra o carregamento em todos os casos.

O evento `submit` com `preventDefault()` permite pesquisar pelo botão ou por Enter sem recarregar a página. O status usa `aria-live`, e o resultado informa `aria-busy` durante a consulta. O CEP não é salvo no LocalStorage; ele é enviado ao ViaCEP para a pesquisa. A disponibilidade e os dados dependem desse serviço externo.

## Como executar e testar

Use um servidor local, como Live Server no VS Code, e abra `index.html`. Outra opção, com Python instalado, é executar na pasta do projeto:

```sh
python -m http.server 8000
```

Depois acesse `http://localhost:8000`. Use o servidor local ou a versão publicada para testar LocalStorage e a API de forma consistente.

### Roteiro de testes

1. Abra Início, Serviços e Contato. Confira navegação, CSS, logotipo e Console sem erros JavaScript.
2. Em Serviços, confira cinco cards. Filtre Software (dois), Manutenção (três) e Todos (cinco). Troque várias vezes e verifique que os cards não duplicam.
3. Consulte uma orientação sem selecionar e depois com cada um dos três serviços originais.
4. Salve um favorito e atualize a página. Troque o favorito e atualize novamente. Confira somente `servicoFavorito` no armazenamento local.
5. Em Contato, use dados fictícios: Pessoa Teste e pessoa@example.com. Teste campos vazios, e-mail inválido, textos apenas com espaços e preenchimento válido. A confirmação aparece sem navegação e sem envio de dados.
6. Na consulta de CEP, teste campo vazio e `123`: deve aparecer “Digite um CEP com 8 números.” sem requisição à API.
7. Teste `01001-000` e `01001000`: o resultado deve indicar Praça da Sé, Sé, São Paulo/SP. Durante a espera aparece “Consultando CEP...”.
8. Teste `99999999`: deve aparecer “CEP não encontrado.” e nenhum endereço antigo deve permanecer.
9. No DevTools, bloqueie a URL do ViaCEP ou simule rede offline. Consulte um CEP válido: a falha deve aparecer na página e permitir nova tentativa. Restaure a rede. Se a resposta demorar mais de dez segundos, confira a orientação de tempo excedido.
10. Navegue com Tab, Shift+Tab e Enter. Confira o link “Pular para o conteúdo”, os labels e o foco visível. Teste o CEP também por Enter.
11. Confira as três páginas em 320, 375 e 1280 pixels, sem rolagem horizontal.
12. Repita as funções na versão publicada, preferencialmente em outro navegador ou janela anônima.

Para estudar a renderização, execute `renderizarServicos([])` no Console e confira a mensagem de lista vazia. Depois execute `renderizarServicos(servicos)` para restaurar os cinco cards.

### Verificação automatizada desta etapa — 28/10/2026

Foram aprovados 20 grupos de testes em navegador Microsoft Edge, cobrindo as três páginas, recursos locais, catálogo, filtros, orientações, favorito, validação do formulário, teclado e responsividade em 320/375/1280 pixels. Nenhum erro JavaScript não tratado foi observado.

Os cenários de carregamento, CEP inexistente, erro HTTP, rede indisponível, JSON inválido, resposta incompleta, campos opcionais ausentes, texto externo e timeout foram exercitados com respostas controladas. O armazenamento bloqueado e uma preferência antiga também foram testados.

Além das simulações, consultas reais ao ViaCEP no navegador confirmaram `01001-000` (São Paulo/SP) e `99999999` (CEP inexistente). Os arquivos JavaScript passaram pela verificação de sintaxe. O layout das páginas de Serviços em desktop e celular foi inspecionado visualmente.

Essas verificações automatizadas não substituem a revisão pessoal do aluno nem uma avaliação completa com leitor de tela.

## Checklist final

- [x] HTML semântico, navegação e CSS externo.
- [x] Identidade visual preservada, imagem com alt correto e layout responsivo.
- [x] Cards, array de objetos, `forEach`, `filter`, eventos, decisões e DOM.
- [x] Formulário com labels, tipos apropriados, `required` e validação JavaScript.
- [x] Favorito mantido após atualizar, com tratamento de armazenamento indisponível.
- [x] API com carregamento, validação, CEP inexistente e tratamento de falhas.
- [x] JavaScript separado do HTML e caminhos com capitalização consistente.
- [x] Navegação por teclado, contraste básico e foco visível.
- [x] README com funcionalidades, tecnologias, API, testes e Panorama Front-End.
- [x] Integração versionada no GitHub e portal publicado no GitHub Pages, com testes na versão pública.
- [ ] Aluno repetir os testes, revisar as explicações e preparar a demonstração oral.
- [ ] Aluno enviar os links do repositório e do portal à professora.

## Publicação

Repositório: [UncraN/portal-servicos-on](https://github.com/UncraN/portal-servicos-on).

GitHub Pages: [Portal ON](https://uncran.github.io/portal-servicos-on/).

Publicação por `master`, pasta raiz (`/`), ativada em 28/10/2026. As três páginas e seus recursos foram verificados na versão pública. Os 20 grupos de testes também foram aprovados no site publicado, em um contexto novo de navegador, incluindo catálogo, formulário, favorito, teclado e telas pequenas. As consultas reais de CEP válido e inexistente foram confirmadas novamente nessa versão.

## Autor

Rafael Wammes.

Projeto acadêmico da disciplina de Programação Web Front-End.

## Uso de IA e preparação para a apresentação

A IA auxiliou na leitura da atividade, integração com ViaCEP, revisão de acessibilidade, documentação e testes automatizados. O aluno deve revisar o resultado, executar o roteiro e registrar seus próprios ajustes, sem declarar uma revisão pessoal ainda não realizada.

Para a apresentação, localize o array em `JS/script.js`, explique a diferença entre `forEach` e `filter`, demonstre `preventDefault()` e `trim()` em `JS/contato.js`, mostre o favorito após atualizar e explique a sequência `fetch` → `await` → `ok` → `json()` → dados → DOM → tratamento de erro em `JS/cep.js`.

## Panorama Front-End

1. **Componentização:** é dividir a interface em partes que podem ser reutilizadas, como um card de serviço. Neste portal, a função de renderização cria cards com a mesma estrutura; isso facilita manter a apresentação consistente e alterar essa estrutura em um só lugar.
2. **Multipágina e SPA:** neste portal multipágina, abrir Serviços ou Contato carrega outro documento HTML. Em uma SPA, a aplicação costuma atualizar o conteúdo e controlar a navegação com JavaScript, sem carregar um documento inteiro a cada troca de tela.
3. **Bootstrap:** é um conjunto de estilos e componentes prontos, com um sistema de grade responsiva. Pode acelerar uma interface com menus, formulários e colunas quando não é necessário criar tudo do zero. Este projeto usa CSS próprio.
4. **React, Vue e Angular:** React é uma biblioteca para construir interfaces com componentes; Vue é um framework progressivo com componentes reativos; Angular é um framework com uma estrutura mais completa, normalmente usando TypeScript, para organizar aplicações. Nenhum deles é necessário para o funcionamento deste portal.
5. **Base da Web:** frameworks ajudam a organizar a aplicação, mas a interface ainda depende de HTML, CSS e JavaScript. Conhecer essa base permite compreender o resultado, corrigir erros, adaptar o layout e cuidar da acessibilidade.
6. **IA no desenvolvimento:** pode ajudar a explicar erros, sugerir soluções e elaborar testes. É preciso ler, testar e adaptar o que ela produz para conseguir explicar o código e perceber sugestões que não atendem ao projeto.

Estas explicações foram elaboradas com auxílio de IA e devem ser revistas pelo aluno para a apresentação com suas próprias palavras.
