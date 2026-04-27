// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      // Listen for updates
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          // Has network content changed?
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New update available');
          }
        });
      });
    }).catch(err => console.log('SW Reg Failed', err));
  });

  // Auto-reload when the new service worker takes over
let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
}

// ------------------------------------
// UTILS: SHUFFLE
// ------------------------------------
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ------------------------------------
// DATABASE: NÍVEL 1 (Base Lore)
// ------------------------------------
const level1Data = [
    { question: "Por que o Brasil precisou de regentes após 1831?", shortQ: "Por que houve Regências?", answer: "Porque Dom Pedro II tinha apenas 5 anos quando Dom Pedro I abdicou, sendo jovem demais para governar.", fakeAnswer: "Porque o Parlamento aboliu a monarquia e criou um governo coletivo temporário.", shortA: "Dom Pedro II era criança (5 anos)", image: "" },
    { question: "O que foi a Regência Trina Provisória?", shortQ: "Regência Trina Provisória", answer: "Um governo de emergência formado por três membros da Assembleia, logo após a abdicação de Dom Pedro I em 1831.", fakeAnswer: "Um governo formado por três imperadores que se revezavam mensalmente no poder.", shortA: "Governo de emergência com 3 membros", image: "" },
    { question: "O que a Regência Trina Permanente criou em 1831?", shortQ: "Criação da Guarda Nacional", answer: "A Guarda Nacional, uma força militar que fortaleceu o poder dos grandes proprietários rurais.", fakeAnswer: "A Constituição de 1831, que dava direito ao voto para todos os cidadãos livres.", shortA: "A Guarda Nacional (1831)", image: "" },
    { question: "O que o Ato Adicional de 1834 criou?", shortQ: "Ato Adicional de 1834", answer: "A Regência Una (um único regente eleito) e as Assembleias Legislativas Provinciais.", fakeAnswer: "O cargo de Vice-Imperador e a proibição de partidos políticos nas províncias.", shortA: "Regência Una e Assembleias Provinciais", image: "" },
    { question: "Quem foi o primeiro regente uno eleito?", shortQ: "Primeiro regente uno", answer: "Padre Diogo Feijó, eleito em 1835, que renunciou em 1837 por falta de apoio político.", fakeAnswer: "Araújo Lima, um militar que governou por apenas seis meses antes de ser deposto.", shortA: "Padre Diogo Feijó", image: "" },
    { question: "O que foi o Golpe da Maioridade (1840)?", shortQ: "Golpe da Maioridade", answer: "O Parlamento declarou Dom Pedro II maior de idade com apenas 14 anos para encerrar o caos das Regências.", fakeAnswer: "Dom Pedro II expulsou os regentes à força e assumiu o trono aos 18 anos conforme a Constituição.", shortA: "Dom Pedro II assumiu com 14 anos", image: "" },
    { question: "Onde ocorreu a Revolta dos Malês?", shortQ: "Local da Revolta dos Malês", answer: "Em Salvador, na Bahia, que tinha grande concentração de africanos escravizados e libertos.", fakeAnswer: "No Rio de Janeiro, capital do Império, durante uma grande feira de escravizados.", shortA: "Salvador, Bahia", image: "" },
    { question: "Quem eram os Malês?", shortQ: "Quem eram os Malês?", answer: "Africanos muçulmanos escravizados na Bahia, muitos deles alfabetizados em árabe.", fakeAnswer: "Soldados africanos enviados por Portugal para sufocar revoltas no interior do Nordeste.", shortA: "Africanos muçulmanos escravizados", image: "" },
    { question: "Qual foi o principal fator que diferenciou os Malês de outros grupos revoltosos?", shortQ: "Diferencial dos Malês", answer: "Eram alfabetizados em árabe e organizaram a revolta por escrito, de forma planejada e secreta.", fakeAnswer: "Possuíam armas de fogo trazidas contrabandeadas da África Ocidental.", shortA: "Alfabetizados em árabe e organizados", image: "" },
    { question: "O que aconteceu com os líderes da Revolta dos Malês após a repressão?", shortQ: "Desfecho da Revolta dos Malês", answer: "Foram mortos em combate, presos, açoitados ou deportados de volta à África.", fakeAnswer: "Foram anistiados pelo governo imperial, que temeu novas revoltas maiores.", shortA: "Mortes, prisões e deportações", image: "" }
];

// ------------------------------------
// DATABASE: NÍVEL 2 (Formal & Aprofundado)
// ------------------------------------
const level2Data = [
    { question: "Qual a principal razão constitucional que motivou o período das Regências no Brasil?", shortQ: "Base constitucional das Regências", answer: "A Constituição de 1824 exigia que o imperador tivesse 18 anos para governar, tornando necessária a figura dos regentes.", fakeAnswer: "A Constituição determinava que, em caso de guerra civil, o poder seria exercido por um conselho de ministros.", shortA: "Constituição exigia 18 anos para governar", image: "" },
    { question: "Qual a consequência política mais duradoura da criação da Guarda Nacional em 1831?", shortQ: "Legado da Guarda Nacional", answer: "Fortaleceu o poder local dos grandes proprietários rurais, semeando as bases do Coronelismo.", fakeAnswer: "Centralizou o poder militar no Rio de Janeiro e enfraqueceu as milícias regionais.", shortA: "Semeou o Coronelismo", image: "" },
    { question: "Qual tendência política o Ato Adicional de 1834 representou?", shortQ: "Tendência do Ato Adicional", answer: "A descentralização do poder, pois ampliou a autonomia das províncias com as Assembleias Legislativas.", fakeAnswer: "A centralização monárquica, pois extinguiu o poder legislativo das províncias.", shortA: "Descentralização e autonomia provincial", image: "" },
    { question: "Por que a renúncia de Padre Feijó em 1837 foi significativa?", shortQ: "Renúncia de Feijó", answer: "Demonstrou a fragilidade do poder central: mesmo com um único regente eleito, o governo era incapaz de controlar as revoltas regionais.", fakeAnswer: "Representou uma vitória dos escravocratas, que forçaram sua saída por ser contrário à escravidão.", shortA: "Fragilidade do poder central", image: "" },
    { question: "O 'Golpe da Maioridade' beneficiou principalmente qual grupo político?", shortQ: "Beneficiado pelo Golpe da Maioridade", answer: "Os liberais, que articularam a antecipação da maioridade para retornar ao poder e encerrar o governo conservador de Araújo Lima.", fakeAnswer: "Os militares, que queriam um imperador jovem e maleável para controlar as decisões do Executivo.", shortA: "Os liberais", image: "" },
    { question: "Como a alfabetização em árabe impactou a organização da Revolta dos Malês?", shortQ: "Árabe na organização dos Malês", answer: "Permitiu comunicação escrita e secreta entre os líderes, dificultando a vigilância das autoridades coloniais.", fakeAnswer: "Serviu apenas para fins religiosos; a organização da revolta foi feita exclusivamente por gestos e sinais.", shortA: "Comunicação secreta e escrita", image: "" },
    { question: "Qual aspecto da Revolta dos Malês a diferencia das revoltas escravas tradicionais no Brasil?", shortQ: "O que diferenciou os Malês", answer: "O alto nível de planejamento, a liderança intelectual religiosa e a participação de libertos — não apenas escravizados.", fakeAnswer: "O fato de ter sido financiada por fazendeiros brancos descontentes com a política do Império.", shortA: "Planejamento, religião e participação de libertos", image: "" },
    { question: "Qual foi o principal impacto da repressão à Revolta dos Malês sobre a população africana na Bahia?", shortQ: "Impacto pós-revolta na Bahia", answer: "Aumentou brutalmente o controle e a vigilância sobre africanos livres e escravizados, restringindo ainda mais seus direitos.", fakeAnswer: "Gerou um debate nacional que acelerou o processo de abolição da escravidão no Brasil.", shortA: "Maior repressão e vigilância sobre africanos", image: "" },
    { question: "As Regências e a Revolta dos Malês ocorreram no mesmo período. Qual relação existe entre eles?", shortQ: "Relação entre Regências e Malês", answer: "A instabilidade política das Regências criou um ambiente de enfraquecimento do Estado, facilitando o surgimento de revoltas como a dos Malês.", fakeAnswer: "Não há relação; a Revolta dos Malês foi financiada por Portugal para desestabilizar o governo regencial.", shortA: "Instabilidade das Regências favoreceu revoltas", image: "" },
    { question: "O que a participação de africanos libertos na Revolta dos Malês revela sobre a sociedade brasileira do século XIX?", shortQ: "Libertos na Revolta dos Malês", answer: "Que a 'liberdade' concedida aos libertos era precária; eles ainda sofriam discriminação, exclusão e condições degradantes.", fakeAnswer: "Que os libertos gozavam de plena igualdade civil, mas optavam voluntariamente pela resistência armada.", shortA: "A liberdade dos libertos era precária", image: "" }
];

// ------------------------------------
// DATABASE: NÍVEL 1 - PARTE B (mesmos temas, palavras diferentes)
// ------------------------------------
const level1DataB = [
    { question: "Em que ano Dom Pedro I abdicou e por que o Brasil precisou de regentes?", shortQ: "Ano da abdicação", answer: "Em 1831. Dom Pedro I voltou para Portugal e seu filho tinha apenas 5 anos — jovem demais para governar.", fakeAnswer: "Em 1822. Dom Pedro I foi destituído pelo Parlamento após perder a Guerra de Independência.", shortA: "1831 — filho com 5 anos", image: "" },
    { question: "Qual era o caráter da Regência Trina Provisória: permanente ou temporário?", shortQ: "Caráter da Reg. Provisória", answer: "Temporário. Era uma solução emergencial para o vazio de poder logo após a abdicação de Dom Pedro I.", fakeAnswer: "Permanente. Foi criada para substituir definitivamente a monarquia por um governo coletivo.", shortA: "Temporário — solução emergencial", image: "" },
    { question: "Para que serviu a Guarda Nacional criada pela Regência Trina Permanente?", shortQ: "Função da Guarda Nacional", answer: "Para manter a ordem pública, mas na prática fortaleceu o poder dos grandes proprietários rurais nas regiões.", fakeAnswer: "Para proteger Dom Pedro II enquanto ele era criança, funcionando como sua guarda pessoal.", shortA: "Manter ordem; fortaleceu elite rural", image: "" },
    { question: "Quais foram as duas principais mudanças trazidas pelo Ato Adicional de 1834?", shortQ: "Mudanças do Ato Adicional", answer: "Criou a Regência Una (um regente só) e as Assembleias Legislativas Provinciais (mais autonomia às províncias).", fakeAnswer: "Aboliu o Senado e transferiu a capital do Rio de Janeiro para Minas Gerais.", shortA: "Regência Una + Assembleias Provinciais", image: "" },
    { question: "Por que Padre Feijó renunciou ao cargo de regente em 1837?", shortQ: "Renúncia de Feijó", answer: "Por falta de apoio político e incapacidade de controlar as várias revoltas que explodiam pelo Brasil.", fakeAnswer: "Porque o Parlamento descobriu que ele desviava verbas públicas para financiar a Igreja Católica.", shortA: "Falta de apoio e revoltas incontroláveis", image: "" },
    { question: "Com quantos anos Dom Pedro II assumiu o poder no Golpe da Maioridade?", shortQ: "Idade no Golpe da Maioridade", answer: "14 anos. O Parlamento antecipou sua maioridade — a Constituição exigia 18 anos — para encerrar o caos.", fakeAnswer: "18 anos. Ele esperou a idade mínima constitucional e assumiu com total apoio dos regentes.", shortA: "14 anos de idade", image: "" },
    { question: "Em qual estado brasileiro a Revolta dos Malês eclodiu em 1835?", shortQ: "Estado da Revolta dos Malês", answer: "Na Bahia, especificamente na cidade de Salvador, que concentrava grande população africana escravizada.", fakeAnswer: "Em Pernambuco, no Recife, onde havia o maior mercado de escravizados do Brasil colonial.", shortA: "Bahia — Salvador", image: "" },
    { question: "O que significa o termo 'Malê' usado para nomear os revoltosos de 1835?", shortQ: "Significado de 'Malê'", answer: "Era o nome dado aos africanos de religião islâmica (muçulmanos) escravizados na Bahia.", fakeAnswer: "Era um título de guerra dado a escravizados que já haviam participado de outras revoltas anteriores.", shortA: "Africanos muçulmanos escravizados na Bahia", image: "" },
    { question: "Como os Malês conseguiram organizar a revolta sem serem descobertos antes?", shortQ: "Segredo da organização", answer: "Comunicavam-se por escrito em árabe, língua que as autoridades brasileiras não sabiam ler.", fakeAnswer: "Usavam um código de tambores que apenas eles conseguiam decifrar durante as festas religiosas.", shortA: "Escrita em árabe ilegível às autoridades", image: "" },
    { question: "Que tipos de punição foram aplicados aos participantes da Revolta dos Malês capturados?", shortQ: "Punições após a Revolta", answer: "Mortes em combate, prisões, açoitamentos públicos e deportação de volta ao continente africano.", fakeAnswer: "Foram enviados para trabalhos forçados em minas de ouro no interior do Brasil por 10 anos.", shortA: "Mortes, prisões, açoites e deportações", image: "" }
];

// ------------------------------------
// DATABASE: NÍVEL 2 - PARTE B (mesmos temas, linguagem formal diferente)
// ------------------------------------
const level2DataB = [
    { question: "Qual dispositivo da Constituição de 1824 tornava a regência uma necessidade institucional inevitável?", shortQ: "Dispositivo constitucional das Regências", answer: "O artigo que fixava a maioridade imperial aos 18 anos, tornando ilegítimo o governo de Dom Pedro II antes dessa idade.", fakeAnswer: "A cláusula que obrigava o Parlamento a nomear um novo monarca em caso de vacância do trono.", shortA: "Maioridade imperial fixada aos 18 anos", image: "" },
    { question: "De que forma a Guarda Nacional de 1831 contribuiu para a formação do poder coronelístico brasileiro?", shortQ: "Guarda Nacional e Coronelismo", answer: "Ao transferir o controle das forças militares locais para os proprietários rurais, criou as condições estruturais do Coronelismo.", fakeAnswer: "Ao proibir que fazendeiros participassem de milícias, forçou-os a exercer influência exclusivamente via voto.", shortA: "Transferiu controle militar à elite rural", image: "" },
    { question: "Qual tensão política central motivou a aprovação do Ato Adicional de 1834?", shortQ: "Tensão por trás do Ato Adicional", answer: "A disputa entre liberais descentralizadores, que queriam autonomia provincial, e conservadores centralizadores.", fakeAnswer: "O conflito entre o Exército e a Igreja, que travavam o processo legislativo no Parlamento.", shortA: "Liberais vs. conservadores pela autonomia", image: "" },
    { question: "O que a instabilidade do governo de Padre Feijó revelou sobre as limitações estruturais da Regência Una?", shortQ: "Limites da Regência Una", answer: "Que mesmo um governo unificado era incapaz de impor autoridade sobre um território vasto com interesses regionais conflitantes.", fakeAnswer: "Que a figura do regente eleito era constitucionalmente fraca demais para vetar as decisões do Senado.", shortA: "Incapacidade de controlar interesses regionais", image: "" },
    { question: "Qual lógica política sustentou o movimento que declarou a maioridade antecipada de Dom Pedro II?", shortQ: "Lógica do Golpe da Maioridade", answer: "Os liberais usaram a instabilidade das Regências como pretexto para antecipar a maioridade e retomar o poder do governo conservador.", fakeAnswer: "Os militares negociaram a entrega do poder ao imperador em troca de maior autonomia para o Exército.", shortA: "Liberais usaram a instabilidade como pretexto", image: "" },
    { question: "Qual dimensão da identidade coletiva dos Malês foi determinante para a coesão e organização da revolta?", shortQ: "Identidade coletiva dos Malês", answer: "A identidade religiosa islâmica, que criou vínculos comunitários sólidos e uma liderança espiritual reconhecida.", fakeAnswer: "A identidade étnica comum de todos serem originários da mesma região da África Ocidental.", shortA: "Identidade religiosa islâmica", image: "" },
    { question: "Em que medida a participação de africanos libertos na Revolta dos Malês desafia a narrativa de que a liberdade jurídica resolvia as desigualdades?", shortQ: "Liberdade jurídica e desigualdade", answer: "Completamente: demonstra que a alforria não eliminava discriminação, exclusão e opressão socioeconômica.", fakeAnswer: "Em nada: os libertos participaram por solidariedade ideológica, não por sofrerem discriminação real.", shortA: "Alforria não eliminava opressão", image: "" },
    { question: "Que transformações no aparato repressivo do Estado brasileiro decorreram da Revolta dos Malês?", shortQ: "Repressão pós-Revolta dos Malês", answer: "Endurecimento das leis contra africanos, ampliação da vigilância policial e restrições à circulação de libertos.", fakeAnswer: "Criação de um tribunal especial para julgamento de escravizados e uma lei de anistia para evitar futuros conflitos.", shortA: "Leis mais duras e mais vigilância", image: "" },
    { question: "Como a conjuntura política das Regências funcionou como catalisador para revoltas como a dos Malês?", shortQ: "Regências como catalisador", answer: "A fragmentação da autoridade central e o enfraquecimento do aparato repressivo criaram brechas para a organização de resistências.", fakeAnswer: "O governo regencial deliberadamente afrouxou as leis sobre escravidão, incentivando indiretamente as revoltas.", shortA: "Fragmentação do poder criou brechas", image: "" },
    { question: "Qual legado historiográfico a Revolta dos Malês consolidou no estudo da escravidão brasileira?", shortQ: "Legado historiográfico dos Malês", answer: "Refutou a tese da passividade escrava e estabeleceu o paradigma da resistência ativa e organizada como objeto de estudo.", fakeAnswer: "Comprovou que a escravidão no Brasil era mais branda que em outras nações, pois permitia organização religiosa.", shortA: "Refutou a passividade — paradigma da resistência", image: "" }
];

// ------------------------------------
// DATABASE: ENEM - PARTE B
// ------------------------------------
const enemDataB = [
    {
        question: "Durante o período regencial (1831-1840), o Brasil vivenciou diversas revoltas provinciais. Esse fenômeno é explicado, em grande medida, pela seguinte característica desse período:",
        options: ["centralização excessiva do poder nas mãos dos regentes.", "fortalecimento das instituições democráticas e do voto popular.", "fragilidade do poder central e autonomia crescente das províncias.", "prosperidade econômica que gerou conflitos distributivos.", "intervenção direta de Portugal nos assuntos internos brasileiros."],
        correct: 2
    },
    {
        question: "A criação da Guarda Nacional em 1831, durante as Regências, teve como consequência de longo prazo o fortalecimento de uma prática política conhecida como Coronelismo. Isso ocorreu porque a Guarda Nacional:",
        options: ["centralizou o poder militar no Rio de Janeiro, enfraquecendo as elites regionais.", "colocou o controle das forças armadas locais nas mãos dos grandes proprietários rurais.", "foi criada exclusivamente para proteger Dom Pedro II durante sua infância.", "eliminou as milícias privadas e substituiu-as por um exército profissional.", "proibiu que fazendeiros exercessem qualquer cargo político nas províncias."],
        correct: 1
    },
    {
        question: "A Revolta dos Malês (Salvador, 1835) distingue-se de outras rebeliões escravas do período por seu elevado grau de organização. Esse nível organizacional foi possível principalmente porque seus líderes:",
        options: ["contavam com apoio financeiro de comerciantes portugueses descontentes.", "dominavam a escrita em árabe, permitindo comunicação secreta e planejamento sistemático.", "ocupavam cargos de confiança nas fazendas e tinham acesso a armas de fogo.", "eram protegidos por um código de silêncio imposto pela comunidade africana local.", "receberam treinamento militar durante conflitos anteriores no interior da Bahia."],
        correct: 1
    },
    {
        question: "O Golpe da Maioridade de 1840, que declarou Dom Pedro II maior de idade aos 14 anos, foi uma manobra política articulada por grupos liberais. O principal objetivo dessa manobra era:",
        options: ["garantir a continuidade do governo conservador de Araújo Lima.", "estabilizar o país e, ao mesmo tempo, retornar ao poder político.", "atender a um pedido formal do próprio Dom Pedro II ao Parlamento.", "cumprir rigorosamente a Constituição, que permitia a antecipação.", "responder a pressões militares que ameaçavam um golpe de Estado."],
        correct: 1
    },
    {
        question: "A participação de africanos libertos — não apenas de escravizados — na Revolta dos Malês evidencia que, no Brasil Imperial:",
        options: ["a alforria garantia plena integração social e igualdade de direitos.", "libertos e escravizados possuíam objetivos políticos completamente distintos.", "a opressão racial e social persistia mesmo após a conquista da liberdade jurídica.", "o governo imperial tratava libertos e cidadãos livres de forma igualitária.", "a Revolta dos Malês foi motivada por disputas econômicas, não por questões raciais."],
        correct: 2
    },
    {
        question: "As Regências (1831-1840) e a Revolta dos Malês (1835) são eventos historicamente conectados. A relação entre eles é melhor explicada pela seguinte afirmação:",
        options: ["as Regências foram criadas especificamente para reprimir revoltas como a dos Malês.", "a instabilidade política das Regências enfraqueceu o Estado e criou condições para revoltas.", "a Revolta dos Malês foi financiada por regentes que queriam desestabilizar a monarquia.", "os Malês apoiavam as Regências como forma de enfraquecer o poder imperial central.", "não há relação: os eventos ocorreram em regiões e contextos políticos completamente distintos."],
        correct: 1
    }
];

// GLOBALS
let currentGameMode = null; // 'flashcards' | 'match'
let currentLevel = 1;
let currentPart = 1; // 1 = Parte A, 2 = Parte B
let currentData = [...level1Data];
let currentCardIsTrue = true; // Tracks if the currently shown answer is the real one

// ------------------------------------
// DATABASE: RESUMO (SUMMARY) DATA
// ------------------------------------
const summaryDataP1 = [
    { title: "Por que existiram as Regências?", icon: "👶", isHighlight: true, content: `<p>Em 1831, Dom Pedro I abdicou do trono e voltou para Portugal. O problema: seu filho e herdeiro, Dom Pedro II, tinha apenas <strong>5 anos de idade</strong>. Ele não podia governar sozinho.</p><div class="info-box success mt-2"><strong>Solução:</strong> O Brasil foi governado por <strong>regentes</strong> — representantes escolhidos para administrar o país em nome do imperador criança — até 1840.</div>` },
    { title: "Regência Trina Provisória (1831)", icon: "🤝", isHighlight: false, content: `<p>Assim que Dom Pedro I partiu, três membros da Assembleia Geral assumiram o poder de forma emergencial e temporária.</p><ul class="feature-list"><li><strong>Trio no comando:</strong> Três integrantes governavam juntos.</li><li><strong>Caráter provisório:</strong> Era uma solução de curto prazo enquanto se organizava algo mais permanente.</li><li><strong>Instabilidade:</strong> O período foi marcado por muita agitação e revoltas populares.</li></ul><div class="info-box warning mt-2"><strong>Contexto:</strong> A abdicação de Dom Pedro I deixou o Brasil sem liderança consolidada, gerando uma crise de autoridade enorme.</div>` },
    { title: "Regência Trina Permanente (1831–1834)", icon: "🛡️", isHighlight: false, content: `<p>Eleita pelo povo, substituiu a provisória com mais legitimidade. Ainda eram três regentes, mas agora escolhidos por votação.</p><ul class="feature-list"><li><strong>Eleita:</strong> Maior legitimidade popular.</li><li><strong>Criação da Guarda Nacional (1831):</strong> Uma força militar criada para manter a ordem, mas que acabou fortalecendo o poder dos <strong>grandes proprietários rurais</strong> — os futuros "coronéis".</li></ul><div class="info-box danger mt-2"><strong>⚠️ Atenção:</strong> A Guarda Nacional substituiu o antigo exército regular e colocou o poder militar nas mãos das elites locais — semente do <em>Coronelismo</em>.</div>` },
    { title: "O Ato Adicional de 1834", icon: "📜", isHighlight: false, content: `<p>Uma emenda à Constituição que mudou as regras do jogo político no Brasil.</p><ul class="feature-list"><li>Criou a <strong>Regência Una</strong> — apenas UM regente eleito, no lugar de três.</li><li>Criou as <strong>Assembleias Legislativas Provinciais</strong>, dando mais autonomia às províncias.</li></ul><div class="info-box success mt-2"><strong>Impacto:</strong> Mais descentralização do poder. As províncias ganharam mais voz. Mas isso também facilitou o surgimento de revoltas regionais.</div>` },
    { title: "Regência Una (1835–1840)", icon: "⚖️", isHighlight: true, content: `<p>Com o Ato Adicional, passou a existir apenas um regente eleito pelo povo para governar o Brasil.</p><ul class="feature-list"><li><strong>Padre Diogo Feijó:</strong> Primeiro regente uno. Enfrentou muitas revoltas e acabou renunciando.</li><li><strong>Araújo Lima:</strong> Assumiu após Feijó. Tentou recentralizar o poder.</li></ul><div class="info-box warning mt-2"><strong>O Período das Revoltas:</strong> Foi a fase mais caótica. Cabanagem, Balaiada, Farroupilha, Sabinada e a Revolta dos Malês eclodiram aqui.</div>` },
    { title: "Golpe da Maioridade (1840)", icon: "🎂", isHighlight: false, content: `<p>Para conter o caos, liberais anteciparam a maioridade de Dom Pedro II.</p><ul class="feature-list"><li>A Constituição previa 18 anos, mas o Parlamento votou para declarar a maioridade imediatamente.</li><li>Dom Pedro II assumiu com <strong>14 anos</strong>.</li></ul><div class="info-box success mt-2"><strong>Resultado:</strong> Trouxe a estabilidade necessária para evitar a fragmentação do Brasil.</div>` },
    { title: "Revolta dos Malês (1835) — O que foi?", icon: "🔥", isHighlight: true, content: `<p>A <strong>maior revolta de escravizados urbanos</strong> da história do Brasil, organizada por africanos muçulmanos em Salvador.</p><ul class="tag-list"><li class="tag">📍 Salvador – BA</li><li class="tag">📅 1835</li><li class="tag">☪️ Malês Muçulmanos</li></ul><div class="info-box danger mt-2"><strong>Diferencial:</strong> Eram alfabetizados em árabe, o que permitiu planejar a revolta em segredo.</div>` },
    { title: "Por que a Revolta aconteceu?", icon: "💢", isHighlight: false, content: `<p>Fatores principais:</p><ul class="feature-list"><li><strong>Escravidão brutal:</strong> Condições desumanas de vida.</li><li><strong>Repressão religiosa:</strong> Africanos muçulmanos eram proibidos de praticar sua fé.</li><li><strong>União em Salvador:</strong> Alta concentração de africanos facilitou a organização.</li></ul>` },
    { title: "Os Líderes da Revolta", icon: "👑", isHighlight: false, content: `<p>Liderada por figuras de destaque como <strong>Pacífico Licutan</strong> e <strong>Manuel Calafate</strong>. Usavam o Islã para unificar os revoltosos.</p><div class="info-box success mt-2"><strong>Nota:</strong> Incluía escravizados e libertos lutando juntos.</div>` },
    { title: "O que os Malês queriam?", icon: "🎯", isHighlight: false, content: `<p>Objetivos:</p><ul class="feature-list"><li><strong>Fim da escravidão</strong> e liberdade total.</li><li><strong>Liberdade religiosa</strong> para o Islã.</li><li>Tomada do poder regional em Salvador.</li></ul>` },
    { title: "O Desfecho — Repressão", icon: "💀", isHighlight: true, content: `<p>A revolta foi denunciada antes do fim. O governo reprimiu com violência: mortes, prisões e deportações para a África.</p><div class="info-box danger mt-2"><strong>Punição:</strong> Serviu para aumentar o controle sobre a população negra.</div>` },
    { title: "Por que estudar?", icon: "📚", isHighlight: false, content: `<p>Prova que escravizados não eram passivos; resistiram ativamente com sofisticação organizacional e intelectual.</p>` }
];

const summaryDataP2 = [
    { title: "O Vazio no Trono (1831)", icon: "👑", isHighlight: false, content: `<p>Imagine o país como um navio onde o capitão (Dom Pedro I) vai embora e deixa o filho de 5 anos no comando. Por isso, o Brasil entrou nas <strong>Regências</strong>: substitutos mandando enquanto o imperador crescia.</p>` },
    { title: "O Governo de Emergência (Provisório)", icon: "⚡", isHighlight: false, content: `<p>Foi o primeiro socorro político. Três líderes assumiram às pressas para evitar o caos total após a partida de Dom Pedro I. Durou só alguns meses.</p>` },
    { title: "A Origem dos Coronéis", icon: "🤠", isHighlight: false, content: `<p>A Regência Permanente criou a <strong>Guarda Nacional</strong>, controlada pelos fazendeiros ricos. Isso deu a eles poder militar e armas, criando a figura do "Coronel".</p>` },
    { title: "Mudando as Regras (Ato Adicional)", icon: "⚙️", isHighlight: false, content: `<p>Em 1834, decidiram ter um regente só e dar mais poder às províncias. Essa liberdade extra acabou gerando briga e revolta em todo o país.</p>` },
    { title: "Anos de Rebeldia (Regência Una)", icon: "🌪️", isHighlight: true, content: `<p>O período de um regente só foi o mais tenso. O Brasil quase se despedaçou com Cabanagem, Farroupilha e Malês explodindo ao mesmo tempo.</p>` },
    { title: "A Solução de 14 Anos", icon: "👦", isHighlight: false, content: `<p>Para parar as guerras civis, políticos deram a coroa pro garoto na marra. Com 14 anos, Pedro II virou Imperador para tentar unir o Brasil.</p>` },
    { title: "O Levante Islâmico na Bahia", icon: "☪️", isHighlight: true, content: `<p>A Revolta dos Malês foi um movimento de africanos alfabetizados que seguiam a fé islâmica e planejaram um ataque estratégico em Salvador.</p>` },
    { title: "O Limite do Sofrimento", icon: "⛓️", isHighlight: false, content: `<p>Lutavam por liberdade e pelo direito de serem quem eram. O governo proibia suas roupas, orações e língua. Era o grito de dignidade.</p>` },
    { title: "Líderes que Sabiam Escrever", icon: "✒️", isHighlight: false, content: `<p>Líderes como Pacífico Licutan passavam ordens em árabe para que os brancos não entendessem. Foi resistência física e intelectual.</p>` },
    { title: "O Objetivo: Salvador Livre", icon: "🏁", isHighlight: false, content: `<p>Queriam tomar o controle, acabar com o domínio dos brancos e criar uma comunidade livre para africanos muçulmanos e libertos.</p>` },
    { title: "Traição e Repressão", icon: "🚩", isHighlight: false, content: `<p>O plano vazou! A polícia já esperava. O governo castigou os Malês com açoites e deportação para botar medo em quem pensasse em se rebelar.</p>` },
    { title: "Por que isso importa hoje?", icon: "✨", isHighlight: true, content: `<p>Os Malês mostraram que a inteligência e a união são armas poderosas. Provaram que o povo negro nunca parou de lutar por dignidade.</p>` }
];

function renderSummary() {
    const p1Container = document.getElementById('render-estudo-p1');
    const p2Container = document.getElementById('render-estudo-p2');
    
    if(!p1Container || !p2Container) return;

    // Shuffle and Render P1
    const shuffledP1 = shuffleArray([...summaryDataP1]);
    p1Container.innerHTML = shuffledP1.map(card => `
        <div class="topic-card ${card.isHighlight ? 'highlight-card' : ''}">
            <div class="topic-header">
                <div class="topic-icon">${card.icon}</div>
                <h2>${card.title}</h2>
            </div>
            <div class="topic-body">${card.content}</div>
        </div>
    `).join('');

    // Shuffle and Render P2
    const shuffledP2 = shuffleArray([...summaryDataP2]);
    p2Container.innerHTML = shuffledP2.map(card => `
        <div class="topic-card ${card.isHighlight ? 'highlight-card' : ''}">
            <div class="topic-header">
                <div class="topic-icon">${card.icon}</div>
                <h2>${card.title}</h2>
            </div>
            <div class="topic-body">${card.content}</div>
        </div>
    `).join('');
}

// Iniciar renderização
renderSummary();

const screenFlash = document.getElementById('screen-flash');

// Audio Context for beeps
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playFeedback(type) {
    screenFlash.className = 'screen-flash'; // reset
    void screenFlash.offsetWidth; // trigger reflow
    if (type === 'success') {
        screenFlash.classList.add('flash-green');
        if('vibrate' in navigator) navigator.vibrate([30, 30]); // Happy vibes
    } else {
        screenFlash.classList.add('flash-red');
        if('vibrate' in navigator) navigator.vibrate([100, 50, 100]); // Angry vibes
    }

    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    }
}

// Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        tabContents.forEach(c => {
            c.classList.remove('active');
            c.style.display = 'none';
        });
        
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        const target = document.getElementById(targetId);
        target.style.display = 'block';
        target.classList.add('active');

        // Reset level and part when re-entering games from menu
        currentLevel = 1;
        currentPart = 1;
        currentData = [...level1Data];
        
        // Randomize Summary every time we re-enter it (or just on load)
        if(targetId === 'conteudo') renderSummary();

        if (targetId === 'flashcards-game') {
            currentGameMode = 'flashcards';
            initFlashcards();
        } else if (targetId === 'match-game') {
            currentGameMode = 'match';
            initMatchGame();
        } else if (targetId === 'enem-game') {
            currentGameMode = 'enem';
            initEnemGame();
        }
    });
});

// ----- SUMMARY TRANSITIONS -----
const btnVerParte2 = document.getElementById('btn-ver-parte2-estudo');
const btnVoltarParte1 = document.getElementById('btn-voltar-parte1-estudo');
const estudoParte1 = document.getElementById('estudo-parte1');
const estudoParte2 = document.getElementById('estudo-parte2');
const mainContentScroll = document.querySelector('.main-content');

if(btnVerParte2) {
    btnVerParte2.addEventListener('click', () => {
        estudoParte1.style.display = 'none';
        estudoParte2.style.display = 'block';
        mainContentScroll.scrollTop = 0; // Scroll to top
        if('vibrate' in navigator) navigator.vibrate(30);
    });
}

if(btnVoltarParte1) {
    btnVoltarParte1.addEventListener('click', () => {
        estudoParte2.style.display = 'none';
        estudoParte1.style.display = 'block';
        mainContentScroll.scrollTop = 0; // Scroll to top
        if('vibrate' in navigator) navigator.vibrate(30);
    });
}


// ----- FLASHCARDS LOGIC -----
let flashIndex = 0;
let flashCorrect = 0;
let flashWrong = 0;

const card = document.getElementById('card');
const qEl = document.getElementById('card-question');
const aEl = document.getElementById('card-answer');
const aTitleEl = document.getElementById('card-answer-title');
const counterEl = document.getElementById('card-counter');
const progressEl = document.getElementById('progress');
const btnWrong = document.getElementById('btn-wrong');
const btnCorrect = document.getElementById('btn-correct');

function initFlashcards() {
    flashIndex = 0;
    flashCorrect = 0;
    flashWrong = 0;
    document.getElementById('flash-level-text').textContent = currentLevel === 1 ? 'Nível 1' : 'Nível 2 (Desafio)';
    
    // Shuffle the current data
    currentData = shuffleArray([...currentData]);
    updateCardUI();
}

function startPart2() {
    currentPart = 2;
    if (currentGameMode === 'flashcards') {
        currentData = currentLevel === 1 ? [...level1DataB] : [...level2DataB];
        initFlashcards();
    } else if (currentGameMode === 'match') {
        currentData = currentLevel === 1 ? [...level1DataB] : [...level2DataB];
        initMatchGame();
    } else if (currentGameMode === 'enem') {
        initEnemGame();
    }
    
    document.getElementById('part-transition').style.display = 'none';
    const targetId = currentGameMode + '-game';
    document.getElementById(targetId).style.display = 'block';
}

document.getElementById('btn-start-part2').addEventListener('click', startPart2);

function updateCardUI() {
    card.classList.remove('flipped');
    
    // reset visual hints if any
    aEl.style.color = 'var(--text-main)';
    aEl.style.fontWeight = 'normal';
    document.getElementById('eval-btns').style.display = 'flex';
    document.getElementById('continue-area').style.display = 'none';

    setTimeout(() => {
        if(flashIndex < currentData.length) {
            const data = currentData[flashIndex];
            
            // Randomly decide if we show the TRUE answer or the FAKE answer
            currentCardIsTrue = Math.random() > 0.5;
            
            qEl.textContent = data.question;
            aEl.textContent = currentCardIsTrue ? data.answer : data.fakeAnswer;
            
            const cardImage = document.getElementById('card-image');
            if(data.image) {
                cardImage.src = data.image;
                cardImage.style.display = 'block';
            } else {
                cardImage.style.display = 'none';
            }
            
            counterEl.textContent = `${flashIndex + 1}/${currentData.length}`;
            progressEl.style.width = `${(flashIndex / currentData.length) * 100}%`;
        } else {
            if (currentPart === 1) {
                showPartTransition();
            } else {
                showResults(flashCorrect, currentData.length, true);
            }
        }
    }, 200);
}

function showPartTransition() {
    document.getElementById('flashcards-game').style.display = 'none';
    document.getElementById('match-game').style.display = 'none';
    document.getElementById('enem-game').style.display = 'none';
    document.getElementById('part-transition').style.display = 'block';
}

card.addEventListener('click', (e) => {
    if(!e.target.closest('.eval-btn') && !e.target.closest('#btn-continue')) {
        card.classList.toggle('flipped');
        if('vibrate' in navigator) navigator.vibrate(15);
    }
});

btnWrong.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    handleFlashcardAnswer(currentCardIsTrue === false);
});
btnCorrect.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    handleFlashcardAnswer(currentCardIsTrue === true);
});

function handleFlashcardAnswer(isUserCorrect) {
    if (isUserCorrect) {
        flashCorrect++;
        playFeedback('success');
        flashIndex++;
        updateCardUI();
    } else {
        flashWrong++;
        playFeedback('error');
        
        // Hide normal buttons and show continue button
        document.getElementById('eval-btns').style.display = 'none';
        const continueArea = document.getElementById('continue-area');
        const btnContinue = document.getElementById('btn-continue');
        
        continueArea.style.display = 'block';
        btnContinue.style.opacity = '0.5';
        btnContinue.style.pointerEvents = 'none';
        btnContinue.innerHTML = 'Aguarde... ⏱️';
        
        if (currentCardIsTrue) {
            aEl.textContent = "A resposta estava CORRETA! Você avaliou equivocadamente como falso.";
        } else {
            aEl.textContent = "FALSO! ❌ O fato correto é: " + currentData[flashIndex].answer;
        }
        aEl.style.color = '#f87171'; // light red
        aEl.style.fontWeight = 'bold';
        
        setTimeout(() => {
            btnContinue.style.opacity = '1';
            btnContinue.style.pointerEvents = 'auto';
            btnContinue.innerHTML = 'Continuar ➡️';
        }, 3000);
    }
}

document.getElementById('btn-continue').addEventListener('click', (e) => {
    e.stopPropagation();
    flashIndex++;
    updateCardUI();
});

// Swipe for Flashcards
let touchStartX = 0; let touchEndX = 0;
card.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
card.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if(!card.classList.contains('flipped')) return;
    
    // Prevent swiping if we are waiting for user to click continue
    if(document.getElementById('eval-btns').style.display === 'none') return;

    const threshold = 50;
    if (touchEndX < touchStartX - threshold) btnWrong.click();
    if (touchEndX > touchStartX + threshold) btnCorrect.click();
});


// ----- MATCH GAME LOGIC (Ligar os Pontos) -----
let matchRounds = [];
let currentMatchRound = 0;
let selectedQ = null;
let selectedA = null;
let matchesInRound = 0;

function initMatchGame() {
    document.getElementById('match-level-text').textContent = currentLevel === 1 ? 'Nível 1' : 'Nível 2 (Desafio)';
    
    let shuffled = shuffleArray([...currentData]);
    matchRounds = [];
    // Group in chunks of 3
    for(let i=0; i<shuffled.length; i+=3) {
        let chunk = shuffled.slice(i, i+3);
        if(chunk.length === 3) {
            matchRounds.push(chunk);
        } else if (matchRounds.length > 0) {
            matchRounds[matchRounds.length-1].push(...chunk);
        }
    }
    
    currentMatchRound = 0;
    loadMatchRound();
}

function loadMatchRound() {
    matchesInRound = 0;
    selectedQ = null;
    selectedA = null;
    document.getElementById('btn-next-match').style.display = 'none';
    
    let maxRounds = matchRounds.length;
    document.getElementById('match-progress').style.width = `${(currentMatchRound / maxRounds) * 100}%`;
    
    let roundData = matchRounds[currentMatchRound];
    let colQ = document.getElementById('match-col-q');
    let colA = document.getElementById('match-col-a');
    colQ.innerHTML = '';
    colA.innerHTML = '';
    
    let qArray = shuffleArray([...roundData]);
    let aArray = shuffleArray([...roundData]);
    
    qArray.forEach((item) => {
        let div = document.createElement('div');
        div.className = 'match-item q-item';
        div.textContent = item.shortQ;
        div.dataset.id = item.shortQ;
        div.onclick = () => selectMatchItem(div, 'q');
        colQ.appendChild(div);
    });
    
    aArray.forEach((item) => {
        let div = document.createElement('div');
        div.className = 'match-item a-item';
        div.textContent = item.shortA;
        div.dataset.id = item.shortQ; // Same ID for matching
        div.onclick = () => selectMatchItem(div, 'a');
        colA.appendChild(div);
    });
}

function selectMatchItem(element, type) {
    if(element.classList.contains('matched')) return;
    if('vibrate' in navigator) navigator.vibrate(10);
    
    if(type === 'q') {
        if(selectedQ) selectedQ.classList.remove('selected');
        if(selectedQ === element) { selectedQ = null; return; }
        selectedQ = element;
        selectedQ.classList.add('selected');
    } else {
        if(selectedA) selectedA.classList.remove('selected');
        if(selectedA === element) { selectedA = null; return; }
        selectedA = element;
        selectedA.classList.add('selected');
    }
    checkMatch();
}

function checkMatch() {
    if(selectedQ && selectedA) {
        if(selectedQ.dataset.id === selectedA.dataset.id) {
            playFeedback('success');
            selectedQ.classList.remove('selected');
            selectedA.classList.remove('selected');
            selectedQ.classList.add('matched');
            selectedA.classList.add('matched');
            
            matchesInRound++;
            selectedQ = null;
            selectedA = null;
            
            if(matchesInRound === matchRounds[currentMatchRound].length) {
                if(currentMatchRound < matchRounds.length - 1) {
                    document.getElementById('btn-next-match').style.display = 'block';
                } else {
                    if (currentPart === 1) {
                        setTimeout(() => showPartTransition(), 600);
                    } else {
                        setTimeout(() => showResults(10, 10, false), 600);
                    }
                }
            }
        } else {
            playFeedback('error');
            selectedQ.classList.add('error');
            selectedA.classList.add('error');
            let q = selectedQ, a = selectedA;
            setTimeout(() => {
                q.classList.remove('error', 'selected');
                a.classList.remove('error', 'selected');
            }, 400);
            selectedQ = null;
            selectedA = null;
        }
    }
}

document.getElementById('btn-next-match').onclick = () => {
    currentMatchRound++;
    loadMatchRound();
};

// ----- RESULTS SCREEN -----
function showResults(correct, total, showErrors) {
    document.getElementById('flashcards-game').style.display = 'none';
    document.getElementById('match-game').style.display = 'none';
    document.getElementById('enem-game').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    document.getElementById('score-text').textContent = `${correct}/${total}`;
    
    const percentage = (correct / total) * 100;
    const circle = document.querySelector('.score-circle');
    circle.style.background = `conic-gradient(var(--success) ${percentage}%, var(--surface) ${percentage}%)`;
    
    const msg = document.getElementById('score-message');
    const title = document.getElementById('result-title');
    
    if(percentage === 100) { title.textContent = "Nível Concluído! 🏆"; msg.textContent = "Excelente desempenho. Você gabaritou!"; }
    else if(percentage >= 70) { title.textContent = "Bom trabalho! 🌟"; msg.textContent = "Foi muito bem! Está quase lá."; }
    else { title.textContent = "Revisão Necessária 📚"; msg.textContent = "Ainda pode melhorar. Vamos tentar de novo!"; }

    if(showErrors) {
        document.getElementById('stats-row').style.display = 'flex';
        document.getElementById('stat-correct').textContent = correct;
        document.getElementById('stat-wrong').textContent = total - correct;
    } else {
        document.getElementById('stats-row').style.display = 'none';
    }

    if(percentage >= 50) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#3b82f6', '#10b981', '#f59e0b'] });
    }

    // Level Management
    const nextLevelArea = document.getElementById('next-level-area');
    const restartArea = document.getElementById('restart-area');
    
    // If they did decently well on level 1, show level 2 button
    if(currentLevel === 1 && percentage >= 50) {
        nextLevelArea.style.display = 'block';
        restartArea.style.display = 'none';
    } else {
        nextLevelArea.style.display = 'none';
        restartArea.style.display = 'block';
    }
}

document.getElementById('btn-next-level').addEventListener('click', () => {
    currentLevel = 2;
    currentPart = 1;
    currentData = [...level2Data];
    document.getElementById('results').style.display = 'none';
    
    if(currentGameMode === 'flashcards') {
        document.getElementById('flashcards-game').style.display = 'block';
        initFlashcards();
    } else if(currentGameMode === 'match') {
        document.getElementById('match-game').style.display = 'block';
        initMatchGame();
    } else if(currentGameMode === 'enem') {
        document.getElementById('enem-game').style.display = 'block';
        initEnemGame();
    }
});

document.getElementById('btn-restart').addEventListener('click', () => {
    document.getElementById('results').style.display = 'none';
    currentPart = 1;
    currentData = currentLevel === 1 ? [...level1Data] : [...level2Data];
    if(currentGameMode === 'flashcards') {
        document.getElementById('flashcards-game').style.display = 'block';
        initFlashcards();
    } else if(currentGameMode === 'match') {
        document.getElementById('match-game').style.display = 'block';
        initMatchGame();
    } else if(currentGameMode === 'enem') {
        document.getElementById('enem-game').style.display = 'block';
        initEnemGame();
    }
});

document.getElementById('btn-back-study').addEventListener('click', () => {
    document.getElementById('results').style.display = 'none';
    navItems[0].click(); // Go back to Resumo
});

// ----- ENEM GAME LOGIC -----
const enemData = [
    {
        question: "A abdicação de Dom Pedro I em 1831 inaugurou o período regencial no Brasil. Esse período foi marcado por intensa instabilidade política, expressa em diversas revoltas provinciais. Tal instabilidade decorria principalmente:",
        options: ["da ausência de um imperador adulto e da fragilidade do poder central.", "do excesso de centralização promovido pelas Regências.", "da invasão estrangeira que enfraqueceu as forças armadas brasileiras.", "da abolição da escravidão, que gerou conflitos sociais imediatos.", "do domínio absoluto dos militares sobre o Parlamento."],
        correct: 0
    },
    {
        question: "O Ato Adicional de 1834 representou uma importante mudança na estrutura política do Brasil Imperial ao:",
        options: ["centralizar o poder nas mãos do Imperador, fortalecendo a monarquia.", "criar a Regência Una e ampliar a autonomia das províncias.", "estabelecer o voto secreto e universal para todos os homens livres.", "abolir as câmaras municipais e transferir seu poder ao governo central.", "proibir a formação de partidos políticos nas províncias."],
        correct: 1
    },
    {
        question: "A Revolta dos Malês (1835), ocorrida em Salvador, é considerada a maior revolta urbana de escravizados no Brasil. Um elemento que a distingue de outras revoltas escravas do período é:",
        options: ["o apoio financeiro de fazendeiros contrários ao governo imperial.", "a liderança de militares brancos descontentes com o regime.", "a organização planejada por africanos muçulmanos alfabetizados em árabe.", "a participação exclusiva de escravizados nascidos no Brasil.", "o objetivo de restaurar a monarquia portuguesa no país."],
        correct: 2
    },
    {
        question: "Após a repressão à Revolta dos Malês em 1835, as autoridades brasileiras adotaram medidas que:",
        options: ["garantiram mais direitos civis aos africanos libertos na Bahia.", "aceleraram o debate legislativo sobre a abolição da escravidão.", "intensificaram o controle e a vigilância sobre africanos, libertos ou escravizados.", "expulsaram todos os missionários islâmicos do território brasileiro.", "concederam anistia aos revoltosos para evitar novos conflitos."],
        correct: 2
    },
    {
        question: "O 'Golpe da Maioridade' de 1840, que declarou Dom Pedro II apto a governar aos 14 anos, atendia principalmente aos interesses:",
        options: ["dos militares, que queriam um imperador submisso ao Exército.", "da Igreja Católica, contrária às políticas laicas dos regentes.", "dos liberais, que desejavam retornar ao poder e encerrar o governo conservador.", "dos escravizados, que esperavam medidas abolicionistas do jovem imperador.", "dos comerciantes ingleses, que pressionavam por estabilidade política."],
        correct: 2
    },
    {
        question: "A participação de africanos libertos (não apenas escravizados) na Revolta dos Malês evidencia que:",
        options: ["a liberdade jurídica garantia plena igualdade social no Brasil Imperial.", "libertos e escravizados tinham interesses opostos e raramente cooperavam.", "mesmo os libertos viviam sob condições de exclusão e discriminação que motivavam a resistência.", "o governo imperial havia concedido direitos políticos aos africanos livres.", "a revolta tinha como objetivo restaurar líderes africanos ao poder na África."],
        correct: 2
    }
];

let enemIndex = 0;
let enemCorrect = 0;
let enemWrong = 0;

function initEnemGame() {
    enemIndex = 0;
    enemCorrect = 0;
    enemWrong = 0;
    
    // Select and SHUFFLE data based on currentPart
    const baseSet = currentPart === 1 ? enemData : enemDataB;
    window.currentEnemSet = shuffleArray([...baseSet]);
    
    loadEnemQuestion();
}

function loadEnemQuestion() {
    const activeData = window.currentEnemSet;
    if(enemIndex >= activeData.length) {
        if (currentPart === 1) {
            showPartTransition();
        } else {
            showResults(enemCorrect, activeData.length, true);
        }
        return;
    }

    const data = activeData[enemIndex];
    document.getElementById('enem-counter').textContent = `${enemIndex + 1}/${activeData.length}`;
    document.getElementById('enem-progress').style.width = `${(enemIndex / activeData.length) * 100}%`;
    document.getElementById('enem-question').textContent = data.question;
    
    const optionsContainer = document.getElementById('enem-options');
    optionsContainer.innerHTML = '';
    document.getElementById('enem-continue-area').style.display = 'none';

    const letters = ['A', 'B', 'C', 'D', 'E'];
    
    data.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'enem-option';
        btn.innerHTML = `<span class="letter">${letters[idx]})</span> <span class="text">${opt}</span>`;
        btn.onclick = () => checkEnemAnswer(idx, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkEnemAnswer(selectedIndex, btnElement) {
    const activeData = window.currentEnemSet;
    const data = activeData[enemIndex];
    const optionsContainer = document.getElementById('enem-options');
    const buttons = optionsContainer.querySelectorAll('.enem-option');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if(selectedIndex === data.correct) {
        enemCorrect++;
        playFeedback('success');
        btnElement.classList.add('correct');
        setTimeout(() => {
            enemIndex++;
            loadEnemQuestion();
        }, 1200); // Short delay to show success before moving on
    } else {
        enemWrong++;
        playFeedback('error');
        btnElement.classList.add('wrong');
        
        // Highlight the correct one
        buttons[data.correct].classList.add('correct');
        
        // Show continue button
        const continueArea = document.getElementById('enem-continue-area');
        continueArea.style.display = 'block';
    }
}

document.getElementById('btn-enem-continue').addEventListener('click', () => {
    enemIndex++;
    loadEnemQuestion();
});
