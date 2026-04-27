// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New update available');
          }
        });
      });
    }).catch(err => console.log('SW Reg Failed', err));
  });

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
// DATABASE: NÍVEL 1 & 2
// ------------------------------------
const level1Data = [
    { question: "Por que o Brasil precisou de regentes após 1831?", shortQ: "Por que houve Regências?", answer: "Porque Dom Pedro II tinha apenas 5 anos quando Dom Pedro I abdicou, sendo jovem demais para governar.", fakeAnswer: "...", shortA: "Dom Pedro II era criança (5 anos)", image: "" },
    { question: "O que foi a Regência Trina Provisória?", shortQ: "Regência Trina Provisória", answer: "Um governo de emergência formado por três membros da Assembleia, logo após a abdicação de Dom Pedro I em 1831.", fakeAnswer: "...", shortA: "Governo de emergência com 3 membros", image: "" },
    { question: "O que a Regência Trina Permanente criou em 1831?", shortQ: "Criação da Guarda Nacional", answer: "A Guarda Nacional, uma força militar que fortaleceu o poder dos grandes proprietários rurais.", fakeAnswer: "...", shortA: "A Guarda Nacional (1831)", image: "" },
    { question: "O que o Ato Adicional de 1834 criou?", shortQ: "Ato Adicional de 1834", answer: "A Regência Una (um único regente eleito) e as Assembleias Legislativas Provinciais.", fakeAnswer: "...", shortA: "Regência Una e Assembleias Provinciais", image: "" },
    { question: "Quem foi o primeiro regente uno eleito?", shortQ: "Primeiro regente uno", answer: "Padre Diogo Feijó, eleito em 1835, que renunciou em 1837 por falta de apoio político.", fakeAnswer: "...", shortA: "Padre Diogo Feijó", image: "" },
    { question: "O que foi o Golpe da Maioridade (1840)?", shortQ: "Golpe da Maioridade", answer: "O Parlamento declarou Dom Pedro II maior de idade com apenas 14 anos para encerrar o caos das Regências.", fakeAnswer: "...", shortA: "Dom Pedro II assumiu com 14 anos", image: "" },
    { question: "Onde ocorreu a Revolta dos Malês?", shortQ: "Local da Revolta dos Malês", answer: "Em Salvador, na Bahia, que tinha grande concentração de africanos escravizados e libertos.", fakeAnswer: "...", shortA: "Salvador, Bahia", image: "" },
    { question: "Quem eram os Malês?", shortQ: "Quem eram os Malês?", answer: "Africanos muçulmanos escravizados na Bahia, muitos deles alfabetizados em árabe.", fakeAnswer: "...", shortA: "Africanos muçulmanos escravizados", image: "" },
    { question: "Qual foi o principal fator que diferenciou os Malês de outros grupos revoltosos?", shortQ: "Diferencial dos Malês", answer: "Eram alfabetizados em árabe e organizaram a revolta por escrito, de forma planejada e secreta.", fakeAnswer: "...", shortA: "Alfabetizados em árabe e organizados", image: "" },
    { question: "O que aconteceu com os líderes da Revolta dos Malês após a repressão?", shortQ: "Desfecho da Revolta dos Malês", answer: "Foram mortos em combate, presos, açoitados ou deportados de volta à África.", fakeAnswer: "...", shortA: "Mortes, prisões e deportações", image: "" }
];

const level2Data = [
    { question: "Qual a principal razão constitucional que motivou o período das Regências no Brasil?", shortQ: "Base constitucional das Regências", answer: "A Constituição de 1824 exigia que o imperador tivesse 18 anos para governar, tornando necessária a figura dos regentes.", fakeAnswer: "...", shortA: "Constituição exigia 18 anos para governar", image: "" },
    { question: "Qual a consequência política mais duradoura da criação da Guarda Nacional em 1831?", shortQ: "Legado da Guarda Nacional", answer: "Fortaleceu o poder local dos grandes proprietários rurais, semeando as bases do Coronelismo.", fakeAnswer: "...", shortA: "Semeou o Coronelismo", image: "" },
    { question: "Qual tendência política o Ato Adicional de 1834 representou?", shortQ: "Tendência do Ato Adicional", answer: "A descentralização do poder, pois ampliou a autonomia das províncias com as Assembleias Legislativas.", fakeAnswer: "...", shortA: "Descentralização e autonomia provincial", image: "" },
    { question: "Por que a renúncia de Padre Feijó em 1837 foi significativa?", shortQ: "Renúncia de Feijó", answer: "Demonstrou a fragilidade do poder central: mesmo com um único regente eleito, o governo era incapaz de controlar as revoltas regionais.", fakeAnswer: "...", shortA: "Fragilidade do poder central", image: "" },
    { question: "O 'Golpe da Maioridade' beneficiou principalmente qual grupo político?", shortQ: "Beneficiado pelo Golpe da Maioridade", answer: "Os liberais, que articularam a antecipação da maioridade para retornar ao poder e encerrar o governo conservador de Araújo Lima.", fakeAnswer: "...", shortA: "Os liberais", image: "" },
    { question: "Como a alfabetização em árabe impactou a organização da Revolta dos Malês?", shortQ: "Árabe na organização dos Malês", answer: "Permitiu comunicação escrita e secreta entre os líderes, dificultando a vigilância das autoridades coloniais.", fakeAnswer: "...", shortA: "Comunicação secreta e escrita", image: "" },
    { question: "Qual aspecto da Revolta dos Malês a diferencia das revoltas escravas tradicionais no Brasil?", shortQ: "O que diferenciou os Malês", answer: "O alto nível de planejamento, a liderança intelectual religiosa e a participação de libertos — não apenas escravizados.", fakeAnswer: "...", shortA: "Planejamento, religião e participação de libertos", image: "" },
    { question: "Qual foi o principal impacto da repressão à Revolta dos Malês sobre a população africana na Bahia?", shortQ: "Impacto pós-revolta na Bahia", answer: "Aumentou brutalmente o controle e a vigilância sobre africanos livres e escravizados, restringindo ainda mais seus direitos.", fakeAnswer: "...", shortA: "Maior repressão e vigilância sobre africanos", image: "" },
    { question: "As Regências e a Revolta dos Malês ocorreram no mesmo período. Qual relação existe entre eles?", shortQ: "Relação entre Regências e Malês", answer: "A instabilidade política das Regências criou um ambiente de enfraquecimento do Estado, facilitando o surgimento de revoltas como a dos Malês.", fakeAnswer: "...", shortA: "Instabilidade das Regências favoreceu revoltas", image: "" }
];

const level1DataB = [
    { question: "Em que ano Dom Pedro I abdicou e por que o Brasil precisou de regentes?", shortQ: "Ano da abdicação", answer: "Em 1831. Dom Pedro I voltou para Portugal e seu filho tinha apenas 5 anos — jovem demais para governar.", fakeAnswer: "...", shortA: "1831 — filho com 5 anos", image: "" },
    { question: "Qual era o caráter da Regência Trina Provisória: permanente ou temporário?", shortQ: "Caráter da Reg. Provisória", answer: "Temporário. Era uma solução emergencial para o vazio de poder logo após a abdicação de Dom Pedro I.", fakeAnswer: "...", shortA: "Temporário — solução emergencial", image: "" },
    { question: "Para que serviu a Guarda Nacional criada pela Regência Trina Permanente?", shortQ: "Função da Guarda Nacional", answer: "Para manter a ordem pública, mas na prática fortaleceu o poder dos grandes proprietários rurais nas regiões.", fakeAnswer: "...", shortA: "Manter ordem; fortaleceu elite rural", image: "" },
    { question: "Quais foram as duas principais mudanças trazidas pelo Ato Adicional de 1834?", shortQ: "Mudanças do Ato Adicional", answer: "Criou a Regência Una (um regente só) e as Assembleias Legislativas Provinciais (mais autonomia às províncias).", fakeAnswer: "...", shortA: "Regência Una + Assembleias Provinciais", image: "" },
    { question: "Com quantos anos Dom Pedro II assumiu o poder no Golpe da Maioridade?", shortQ: "Idade no Golpe da Maioridade", answer: "14 anos. O Parlamento antecipou sua maioridade — a Constituição exigia 18 anos — para encerrar o caos.", fakeAnswer: "...", shortA: "14 anos de idade", image: "" },
    { question: "Em qual estado brasileiro a Revolta dos Malês eclodiu em 1835?", shortQ: "Estado da Revolta dos Malês", answer: "Na Bahia, especificamente na cidade de Salvador, que concentrava grande população africana escravizada.", fakeAnswer: "...", shortA: "Bahia — Salvador", image: "" },
    { question: "O que significa o termo 'Malê' usado para nomear os revoltosos de 1835?", shortQ: "Significado de 'Malê'", answer: "Era o nome dado aos africanos de religião islâmica (muçulmanos) escravizados na Bahia.", fakeAnswer: "...", shortA: "Africanos muçulmanos escravizados na Bahia", image: "" },
    { question: "Como os Malês conseguiram organizar a revolta sem serem descobertos antes?", shortQ: "Segredo da organização", answer: "Comunicavam-se por escrito em árabe, língua que as autoridades brasileiras não sabiam ler.", fakeAnswer: "...", shortA: "Escrita em árabe ilegível às autoridades", image: "" }
];

const level2DataB = [
    { question: "Qual dispositivo da Constituição de 1824 tornava a regência uma necessidade institucional inevitável?", shortQ: "Dispositivo constitucional das Regências", answer: "O artigo que fixava a maioridade imperial aos 18 anos, tornando ilegítimo o governo de Dom Pedro II antes dessa idade.", fakeAnswer: "...", shortA: "Maioridade imperial fixada aos 18 anos", image: "" },
    { question: "De que forma a Guarda Nacional de 1831 contribuiu para a formação do poder coronelístico brasileiro?", shortQ: "Guarda Nacional e Coronelismo", answer: "Ao transferir o controle das forças militares locais para os proprietários rurais, criou as condições estruturais do Coronelismo.", fakeAnswer: "...", shortA: "Transferiu controle militar à elite rural", image: "" },
    { question: "Qual lógica política sustentou o movimento que declarou a maioridade antecipada de Dom Pedro II?", shortQ: "Lógica do Golpe da Maioridade", answer: "Os liberais usaram a instabilidade das Regências como pretexto para antecipar a maioridade e retomar o poder do governo conservador.", fakeAnswer: "...", shortA: "Liberais usaram a instabilidade como pretexto", image: "" },
    { question: "Qual dimensão da identidade coletiva dos Malês foi determinante para a coesão e organização da revolta?", shortQ: "Identidade coletiva dos Malês", answer: "A identidade religiosa islâmica, que criou vínculos comunitários sólidos e uma liderança espiritual reconhecida.", fakeAnswer: "...", shortA: "Identidade religiosa islâmica", image: "" },
    { question: "Em que medida a participação de africanos libertos na Revolta dos Malês desafia a narrativa de que a liberdade jurídica resolvia as desigualdades?", shortQ: "Liberdade jurídica e desigualdade", answer: "Completamente: demonstra que a alforria não eliminava discriminação, exclusão e opressão socioeconômica.", fakeAnswer: "...", shortA: "Alforria não eliminava opressão", image: "" }
];

const enemData = [
    { question: "A abdicação de Dom Pedro I em 1831 inaugurou o período regencial no Brasil. Esse período foi marcado por intensa instabilidade política, expressa em diversas revoltas provinciais. Tal instabilidade decorria principalmente:", options: ["da ausência de um imperador adulto e da fragilidade do poder central.", "do excesso de centralização promovido pelas Regências.", "da invasão estrangeira que enfraqueceu as forças armadas brasileiras.", "da abolição da escravidão, que gerou conflitos sociais imediatos.", "do domínio absoluto dos militares sobre o Parlamento."], correct: 0 },
    { question: "O Ato Adicional de 1834 representou uma importante mudança na estrutura política do Brasil Imperial ao:", options: ["centralizar o poder nas mãos do Imperador, fortalecendo a monarquia.", "criar a Regência Una e ampliar a autonomia das províncias.", "estabelecer o voto secreto e universal para todos os homens livres.", "abolir as câmaras municipais e transferir seu poder ao governo central.", "proibir a formação de partidos políticos nas províncias."], correct: 1 },
    { question: "A Revolta dos Malês (1835), ocorrida em Salvador, é considerada a maior revolta urbana de escravizados no Brasil. Um elemento que a distingue de outras revoltas escravas do período é:", options: ["o apoio financeiro de fazendeiros contrários ao governo imperial.", "a liderança de militares brancos descontentes com o regime.", "a organização planejada por africanos muçulmanos alfabetizados em árabe.", "a participação exclusiva de escravizados nascidos no Brasil.", "o objetivo de restaurar a monarquia portuguesa no país."], correct: 2 },
    { question: "O 'Golpe da Maioridade' de 1840, que declarou Dom Pedro II apto a governar aos 14 anos, atendia principalmente aos interesses:", options: ["dos militares.", "da Igreja Católica.", "dos liberais, que desejavam retornar ao poder.", "dos escravizados.", "dos ingleses."], correct: 2 }
];

const enemDataB = [
    { question: "Durante o período regencial (1831-1840), o Brasil vivenciou diversas revoltas provinciais. Esse fenômeno é explicado, em grande medida, pela seguinte característica desse período:", options: ["centralização excessiva.", "fortalecimento da democracia.", "fragilidade do poder central e autonomia crescente das províncias.", "prosperidade econômica.", "intervenção de Portugal."], correct: 2 },
    { question: "A Revolta dos Malês (Salvador, 1835) distingue-se de outras rebeliões escravas do período por seu elevado grau de organização. Esse nível organizacional foi possível principalmente porque seus líderes:", options: ["apoio de comerciantes.", "dominavam a escrita em árabe, permitindo comunicação secreta.", "ocupavam cargos de confiança.", "código de silêncio.", "treinamento militar."], correct: 1 }
];

// GLOBALS
let currentGameMode = null; 
let currentLevel = 1;
let currentPart = 1; 
let currentSubject = null; // 'regencias' | 'males'
let currentData = [];
let currentCardIsTrue = true;

// ------------------------------------
// DATABASE: SUMMARY DATA
// ------------------------------------
const summaryDataP1 = [
    { subject: "regencias", title: "Por que existiram as Regências?", icon: "👶", isHighlight: true, content: `<p>Em 1831, Dom Pedro I abdicou do trono e voltou para Portugal. O herdeiro tinha apenas <strong>5 anos</strong>.</p>` },
    { subject: "regencias", title: "Regência Trina Provisória", icon: "🤝", isHighlight: false, content: `<p>Governo de emergência logo após a abdicação de Dom Pedro I.</p>` },
    { subject: "regencias", title: "Regência Trina Permanente", icon: "🛡️", isHighlight: false, content: `<p>Eleita pelo povo. Criou a <strong>Guarda Nacional</strong>, fortalecendo as elites rurais.</p>` },
    { subject: "regencias", title: "O Ato Adicional de 1834", icon: "📜", isHighlight: false, content: `<p>Criou a <strong>Regência Una</strong> e as Assembleias Legislativas Provinciais.</p>` },
    { subject: "regencias", title: "Golpe da Maioridade", icon: "🎂", isHighlight: false, content: `<p>Dom Pedro II assumiu com <strong>14 anos</strong> para trazer estabilidade.</p>` },
    { subject: "males", title: "Revolta dos Malês (1835)", icon: "🔥", isHighlight: true, content: `<p>Maior revolta de escravizados urbanos, organizada por africanos muçulmanos em Salvador.</p>` },
    { subject: "males", title: "Liderança e Escrita", icon: "✒️", isHighlight: false, content: `<p>Eram alfabetizados em árabe, permitindo planos secretos.</p>` },
    { subject: "males", title: "Objetivos", icon: "🎯", isHighlight: false, content: `<p>Fim da escravidão e liberdade religiosa para o Islã.</p>` }
];

const summaryDataP2 = [
    { subject: "regencias", title: "O Vazio no Trono", icon: "👑", isHighlight: false, content: `<p>O Brasil foi governado por substitutos enquanto o imperador crescia.</p>` },
    { subject: "regencias", title: "A Guarda Nacional", icon: "🤠", isHighlight: false, content: `<p>Deu poder militar aos fazendeiros, criando a figura do "Coronel".</p>` },
    { subject: "regencias", title: "Instabilidade", icon: "🌪️", isHighlight: true, content: `<p>O período regencial foi o mais caótico da história imperial.</p>` },
    { subject: "males", title: "Levante Islâmico", icon: "☪️", isHighlight: true, content: `<p>Africanos muçulmanos lutando por dignidade e liberdade na Bahia.</p>` },
    { subject: "males", title: "A Repressão", icon: "🚩", isHighlight: false, content: `<p>O governo puniu severamente os revoltosos com açoites e deportação.</p>` }
];

// ------------------------------------
// LOGIC
// ------------------------------------
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

function selectSubject(subject) {
    currentSubject = subject;
    document.getElementById('app-main-title').textContent = subject === 'regencias' ? 'As Regências 👑' : 'Revolta dos Malês ☪️';
    document.querySelector('.bottom-nav').style.display = 'flex';
    document.getElementById('btn-home').style.display = 'flex';
    switchTab('conteudo');
    renderSummary();
    if('vibrate' in navigator) navigator.vibrate(30);
}

function goHome() {
    currentSubject = null;
    document.getElementById('app-main-title').textContent = 'Estudo de História 👑';
    document.querySelector('.bottom-nav').style.display = 'none';
    document.getElementById('btn-home').style.display = 'none';
    switchTab('subject-selection');
}

document.getElementById('btn-home').addEventListener('click', goHome);

function switchTab(targetId) {
    tabContents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
    });
    const target = document.getElementById(targetId);
    if(target) {
        target.style.display = 'block';
        target.classList.add('active');
    }
    navItems.forEach(n => {
        n.classList.remove('active');
        if(n.getAttribute('data-target') === targetId) n.classList.add('active');
    });
}

function renderSummary() {
    const p1Container = document.getElementById('render-estudo-p1');
    const p2Container = document.getElementById('render-estudo-p2');
    if(!p1Container || !p2Container) return;
    const subP1 = summaryDataP1.filter(i => i.subject === currentSubject);
    const subP2 = summaryDataP2.filter(i => i.subject === currentSubject);
    const shufP1 = shuffleArray([...subP1]);
    const shufP2 = shuffleArray([...subP2]);
    p1Container.innerHTML = shufP1.map(c => `<div class="topic-card ${c.isHighlight?'highlight-card':''}"><div class="topic-header"><div class="topic-icon">${c.icon}</div><h2>${c.title}</h2></div><div class="topic-body">${c.content}</div></div>`).join('');
    p2Container.innerHTML = shufP2.map(c => `<div class="topic-card ${c.isHighlight?'highlight-card':''}"><div class="topic-header"><div class="topic-icon">${c.icon}</div><h2>${c.title}</h2></div><div class="topic-body">${c.content}</div></div>`).join('');
}

function setSubjectData() {
    const regK = ['regência', 'pedro', 'ato adicional', 'feijó', 'guarda nacional', 'maioridade'];
    const maleK = ['malê', 'salvador', 'muçulmano', 'árabe', 'escravizado', 'africano'];
    const filterFn = (i) => {
        const text = (i.question + ' ' + (i.shortQ || '')).toLowerCase();
        return currentSubject === 'regencias' ? regK.some(k => text.includes(k)) : maleK.some(k => text.includes(k));
    };
    const base = currentLevel === 1 ? (currentPart === 1 ? level1Data : level1DataB) : (currentPart === 1 ? level2Data : level2DataB);
    currentData = base.filter(filterFn);
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const tid = item.getAttribute('data-target');
        switchTab(tid);
        currentLevel = 1; currentPart = 1;
        setSubjectData();
        if(tid === 'conteudo') renderSummary();
        if(tid === 'flashcards-game') { currentGameMode = 'flashcards'; initFlashcards(); }
        else if(tid === 'match-game') { currentGameMode = 'match'; initMatchGame(); }
        else if(tid === 'enem-game') { currentGameMode = 'enem'; initEnemGame(); }
    });
});

// FLASHCARDS
let flashIndex = 0; let flashCorrect = 0; let flashWrong = 0;
const card = document.getElementById('card');
const qEl = document.getElementById('card-question');
const aEl = document.getElementById('card-answer');
const counterEl = document.getElementById('card-counter');
const progressEl = document.getElementById('progress');

function initFlashcards() {
    flashIndex = 0; flashCorrect = 0; flashWrong = 0;
    document.getElementById('flash-level-text').textContent = currentLevel === 1 ? 'Nível 1' : 'Nível 2';
    currentData = shuffleArray([...currentData]);
    updateCardUI();
}

function updateCardUI() {
    card.classList.remove('flipped');
    document.getElementById('eval-btns').style.display = 'flex';
    document.getElementById('continue-area').style.display = 'none';
    if(flashIndex < currentData.length) {
        const data = currentData[flashIndex];
        currentCardIsTrue = Math.random() > 0.5;
        qEl.textContent = data.question;
        if(currentCardIsTrue) aEl.textContent = data.answer;
        else {
            const others = currentData.filter((_, idx) => idx !== flashIndex);
            aEl.textContent = others.length > 0 ? others[Math.floor(Math.random()*others.length)].answer : "Resposta Falsa";
        }
        counterEl.textContent = `${flashIndex+1}/${currentData.length}`;
        progressEl.style.width = `${(flashIndex/currentData.length)*100}%`;
    } else {
        if(currentPart === 1) showPartTransition();
        else showResults(flashCorrect, currentData.length, true);
    }
}

function handleFlashcardAnswer(isUserCorrect) {
    if(isUserCorrect) { flashCorrect++; flashIndex++; updateCardUI(); }
    else {
        flashWrong++;
        document.getElementById('eval-btns').style.display = 'none';
        document.getElementById('continue-area').style.display = 'block';
        aEl.textContent = currentCardIsTrue ? "Estava CORRETO!" : "FALSO! O correto: " + currentData[flashIndex].answer;
    }
}

document.getElementById('btn-wrong').onclick = (e) => { e.stopPropagation(); handleFlashcardAnswer(!currentCardIsTrue); };
document.getElementById('btn-correct').onclick = (e) => { e.stopPropagation(); handleFlashcardAnswer(currentCardIsTrue); };
document.getElementById('btn-continue').onclick = (e) => { e.stopPropagation(); flashIndex++; updateCardUI(); };
card.onclick = () => card.classList.toggle('flipped');

// MATCH GAME
let matchRounds = []; let currentMatchRound = 0; let selectedQ = null; let selectedA = null; let matchesInRound = 0;
function initMatchGame() {
    document.getElementById('match-level-text').textContent = currentLevel === 1 ? 'Nível 1' : 'Nível 2';
    let shuf = shuffleArray([...currentData]);
    matchRounds = [];
    for(let i=0; i<shuf.length; i+=3) matchRounds.push(shuf.slice(i, i+3));
    currentMatchRound = 0; loadMatchRound();
}
function loadMatchRound() {
    matchesInRound = 0; selectedQ = null; selectedA = null;
    document.getElementById('btn-next-match').style.display = 'none';
    const round = matchRounds[currentMatchRound];
    const colQ = document.getElementById('match-col-q');
    const colA = document.getElementById('match-col-a');
    colQ.innerHTML = ''; colA.innerHTML = '';
    const qArr = shuffleArray([...round]);
    const aArr = shuffleArray([...round]);
    qArr.forEach(i => { const d = document.createElement('div'); d.className = 'match-item'; d.textContent = i.shortQ; d.dataset.id = i.shortQ; d.onclick = () => selectMatchItem(d, 'q'); colQ.appendChild(d); });
    aArr.forEach(i => { const d = document.createElement('div'); d.className = 'match-item'; d.textContent = i.shortA; d.dataset.id = i.shortQ; d.onclick = () => selectMatchItem(d, 'a'); colA.appendChild(d); });
}
function selectMatchItem(el, type) {
    if(el.classList.contains('matched')) return;
    if(type === 'q') { if(selectedQ) selectedQ.classList.remove('selected'); selectedQ = el; }
    else { if(selectedA) selectedA.classList.remove('selected'); selectedA = el; }
    el.classList.add('selected');
    if(selectedQ && selectedA) {
        if(selectedQ.dataset.id === selectedA.dataset.id) {
            selectedQ.classList.add('matched'); selectedA.classList.add('matched');
            matchesInRound++; selectedQ = null; selectedA = null;
            if(matchesInRound === matchRounds[currentMatchRound].length) {
                if(currentMatchRound < matchRounds.length-1) document.getElementById('btn-next-match').style.display = 'block';
                else currentPart === 1 ? showPartTransition() : showResults(10, 10, false);
            }
        } else {
            selectedQ.classList.remove('selected'); selectedA.classList.remove('selected');
            selectedQ = null; selectedA = null;
        }
    }
}
document.getElementById('btn-next-match').onclick = () => { currentMatchRound++; loadMatchRound(); };

// ENEM
let enemIndex = 0; let enemCorrect = 0;
function initEnemGame() {
    enemIndex = 0; enemCorrect = 0;
    const base = currentPart === 1 ? enemData : enemDataB;
    const regK = ['regência', 'pedro', 'ato adicional', 'feijó'];
    const maleK = ['malê', 'salvador', 'muçulmano', 'árabe'];
    const filtered = base.filter(i => {
        const text = i.question.toLowerCase();
        return currentSubject === 'regencias' ? regK.some(k => text.includes(k)) : maleK.some(k => text.includes(k));
    });
    window.currentEnemSet = shuffleArray([...filtered]);
    loadEnemQuestion();
}
function loadEnemQuestion() {
    const set = window.currentEnemSet;
    if(enemIndex >= set.length) { currentPart === 1 ? showPartTransition() : showResults(enemCorrect, set.length, true); return; }
    const data = set[enemIndex];
    document.getElementById('enem-counter').textContent = `${enemIndex+1}/${set.length}`;
    document.getElementById('enem-question').textContent = data.question;
    const optCont = document.getElementById('enem-options');
    optCont.innerHTML = '';
    const opts = shuffleArray(data.options.map((o, i) => ({ text: o, isCorrect: i === data.correct })));
    opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'enem-option';
        b.textContent = o.text;
        b.onclick = () => {
            if(o.isCorrect) { enemCorrect++; enemIndex++; loadEnemQuestion(); }
            else { alert("Incorreto!"); enemIndex++; loadEnemQuestion(); }
        };
        optCont.appendChild(b);
    });
}

function showPartTransition() {
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.getElementById('part-transition').style.display = 'block';
}

function startPart2() {
    currentPart = 2; setSubjectData();
    document.getElementById('part-transition').style.display = 'none';
    if(currentGameMode === 'flashcards') initFlashcards();
    else if(currentGameMode === 'match') initMatchGame();
    else if(currentGameMode === 'enem') initEnemGame();
    document.getElementById(currentGameMode+'-game').style.display = 'block';
}
document.getElementById('btn-start-part2').onclick = startPart2;

function showResults(c, t, s) {
    document.querySelectorAll('.tab-content').forEach(x => x.style.display = 'none');
    document.getElementById('results').style.display = 'block';
    document.getElementById('score-text').textContent = `${c}/${t}`;
}
document.getElementById('btn-restart').onclick = () => { 
    document.getElementById('results').style.display = 'none';
    currentPart = 1; setSubjectData();
    if(currentGameMode === 'flashcards') initFlashcards();
    else if(currentGameMode === 'match') initMatchGame();
    else if(currentGameMode === 'enem') initEnemGame();
    document.getElementById(currentGameMode+'-game').style.display = 'block';
};
document.getElementById('btn-back-study').onclick = () => { goHome(); };
document.getElementById('btn-ver-parte2-estudo').onclick = () => { document.getElementById('estudo-parte1').style.display = 'none'; document.getElementById('estudo-parte2').style.display = 'block'; };
document.getElementById('btn-voltar-parte1-estudo').onclick = () => { document.getElementById('estudo-parte2').style.display = 'none'; document.getElementById('estudo-parte1').style.display = 'block'; };

// Iniciar
goHome();
