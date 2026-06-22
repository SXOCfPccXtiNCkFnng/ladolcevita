import heroTuscany from '../assets/hero_tuscany.png';
import costaAmalfitana from '../assets/costa_amalfitana.png';
import lagoDeComo from '../assets/lago_de_como.png';
import portugalCompleto from '../assets/portugal_completo.png';
import siciliaDestination from '../assets/sicilia_destination.png';
import pugliaDestination from '../assets/puglia_destination.png';

export const mockTrips = [
  {
    id: "toscana-vinhos",
    title: "Toscana",
    country: "Itália",
    duration: "8 Dias",
    departure: "São Paulo/SP",
    date: "Setembro de 2026",
    price: "R$ 18.500",
    spotsTotal: 12,
    spotsLeft: 5,
    status: "Ativo",
    description: "Paisagens inesquecíveis, vilarejos medievais e vinhos que são verdadeiras obras de arte.",
    included: "Hospedagem em hotel boutique com café da manhã\nTodos os traslados privativos\nDegustações de vinho Brunello di Montalcino\nGuia local especializado",
    image: heroTuscany,
    tags: ["Vinhos", "Cultura", "Exclusivo"],
    route: ["Florença", "Siena", "San Gimignano", "Val d'Orcia", "Montepulciano", "Lucca"],
    itinerary: [
      { day: 1, title: "Chegada em Florença", desc: "Traslado privado ao nosso hotel boutique na Toscana rural. Jantar de boas-vindas no jardim." }
    ]
  },
  {
    id: "sicilia-exclusiva",
    title: "Sicília",
    country: "Itália",
    duration: "9 Dias",
    departure: "São Paulo/SP",
    date: "Outubro de 2026",
    price: "R$ 17.900",
    spotsTotal: 12,
    spotsLeft: 6,
    status: "Ativo",
    description: "História milenar, praias deslumbrantes e uma culinária que conquista à primeira garfada.",
    included: "Hospedagem em hotéis boutique selecionados\nTraslados privativos em todo o roteiro\nEntradas inclusas nos monumentos históricos\nGuia em português acompanhante",
    image: siciliaDestination,
    tags: ["Gastronomia", "Cultura", "Litoral"],
    route: ["Catânia", "Taormina", "Siracusa", "Noto", "Ragusa", "Agrigento", "Palermo"],
    itinerary: [
      { day: 1, title: "Chegada a Catânia e Taormina", desc: "Recepção no aeroporto e traslado privado para o hotel em Taormina." }
    ]
  },
  {
    id: "lago-de-como-milao",
    title: "Lago de Como",
    country: "Itália",
    duration: "6 Dias",
    departure: "São Paulo/SP",
    date: "Outubro de 2026",
    price: "R$ 15.200",
    spotsTotal: 12,
    spotsLeft: 8,
    status: "Ativo",
    description: "Charme, elegância e cenários de tirar o fôlego nas margens do lago mais famoso da Itália.",
    included: "Hospedagem em hotel boutique à beira-lago\nPasseio privativo de barco clássico Riva\nTraslados privativos de/para Milão\nGuia acompanhante exclusivo",
    image: lagoDeComo,
    tags: ["Lagos", "Luxo", "Moda"],
    route: ["Milão", "Como", "Bellagio", "Varenna", "Menaggio"],
    itinerary: [
      { day: 1, title: "Milão Cosmopolita", desc: "Check-in no hotel no centro de Milão. Tour guiado pela Galeria Vittorio Emmanuele e Duomo." }
    ]
  },
  {
    id: "portugal-completo-2027",
    title: "Portugal e suas Aldeias",
    country: "Portugal",
    duration: "10 Dias",
    departure: "Piraju/SP",
    date: "Março de 2027",
    price: "R$ 14.800",
    spotsTotal: 15,
    spotsLeft: 4,
    status: "Vagas Limitadas",
    description: "Roteiros encantadores por aldeias históricas, tradições e sabores autênticos.",
    included: "Hospedagem charmosa em pousadas históricas\nTransporte privativo confortável em minibus\nRefeições com gastronomia típica e vinhos regionais\nGuia experiente em todo o percurso",
    image: portugalCompleto,
    tags: ["Grupo", "História", "Gastronomia"],
    route: ["Lisboa", "Fátima", "Óbidos", "Setúbal", "Évora", "Tomar", "Coimbra", "Porto", "Guimarães", "Braga", "Aveiro", "Nazaré"],
    itinerary: [
      { day: 1, title: "Chegada a Lisboa", desc: "Recepção no aeroporto e traslado privado para o hotel. Tempo livre para descansar e jantar de boas-vindas." },
      { day: 2, title: "Lisboa Histórica", desc: "Visita guiada ao Bairro de Belém, Mosteiro dos Jerónimos e Torre de Belém." }
    ]
  },
  {
    id: "costa-amalfitana",
    title: "Costa Amalfitana",
    country: "Itália",
    duration: "7 Dias",
    departure: "Rio de Janeiro/RJ",
    date: "Julho de 2026",
    price: "R$ 16.900",
    spotsTotal: 10,
    spotsLeft: 0,
    status: "Esgotado",
    description: "Estradas panorâmicas, vilas coloridas e o azul intenso do mar Mediterrâneo.",
    included: "Hospedagem boutique com vista para o mar\nPasseio de barco privativo ao redor da Ilha de Capri\nTraslados e transporte privativo local\nGuia local credenciado",
    image: costaAmalfitana,
    tags: ["Litoral", "Romântico", "Barco"],
    route: ["Nápoles", "Sorrento", "Positano", "Amalfi", "Ravello", "Ilha de Capri"],
    itinerary: [
      { day: 1, title: "Chegada a Nápoles e Sorrento", desc: "Recepção no aeroporto e traslado panorâmico até Sorrento." }
    ]
  },
  {
    id: "puglia-trulli",
    title: "Puglia",
    country: "Itália",
    duration: "8 Dias",
    departure: "Rio de Janeiro/RJ",
    date: "Junho de 2026",
    price: "R$ 15.600",
    spotsTotal: 10,
    spotsLeft: 3,
    status: "Vagas Limitadas",
    description: "Trulli, campos de oliveiras e o ritmo tranquilo do sul da Itália.",
    included: "Hospedagem em Masseria histórica (fazenda de luxo)\nTraslados privativos confortáveis\nVisitas guiadas e degustação de azeites milenares\nGuia acompanhante dedicado",
    image: pugliaDestination,
    tags: ["Grupo", "História", "Exclusivo"],
    route: ["Bari", "Polignano a Mare", "Alberobello", "Ostuni", "Lecce", "Otranto"],
    itinerary: [
      { day: 1, title: "Bari e Polignano a Mare", desc: "Recepção no aeroporto e traslado para o hotel em Polignano, debruçado sobre as falésias." }
    ]
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Mariana L.",
    location: "São Paulo, SP",
    trip: "Toscana & Vinhos",
    stars: 5,
    text: "A viagem para a Toscana foi simplesmente inesquecível! Tudo foi planejado com muito carinho e cuidado, desde a hospedagem na vila histórica até as degustações exclusivas. Voltei encantada!"
  },
  {
    id: 2,
    name: "Carlos e Ana",
    location: "Curitiba, PR",
    trip: "Portugal Completo",
    stars: 5,
    text: "Atendimento impecável e experiências que fugiram do óbvio. Viajar com a La Dolce Vita nos deu a segurança de um grupo com a exclusividade de um roteiro personalizado. Recomendamos fortemente!"
  },
  {
    id: 3,
    name: "Juliana R.",
    location: "Belo Horizonte, MG",
    trip: "Costa Amalfitana",
    stars: 5,
    text: "Cada detalhe foi pensado com muito carinho. Os guias locais eram extremamente cultos e prestativos. Foi a melhor experiência de viagem que já tive na Europa. Com certeza farei outras!"
  },
  {
    id: 4,
    name: "Renato S.",
    location: "Campinas, SP",
    trip: "Toscana & Vinhos",
    stars: 5,
    text: "A curadoria dos restaurantes e o acesso exclusivo a vinícolas familiares que não recebem grandes grupos foi o ponto alto. Viajar dessa forma é inigualável."
  },
  {
    id: 5,
    name: "Beatriz M.",
    location: "Niterói, RJ",
    trip: "Portugal Completo",
    stars: 5,
    text: "Excelente atendimento do início ao fim. O suporte online em português nos ajudou a mudar uma reserva de passeio na última hora sem qualquer estresse."
  },
  {
    id: 6,
    name: "Fernando e Carla",
    location: "Porto Alegre, RS",
    trip: "Lago de Como & Milão",
    stars: 5,
    text: "Hospedar-se no Lago de Como com a vista deslumbrante que nos arranjaram foi um sonho. Todo o luxo e cuidado prometidos foram entregues. Voltaremos com certeza!"
  }
];

export const mockMoments = [
  {
    id: "brinde-toscana",
    type: "photo",
    category: "Itália",
    title: "Brinde ao pôr do sol na Toscana",
    location: "Val d'Orcia, Itália",
    date: "Setembro de 2024",
    description: "Um fim de tarde mágico regado a Brunello di Montalcino, risadas espontâneas e o horizonte dourado da Toscana.",
    image: heroTuscany
  },
  {
    id: "barco-como",
    type: "video",
    category: "Experiências",
    title: "Passeio de Riva no Lago de Como",
    location: "Bellagio, Itália",
    date: "Outubro de 2024",
    description: "Navegando em um clássico barco italiano de madeira pelas águas calmas do Lago de Como, admirando as vilas históricas.",
    image: lagoDeComo,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Exemplo de vídeo leve para teste
  },
  {
    id: "jantar-evora",
    type: "photo",
    category: "Portugal",
    title: "Jantar sob as estrelas em Évora",
    location: "Alentejo, Portugal",
    date: "Maio de 2025",
    description: "Uma mesa compartilhada em uma vinícola histórica alentejana. Gastronomia autêntica e conversas que duraram até a madrugada.",
    image: portugalCompleto
  },
  {
    id: "alberobello-explora",
    type: "photo",
    category: "Itália",
    title: "Descobrindo os Trulli de Alberobello",
    location: "Puglia, Itália",
    date: "Junho de 2025",
    description: "Caminhando pelas ruelas brancas com telhados cônicos de pedra, desvendando as lendas locais com nosso guia privativo.",
    image: pugliaDestination
  },
  {
    id: "eletrico-lisboa",
    type: "video",
    category: "Portugal",
    title: "Nosso elétrico privativo em Lisboa",
    location: "Alfama, Lisboa",
    date: "Março de 2025",
    description: "Reservamos um elétrico histórico exclusivo para o nosso grupo cruzar as ladeiras de Alfama regado a fado e vinho verde.",
    image: portugalCompleto,
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  },
  {
    id: "colheita-azeitona",
    type: "photo",
    category: "Experiências",
    title: "Vindima e colheita em vinhedo secular",
    location: "Chianti, Itália",
    date: "Setembro de 2024",
    description: "Nossos viajantes colocando a mão na massa na colheita e aprendendo as técnicas tradicionais dos produtores locais.",
    image: heroTuscany
  },
  {
    id: "amalfi-panoramica",
    type: "photo",
    category: "Itália",
    title: "Vista panorâmica da Costa de Positano",
    location: "Costa Amalfitana, Itália",
    date: "Julho de 2024",
    description: "O azul profundo do Mediterrâneo contrastando com as casas coloridas debruçadas sobre as falésias.",
    image: costaAmalfitana
  },
  {
    id: "degustacao-porto",
    type: "photo",
    category: "Experiências",
    title: "Degustação de vinhos raros no Porto",
    location: "Vila Nova de Gaia, Portugal",
    date: "Março de 2025",
    description: "Uma visita privativa a uma das caves mais antigas do mundo, degustando safras históricas de Vinho do Porto.",
    image: portugalCompleto
  }
];

export const mockDestinations = [
  {
    id: "dest-toscana",
    title: "Toscana",
    country: "Itália",
    description: "Paisagens inesquecíveis, vilarejos medievais e vinhos que são verdadeiras obras de arte. A Toscana encanta todos os sentidos com sua simplicidade elegante.",
    image: heroTuscany,
    tags: ["Vinhos", "Cultura", "Gastronomia"],
    highlights: ["Degustações exclusivas", "Vilarejos medievais", "Paisagens icônicas"]
  },
  {
    id: "dest-sicilia",
    title: "Sicília",
    country: "Itália",
    description: "História milenar, templos gregos, praias deslumbrantes e uma culinária rica que mistura influências árabes, gregas e normandas.",
    image: siciliaDestination,
    tags: ["História", "Praias", "Culinária"],
    highlights: ["Teatro de Taormina", "Vale dos Templos", "Gastronomia siciliana"]
  },
  {
    id: "dest-lago-como",
    title: "Lago de Como",
    country: "Itália",
    description: "Charme, elegância e cenários cinematográficos cercados por montanhas majestosas e vilas com jardins deslumbrantes.",
    image: lagoDeComo,
    tags: ["Lagos", "Luxo", "Natureza"],
    highlights: ["Passeio de barco privativo", "Vila Carlotta e Monastero", "Jardins de Bellagio"]
  },
  {
    id: "dest-portugal",
    title: "Portugal e Aldeias",
    country: "Portugal",
    description: "Roteiros fascinantes por aldeias históricas de pedra, castelos medievais, tradições preservadas e o melhor da gastronomia lusitana.",
    image: portugalCompleto,
    tags: ["História", "Aldeias", "Tradição"],
    highlights: ["Óbidos medieval", "Degustação no Vale do Douro", "Aldeias de Xisto"]
  },
  {
    id: "dest-costa-amalfitana",
    title: "Costa Amalfitana",
    country: "Itália",
    description: "Estradas panorâmicas esculpidas nas rochas, vilas coloridas debruçadas sobre o mar azul e o aroma inconfundível de limões sicilianos.",
    image: costaAmalfitana,
    tags: ["Litoral", "Romântico", "Vistas"],
    highlights: ["Positano e Amalfi", "Passeio à Ilha de Capri", "Jardins de Ravello"]
  },
  {
    id: "dest-puglia",
    title: "Puglia",
    country: "Itália",
    description: "Os icônicos trulli de Alberobello, oliveiras milenares, praias de águas cristalinas e o ritmo relaxante e acolhedor do sul da Itália.",
    image: pugliaDestination,
    tags: ["Trulli", "Cultura", "Mar"],
    highlights: ["Alberobello", "Polignano a Mare", "Lecce barroca"]
  }
];
