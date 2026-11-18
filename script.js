document.addEventListener('DOMContentLoaded', () => {
    const menuLateral = document.getElementById('menu-lateral');
    const btnAbrir = document.getElementById('btn-menu');
    const btnFechar = document.getElementById('btn-fechar');

    // Verifica se os elementos realmente existem na tela antes de rodar
    if (btnAbrir && btnFechar && menuLateral) {
        
        // Abre o menu
        btnAbrir.addEventListener('click', () => {
            menuLateral.classList.add('aberto');
        });

        // Fecha o menu no X
        btnFechar.addEventListener('click', () => {
            menuLateral.classList.remove('aberto');
        });

        // Fecha o menu ao clicar em um link
        const linksMenu = menuLateral.querySelectorAll('a');
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                menuLateral.classList.remove('aberto');
            });
        });
        
    } else {
        console.error("Erro: Um ou mais botões do menu não foram encontrados no HTML.");
    }

    // encolhe o header quando percebe quando o site desce 50px para baixo
    const cabecalho = document.getElementById('cabecalho');

    if (cabecalho) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                cabecalho.classList.add('encolhido');
            } else {
                cabecalho.classList.remove('encolhido');
            }
        });
    }

});

    function myFunction() {
        const element = document.body;
        const isClaro = element.classList.toggle("claro-mode");

        const botaoTema =
            document.getElementById("btn-tema") ||
            document.querySelector("#menu-lateral button[onclick*='myFunction']");

        if (botaoTema) {
            botaoTema.textContent = isClaro ? "Modo escuro" : "Modo claro";
        }
    }

    //quiz
    const perguntasQuiz = [
        {
            pergunta: "1. Qual posição o Brasil ocupa no ranking mundial de reservas de terras-raras?",
            opcoes: [
                "1º lugar, à frente da China",
                "2º lugar, atrás apenas da China",
                "5º lugar, atrás dos EUA e Austrália"
            ],
            correta: 1,
            explicacao: "O Brasil tem a 2ª maior reserva conhecida do mundo, ficando abaixo apenas da China."
        },
        {
            pergunta: "2. Qual é o principal problema geopolítico do Brasil nos dias de hoje?",
            opcoes: [
                "Falta de minérios no subsolo",
                "Exportar matéria-prima bruta sem dominar o refino e a tecnologia",
                "Excesso de fábricas de semicondutores no país"
            ],
            correta: 1,
            explicacao: "O país fica 'um passo abaixo' na cadeia produtiva ao vender o minério bruto e importar tecnologia pronta."
        },
        {
            pergunta: "3. Quais os riscos ambientais na extração de terras-raras?",
            opcoes: [
                "Poluição das águas, desmatamento e a degradação do solo",
                "O barulho dos máquinarios.",
                "Nenhum, pois são minerais usados em energia limpa."
            ],
            correta: 0,
            explicacao: "A extração das Terras-raras podem contaminar solos e as águas pelos resíduos químicos dos minerios"
        }
    ];

    const containerQuiz = document.getElementById('container-quiz');
    if (containerQuiz) {
        let htmlQuiz = "";

        perguntasQuiz.forEach((q, index) => {
            const opcoesHTML = q.opcoes.map((opcao, i) => `
                <label class="opcao-quiz">
                    <input type="radio" name="pergunta-${index}" value="${i}">
                    ${opcao}
                </label>
            `).join('');

            htmlQuiz += `
                <div class="bloco-pergunta">
                    <p><strong>${q.pergunta}</strong></p>
                    ${opcoesHTML}
                    <p class="feedback-quiz" id="feedback-${index}"></p>
                </div>
            `;
        });

        htmlQuiz += `
            <button type="button" id="btn-corrigir-quiz">Verificar Respostas</button>
            <p id="resultado-final-quiz"></p>
        `;

        containerQuiz.innerHTML = htmlQuiz;

        document.getElementById('btn-corrigir-quiz').addEventListener('click', () => {
            let acertos = 0;

            perguntasQuiz.forEach((q, index) => {
                const marcada = document.querySelector(`input[name="pergunta-${index}"]:checked`);
                const feedback = document.getElementById(`feedback-${index}`);

                if (!marcada) {
                    feedback.textContent = "Selecione uma opção antes de corrigir.";
                    feedback.style.color = "var(--complemento1)";
                    return;
                }

                if (Number(marcada.value) === q.correta) {
                    acertos++;
                    feedback.textContent = "✔ Correto! " + q.explicacao;
                    feedback.style.color = "#6fb39b";
                } else {
                    feedback.textContent = "✘ Incorreto. " + q.explicacao;
                    feedback.style.color = "#f28482";
                }
            });

            document.getElementById('resultado-final-quiz').innerHTML =
                `<strong>Você acertou ${acertos} de ${perguntasQuiz.length} questões!</strong>`;
        });
    }

    // uso de filter
    const elementosTerrasRaras = [
        //           elementos               grupos        uso/especialidadde
            { nome: "Neodímio (Nd)", grupo: "Leve", uso: "Ímãs superpotentes para carros elétricos, turbinas eólicas e fones de ouvido." },
            { nome: "Cério (Ce)", grupo: "Leve", uso: "Catalisadores automotivos, polimento de vidros e lentes de precisão." },
            { nome: "Lantânio (La)", grupo: "Leve", uso: "Lentes de câmeras digitais, telescópios e baterias recarregáveis." },
            { nome: "Európio (Eu)", grupo: "Leve", uso: "Cor vermelha em telas de smartphones, TVs e lâmpadas LED." },
            { nome: "Térbio (Tb)", grupo: "Pesada", uso: "Cor verde em telas, sensores e ímãs resistentes ao calor." },
            { nome: "Disprósio (Dy)", grupo: "Pesada", uso: "Evita que ímãs de motores elétricos percam força em altas temperaturas." },
            { nome: "Ítrio (Y)", grupo: "Leve", uso: "LEDs, lasers médicos, telas de alta definição e supercondutores." },
            { nome: "Samário (Sm)", grupo: "Leve", uso: "Ímãs de alta estabilidade para defesa, aeroespacial e sensores." }
        ];
    
        const campoBusca = document.getElementById('campo-busca');
        const listaElementos = document.getElementById('lista-elementos');
    
        function renderizarElementos(lista) {
            if (!listaElementos) return;
            if (lista.length === 0) {
                listaElementos.innerHTML = `<p>Nenhum elemento encontrado.</p>`;
                return;
            }
            listaElementos.innerHTML = lista.map(item => `
                <div class="card-elemento">
                    <h4>${item.nome} <span>(${item.grupo})</span></h4>
                    <p>${item.uso}</p>
                </div>
            `).join('');
        }
    
        if (listaElementos) {
            renderizarElementos(elementosTerrasRaras);
        }
    
        if (campoBusca) {
            campoBusca.addEventListener('input', () => {
                const termo = campoBusca.value.toLowerCase().trim();
                const filtrados = elementosTerrasRaras.filter(el =>
                    el.nome.toLowerCase().includes(termo) ||
                    el.grupo.toLowerCase().includes(termo) ||
                    el.uso.toLowerCase().includes(termo)
                );
                renderizarElementos(filtrados);
            });
        }