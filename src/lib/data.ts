export type EventStatus = "Planejado" | "Em andamento" | "Concluído" | "Cancelado";
export type EventCategory =
  | "Saúde e Bem-estar"
  | "Científico"
  | "Cooperativismo"
  | "Esportivo"
  | "Institucional"
  | "Capacitação";

export interface BudgetItem {
  categoria: string;
  planejado: number;
  realizado: number;
}

export interface SurveyRating {
  label: string;
  score: number;
  responses: number;
}

export interface NpsData {
  promotores: number;
  neutros: number;
  detratores: number;
  score: number;
}

export interface Result {
  label: string;
  value: string;
  icon: string;
}

export interface TimelineItem {
  data: string;
  descricao: string;
  status: "done" | "current" | "pending";
}

export interface Event {
  id: string;
  titulo: string;
  descricao: string;
  categoria: EventCategory;
  status: EventStatus;
  dataInicio: string;
  dataFim: string;
  local: string;
  publicoAlvo: string;
  objetivos: string[];
  responsavel: string;
  equipe: string[];
  imagemCapa: string;
  orcamento: BudgetItem[];
  pesquisa: {
    totalRespondentes: number;
    nps: NpsData;
    avaliacoes: SurveyRating[];
    comentarios: string[];
  };
  resultados: Result[];
  timeline: TimelineItem[];
  participantes: number;
  alcance: number;
}

export const eventos: Event[] = [
  {
    id: "semana-saude-2024",
    titulo: "Semana da Saúde Unimed 2024",
    descricao:
      "A maior ação de saúde preventiva da Unimed Rio Preto, oferecendo consultas, exames e orientações gratuitas para cooperados e comunidade. Um evento multidisciplinar que reúne médicos cooperados e profissionais de saúde em prol da qualidade de vida.",
    categoria: "Saúde e Bem-estar",
    status: "Concluído",
    dataInicio: "2024-04-22",
    dataFim: "2024-04-26",
    local: "Shopping Iguatemi São José do Rio Preto",
    publicoAlvo: "Cooperados, beneficiários e comunidade em geral",
    objetivos: [
      "Promover saúde preventiva e conscientização",
      "Fortalecer o vínculo com cooperados e beneficiários",
      "Ampliar visibilidade da marca Unimed na região",
      "Gerar valor social para a comunidade",
    ],
    responsavel: "Gabriela Fonseca",
    equipe: ["Marketing", "Médicos Cooperados", "Enfermagem", "TI"],
    imagemCapa: "/eventos/semana-saude.jpg",
    orcamento: [
      { categoria: "Locação de espaço", planejado: 45000, realizado: 42000 },
      { categoria: "Montagem e estrutura", planejado: 30000, realizado: 31500 },
      { categoria: "Material gráfico", planejado: 12000, realizado: 11200 },
      { categoria: "Alimentação/coffee", planejado: 8000, realizado: 7600 },
      { categoria: "Comunicação e mídia", planejado: 25000, realizado: 23000 },
      { categoria: "Equipe e pessoal", planejado: 15000, realizado: 14500 },
      { categoria: "Equipamentos médicos", planejado: 20000, realizado: 18900 },
    ],
    pesquisa: {
      totalRespondentes: 847,
      nps: { promotores: 72, neutros: 20, detratores: 8, score: 64 },
      avaliacoes: [
        { label: "Organização geral", score: 4.7, responses: 847 },
        { label: "Atendimento da equipe", score: 4.8, responses: 847 },
        { label: "Qualidade dos serviços", score: 4.6, responses: 847 },
        { label: "Localização e acesso", score: 4.3, responses: 847 },
        { label: "Variedade de serviços", score: 4.5, responses: 847 },
      ],
      comentarios: [
        "Excelente iniciativa! Consegui fazer vários exames preventivos de graça.",
        "Atendimento humanizado e equipe muito dedicada.",
        "Adorei a ação, espero que repitam ano que vem com ainda mais serviços!",
        "A fila estava grande, mas valeu a pena. Ótimo serviço!",
        "Parabéns à Unimed por se preocupar com a saúde da comunidade.",
      ],
    },
    resultados: [
      { label: "Participantes atendidos", value: "3.842", icon: "users" },
      { label: "Exames realizados", value: "1.205", icon: "clipboard" },
      { label: "Consultas médicas", value: "632", icon: "stethoscope" },
      { label: "Alcance nas redes sociais", value: "48.000", icon: "share" },
      { label: "Matérias na imprensa", value: "12", icon: "newspaper" },
      { label: "NPS do evento", value: "64", icon: "star" },
    ],
    timeline: [
      { data: "Jan/2024", descricao: "Planejamento estratégico e briefing", status: "done" },
      { data: "Fev/2024", descricao: "Definição de local e fornecedores", status: "done" },
      { data: "Mar/2024", descricao: "Produção de materiais e comunicação", status: "done" },
      { data: "Abr/2024", descricao: "Realização do evento (22-26/04)", status: "done" },
      { data: "Mai/2024", descricao: "Análise de resultados e relatório final", status: "done" },
    ],
    participantes: 3842,
    alcance: 48000,
  },
  {
    id: "congresso-medico-2024",
    titulo: "XIV Congresso Médico Unimed",
    descricao:
      "Evento científico de alto nível que reúne médicos cooperados e especialistas nacionais para atualização em temas como oncologia, cardiologia, saúde digital e gestão clínica. Uma oportunidade única de networking e desenvolvimento profissional.",
    categoria: "Científico",
    status: "Concluído",
    dataInicio: "2024-08-15",
    dataFim: "2024-08-17",
    local: "Hotel Bourbon - São José do Rio Preto",
    publicoAlvo: "Médicos cooperados e profissionais de saúde",
    objetivos: [
      "Atualizar cooperados em temas científicos de ponta",
      "Fortalecer o sentimento de pertencimento ao cooperativismo",
      "Atrair novos médicos cooperados",
      "Posicionar a Unimed como referência em saúde de qualidade",
    ],
    responsavel: "Carlos Eduardo Martins",
    equipe: ["Marketing", "Área Médica", "Governança", "TI"],
    imagemCapa: "/eventos/congresso-medico.jpg",
    orcamento: [
      { categoria: "Locação hotel/auditório", planejado: 80000, realizado: 78500 },
      { categoria: "Palestrantes convidados", planejado: 50000, realizado: 55000 },
      { categoria: "Alimentação e coffee", planejado: 35000, realizado: 33200 },
      { categoria: "Material gráfico", planejado: 15000, realizado: 13800 },
      { categoria: "Audiovisual e tecnologia", planejado: 22000, realizado: 21500 },
      { categoria: "Comunicação e marketing", planejado: 18000, realizado: 17200 },
      { categoria: "Logística e transporte", planejado: 10000, realizado: 9800 },
    ],
    pesquisa: {
      totalRespondentes: 312,
      nps: { promotores: 81, neutros: 14, detratores: 5, score: 76 },
      avaliacoes: [
        { label: "Qualidade científica das palestras", score: 4.9, responses: 312 },
        { label: "Organização do evento", score: 4.7, responses: 312 },
        { label: "Estrutura e instalações", score: 4.6, responses: 312 },
        { label: "Networking", score: 4.5, responses: 312 },
        { label: "Relevância dos temas", score: 4.8, responses: 312 },
      ],
      comentarios: [
        "Palestras de altíssimo nível. Conteúdo muito atual e relevante.",
        "Ótima oportunidade de networking com colegas da região.",
        "O congresso cresce a cada ano. Parabéns à organização!",
        "As mesas redondas foram especialmente enriquecedoras.",
        "Excelente estrutura. O hotel foi uma ótima escolha.",
      ],
    },
    resultados: [
      { label: "Médicos participantes", value: "389", icon: "users" },
      { label: "Horas de conteúdo", value: "22h", icon: "clock" },
      { label: "Palestrantes", value: "18", icon: "mic" },
      { label: "Créditos CME emitidos", value: "312", icon: "award" },
      { label: "Satisfação geral", value: "4,7/5", icon: "star" },
      { label: "NPS do evento", value: "76", icon: "trending-up" },
    ],
    timeline: [
      { data: "Mar/2024", descricao: "Definição de tema e programação científica", status: "done" },
      { data: "Mai/2024", descricao: "Contratação de palestrantes e hotel", status: "done" },
      { data: "Jun/2024", descricao: "Abertura de inscrições e comunicação", status: "done" },
      { data: "Ago/2024", descricao: "Realização do congresso (15-17/08)", status: "done" },
      { data: "Set/2024", descricao: "Relatório e publicação dos anais", status: "done" },
    ],
    participantes: 389,
    alcance: 12000,
  },
  {
    id: "dia-cooperado-2024",
    titulo: "Dia do Cooperado 2024",
    descricao:
      "Celebração anual que reúne os médicos cooperados e suas famílias em um ambiente descontraído e festivo. O evento reconhece os cooperados destaque do ano e reforça os valores do cooperativismo médico.",
    categoria: "Cooperativismo",
    status: "Concluído",
    dataInicio: "2024-10-05",
    dataFim: "2024-10-05",
    local: "Clube Simonsen - São José do Rio Preto",
    publicoAlvo: "Médicos cooperados e familiares",
    objetivos: [
      "Celebrar e reconhecer os médicos cooperados",
      "Fortalecer laços de comunidade e pertencimento",
      "Premiar cooperados destaque do ano",
      "Reforçar a cultura cooperativista",
    ],
    responsavel: "Ana Paula Rodrigues",
    equipe: ["Marketing", "RH", "Governança", "Eventos"],
    imagemCapa: "/eventos/dia-cooperado.jpg",
    orcamento: [
      { categoria: "Locação do espaço", planejado: 20000, realizado: 19500 },
      { categoria: "Alimentação e buffet", planejado: 55000, realizado: 57200 },
      { categoria: "Entretenimento/música", planejado: 15000, realizado: 15000 },
      { categoria: "Troféus e premiações", planejado: 12000, realizado: 11500 },
      { categoria: "Decoração e cenografia", planejado: 18000, realizado: 17800 },
      { categoria: "Comunicação", planejado: 8000, realizado: 7200 },
    ],
    pesquisa: {
      totalRespondentes: 256,
      nps: { promotores: 88, neutros: 10, detratores: 2, score: 86 },
      avaliacoes: [
        { label: "Programação do evento", score: 4.8, responses: 256 },
        { label: "Qualidade da alimentação", score: 4.9, responses: 256 },
        { label: "Ambiente e decoração", score: 4.7, responses: 256 },
        { label: "Cerimônia de premiação", score: 4.9, responses: 256 },
        { label: "Integração e networking", score: 4.8, responses: 256 },
      ],
      comentarios: [
        "Uma noite inesquecível! A premiação foi muito emocionante.",
        "Adorei o buffet e a música. Ambiente perfeito!",
        "É sempre uma alegria participar. Sinto muito orgulho de ser cooperado.",
        "A organização foi impecável. Parabéns a todos!",
        "Excelente iniciativa para nos unir como família cooperativa.",
      ],
    },
    resultados: [
      { label: "Cooperados presentes", value: "312", icon: "users" },
      { label: "Familiares presentes", value: "180", icon: "heart" },
      { label: "Cooperados premiados", value: "15", icon: "award" },
      { label: "Satisfação geral", value: "4,8/5", icon: "star" },
      { label: "NPS do evento", value: "86", icon: "trending-up" },
      { label: "Taxa de presença", value: "94%", icon: "check" },
    ],
    timeline: [
      { data: "Ago/2024", descricao: "Planejamento e definição de local", status: "done" },
      { data: "Set/2024", descricao: "Convites, comunicação e seleção dos premiados", status: "done" },
      { data: "Out/2024", descricao: "Realização do evento (05/10)", status: "done" },
      { data: "Out/2024", descricao: "Registro fotográfico e relatório", status: "done" },
    ],
    participantes: 492,
    alcance: 8500,
  },
  {
    id: "corrida-saude-2024",
    titulo: "Corrida e Caminhada pela Saúde 2024",
    descricao:
      "Evento esportivo que incentiva a prática de atividade física e hábitos saudáveis entre cooperados, beneficiários e comunidade. Com percursos de 5km e 10km, o evento une saúde, esporte e confraternização.",
    categoria: "Esportivo",
    status: "Concluído",
    dataInicio: "2024-09-15",
    dataFim: "2024-09-15",
    local: "Parque da Cidade - São José do Rio Preto",
    publicoAlvo: "Cooperados, beneficiários e comunidade",
    objetivos: [
      "Incentivar a prática de atividade física",
      "Promover hábitos de vida saudável",
      "Gerar visibilidade e reputação para a marca",
      "Integrar cooperados, beneficiários e comunidade",
    ],
    responsavel: "Marcos Vinícius Souza",
    equipe: ["Marketing", "Medicina do Esporte", "Operações", "Comunicação"],
    imagemCapa: "/eventos/corrida-saude.jpg",
    orcamento: [
      { categoria: "Organização e cronometragem", planejado: 35000, realizado: 34500 },
      { categoria: "Kits dos participantes", planejado: 42000, realizado: 41200 },
      { categoria: "Estrutura e montagem", planejado: 25000, realizado: 26800 },
      { categoria: "Medalhas e troféus", planejado: 15000, realizado: 14200 },
      { categoria: "Comunicação e mídias", planejado: 20000, realizado: 19500 },
      { categoria: "Suporte médico", planejado: 10000, realizado: 10000 },
      { categoria: "Alimentação pós-prova", planejado: 12000, realizado: 11500 },
    ],
    pesquisa: {
      totalRespondentes: 1243,
      nps: { promotores: 79, neutros: 15, detratores: 6, score: 73 },
      avaliacoes: [
        { label: "Organização geral", score: 4.6, responses: 1243 },
        { label: "Percurso e sinalização", score: 4.4, responses: 1243 },
        { label: "Kit do participante", score: 4.7, responses: 1243 },
        { label: "Suporte médico", score: 4.8, responses: 1243 },
        { label: "Cerimônia de premiação", score: 4.5, responses: 1243 },
      ],
      comentarios: [
        "Corrida muito bem organizada! Percurso bonito e bem sinalizado.",
        "O kit foi incrível. Adorei a camiseta e os brindes.",
        "Superou minhas expectativas! Vou participar todo ano.",
        "Ótimo suporte médico ao longo do percurso.",
        "Evento que só cresce. Parabéns à equipe Unimed!",
      ],
    },
    resultados: [
      { label: "Inscritos", value: "2.100", icon: "users" },
      { label: "Finishers", value: "1.847", icon: "flag" },
      { label: "Alcance em redes sociais", value: "95.000", icon: "share" },
      { label: "Matérias na imprensa", value: "8", icon: "newspaper" },
      { label: "NPS do evento", value: "73", icon: "trending-up" },
      { label: "Taxa de conclusão", value: "88%", icon: "check" },
    ],
    timeline: [
      { data: "Jun/2024", descricao: "Planejamento e contratação da organizadora", status: "done" },
      { data: "Jul/2024", descricao: "Abertura de inscrições e campanha digital", status: "done" },
      { data: "Ago/2024", descricao: "Produção de kits e materiais", status: "done" },
      { data: "Set/2024", descricao: "Realização da corrida (15/09)", status: "done" },
      { data: "Set/2024", descricao: "Divulgação de resultados e relatório", status: "done" },
    ],
    participantes: 1847,
    alcance: 95000,
  },
  {
    id: "workshop-gestao-2025",
    titulo: "Workshop de Gestão em Saúde 2025",
    descricao:
      "Capacitação exclusiva para líderes médicos e gestores da Unimed, com foco em gestão clínica, liderança, inovação e transformação digital na saúde. Formato híbrido com especialistas nacionais.",
    categoria: "Capacitação",
    status: "Em andamento",
    dataInicio: "2025-03-10",
    dataFim: "2025-03-12",
    local: "Sede Unimed Rio Preto + Online",
    publicoAlvo: "Líderes médicos, diretores e gestores",
    objetivos: [
      "Desenvolver competências de liderança e gestão",
      "Discutir tendências em saúde e inovação",
      "Criar rede de líderes dentro da cooperativa",
      "Fomentar cultura de melhoria contínua",
    ],
    responsavel: "Patrícia Lima",
    equipe: ["Marketing", "Educação Corporativa", "TI", "Área Médica"],
    imagemCapa: "/eventos/workshop-gestao.jpg",
    orcamento: [
      { categoria: "Plataforma digital/streaming", planejado: 15000, realizado: 14200 },
      { categoria: "Palestrantes e facilitadores", planejado: 40000, realizado: 38500 },
      { categoria: "Material didático", planejado: 8000, realizado: 7500 },
      { categoria: "Alimentação presencial", planejado: 12000, realizado: 0 },
      { categoria: "Comunicação interna", planejado: 5000, realizado: 4800 },
    ],
    pesquisa: {
      totalRespondentes: 0,
      nps: { promotores: 0, neutros: 0, detratores: 0, score: 0 },
      avaliacoes: [],
      comentarios: [],
    },
    resultados: [],
    timeline: [
      { data: "Jan/2025", descricao: "Planejamento curricular e seleção de palestrantes", status: "done" },
      { data: "Fev/2025", descricao: "Inscrições abertas e comunicação interna", status: "done" },
      { data: "Mar/2025", descricao: "Realização do workshop (10-12/03)", status: "current" },
      { data: "Mar/2025", descricao: "Coleta de feedback e relatório", status: "pending" },
    ],
    participantes: 0,
    alcance: 0,
  },
  {
    id: "confraternizacao-2024",
    titulo: "Festa de Confraternização 2024",
    descricao:
      "Encerramento do ano com celebração dos resultados alcançados pela Unimed Rio Preto. Um evento sofisticado que reúne todos os colaboradores, médicos cooperados e parceiros para comemorar conquistas e fortalecer vínculos.",
    categoria: "Institucional",
    status: "Concluído",
    dataInicio: "2024-12-13",
    dataFim: "2024-12-13",
    local: "Espaço Villa Lobos - São José do Rio Preto",
    publicoAlvo: "Colaboradores, cooperados e parceiros estratégicos",
    objetivos: [
      "Celebrar os resultados do ano",
      "Reconhecer colaboradores e cooperados destaques",
      "Fortalecer cultura organizacional e pertencimento",
      "Iniciar o novo ano com alta energia e motivação",
    ],
    responsavel: "Fernanda Cristina Alves",
    equipe: ["Marketing", "RH", "Comunicação", "Eventos"],
    imagemCapa: "/eventos/confraternizacao.jpg",
    orcamento: [
      { categoria: "Locação do espaço", planejado: 35000, realizado: 35000 },
      { categoria: "Buffet e bebidas", planejado: 85000, realizado: 87500 },
      { categoria: "Entretenimento", planejado: 30000, realizado: 28000 },
      { categoria: "Decoração temática", planejado: 25000, realizado: 24500 },
      { categoria: "Convites e comunicação", planejado: 10000, realizado: 9200 },
      { categoria: "Premiação e brindes", planejado: 20000, realizado: 19800 },
    ],
    pesquisa: {
      totalRespondentes: 487,
      nps: { promotores: 85, neutros: 12, detratores: 3, score: 82 },
      avaliacoes: [
        { label: "Programação e entretenimento", score: 4.8, responses: 487 },
        { label: "Qualidade do buffet", score: 4.9, responses: 487 },
        { label: "Decoração e ambiente", score: 4.8, responses: 487 },
        { label: "Organização geral", score: 4.7, responses: 487 },
        { label: "Cerimônia de premiação", score: 4.9, responses: 487 },
      ],
      comentarios: [
        "A melhor confraternização que já participei! Estrutura impecável.",
        "A música estava ótima e o buffet delicioso. Noite memorável!",
        "A premiação foi muito emocionante. Me sinto valorizado.",
        "Que evento lindo! A decoração estava perfeita.",
        "Orgulho de fazer parte dessa equipe. Encerramento de ano inesquecível!",
      ],
    },
    resultados: [
      { label: "Convidados presentes", value: "620", icon: "users" },
      { label: "Premiados", value: "32", icon: "award" },
      { label: "Satisfação geral", value: "4,8/5", icon: "star" },
      { label: "NPS do evento", value: "82", icon: "trending-up" },
      { label: "Taxa de confirmação", value: "96%", icon: "check" },
      { label: "Fotos compartilhadas", value: "1.200+", icon: "camera" },
    ],
    timeline: [
      { data: "Out/2024", descricao: "Planejamento, escolha do local e tema", status: "done" },
      { data: "Nov/2024", descricao: "Contratação de fornecedores e envio de convites", status: "done" },
      { data: "Dez/2024", descricao: "Realização da festa (13/12)", status: "done" },
      { data: "Dez/2024", descricao: "Registro e relatório final", status: "done" },
    ],
    participantes: 620,
    alcance: 5000,
  },
  {
    id: "forum-inovacao-2025",
    titulo: "Fórum de Inovação em Saúde 2025",
    descricao:
      "Evento de posicionamento estratégico que debate o futuro da saúde suplementar, tecnologia médica, inteligência artificial e sustentabilidade nos planos de saúde. Reúne líderes do setor de todo o Brasil.",
    categoria: "Científico",
    status: "Planejado",
    dataInicio: "2025-06-19",
    dataFim: "2025-06-20",
    local: "Centro de Eventos Unimed - São José do Rio Preto",
    publicoAlvo: "Executivos, médicos líderes, parceiros estratégicos e imprensa",
    objetivos: [
      "Posicionar a Unimed Rio Preto como referência em inovação",
      "Debater tendências e desafios da saúde suplementar",
      "Criar conexões estratégicas com líderes do setor",
      "Gerar conteúdo e visibilidade para a marca",
    ],
    responsavel: "Rodrigo Gaspar",
    equipe: ["Marketing", "Inteligência de Mercado", "Área Médica", "Comunicação", "TI"],
    imagemCapa: "/eventos/forum-inovacao.jpg",
    orcamento: [
      { categoria: "Locação e estrutura", planejado: 60000, realizado: 0 },
      { categoria: "Palestrantes nacionais", planejado: 80000, realizado: 0 },
      { categoria: "Alimentação e coffee", planejado: 30000, realizado: 0 },
      { categoria: "Tecnologia e streaming", planejado: 25000, realizado: 0 },
      { categoria: "Comunicação e marketing", planejado: 35000, realizado: 0 },
      { categoria: "Material e brindes", planejado: 15000, realizado: 0 },
    ],
    pesquisa: {
      totalRespondentes: 0,
      nps: { promotores: 0, neutros: 0, detratores: 0, score: 0 },
      avaliacoes: [],
      comentarios: [],
    },
    resultados: [],
    timeline: [
      { data: "Mar/2025", descricao: "Definição de programação e palestrantes", status: "done" },
      { data: "Abr/2025", descricao: "Contratações e abertura de inscrições", status: "current" },
      { data: "Mai/2025", descricao: "Campanha de divulgação e confirmações", status: "pending" },
      { data: "Jun/2025", descricao: "Realização do fórum (19-20/06)", status: "pending" },
      { data: "Jun/2025", descricao: "Análise e relatório de resultados", status: "pending" },
    ],
    participantes: 0,
    alcance: 0,
  },
];

export function getEventById(id: string): Event | undefined {
  return eventos.find((e) => e.id === id);
}

export function getTotalBudget(event: Event): { planejado: number; realizado: number } {
  return event.orcamento.reduce(
    (acc, item) => ({
      planejado: acc.planejado + item.planejado,
      realizado: acc.realizado + item.realizado,
    }),
    { planejado: 0, realizado: 0 }
  );
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export const dashboardStats = {
  totalEventos: 7,
  eventosRealizados: 5,
  totalParticipantes: 7090,
  orcamentoTotal: 1285000,
  npsMedia: 74.2,
  alcanceTotal: 168500,
};
