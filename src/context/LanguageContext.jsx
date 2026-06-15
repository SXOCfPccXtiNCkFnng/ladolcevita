import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  pt: {
    // Navbar / Tabs
    'nav.home': 'Home',
    'nav.destinos': 'Destinos',
    'nav.sobre-nos': 'Sobre Nós',
    'nav.proximas-viagens': 'Próximas Viagens',
    'nav.nossos-momentos': 'Nossos Momentos',
    'nav.contato': 'Contato',
    'nav.cta': 'Falar com Especialista',
    
    // Footer
    'footer.branding': 'Criamos viagens inesquecíveis com atenção a cada detalhe para você aproveitar o melhor de cada destino de forma autêntica e luxuosa.',
    'footer.partner': 'Operado em parceria com a',
    'footer.title': 'Fale Conosco',
    'footer.whatsapp': 'Fale no WhatsApp',
    'footer.hours': 'Seg - Sex: 09h às 18h',
    'footer.copyright': 'Todos os direitos reservados.',
    'footer.developer': 'Desenvolvido por',
    
    // General / Buttons
    'btn.plan': 'Planejar Minha Viagem',
    'btn.allDestinations': 'Ver todos os destinos',
    'btn.aboutUs': 'Saiba mais sobre nós',
    'btn.talkExpert': 'Falar com um especialista',
    'btn.requestItinerary': 'Solicitar Roteiro',
    'btn.send': 'Enviar Solicitação',
    
    // Cookie Consent
    'cookie.text': 'Utilizamos cookies para garantir a melhor experiência em nosso site.',
    'cookie.accept': 'Aceitar cookies',
    'cookie.privacy': 'Políticas de Privacidade'
  },
  en: {
    // Navbar / Tabs
    'nav.home': 'Home',
    'nav.destinos': 'Destinations',
    'nav.sobre-nos': 'About Us',
    'nav.proximas-viagens': 'Upcoming Trips',
    'nav.nossos-momentos': 'Our Moments',
    'nav.contato': 'Contact',
    'nav.cta': 'Talk to an Expert',
    
    // Footer
    'footer.branding': 'We create unforgettable journeys with attention to every detail, allowing you to enjoy the best of each destination in an authentic and luxurious way.',
    'footer.partner': 'Operated in partnership with',
    'footer.title': 'Contact Us',
    'footer.whatsapp': 'Chat on WhatsApp',
    'footer.hours': 'Mon - Fri: 9am to 6pm',
    'footer.copyright': 'All rights reserved.',
    'footer.developer': 'Developed by',
    
    // General / Buttons
    'btn.plan': 'Plan My Trip',
    'btn.allDestinations': 'View all destinations',
    'btn.aboutUs': 'Learn more about us',
    'btn.talkExpert': 'Talk to an expert',
    'btn.requestItinerary': 'Request Itinerary',
    'btn.send': 'Send Inquiry',
    
    // Cookie Consent
    'cookie.text': 'We use cookies to ensure you get the best experience on our website.',
    'cookie.accept': 'Accept cookies',
    'cookie.privacy': 'Privacy Policy',

    // Dynamic Destinations/Trips
    "Toscana": "Tuscany",
    "Itália": "Italy",
    "Itália | Toscana": "Italy | Tuscany",
    "Costa Amalfitana": "Amalfi Coast",
    "Norte da Itália | Como": "Northern Italy | Como",
    "Portugal e suas Aldeias": "Portugal and its Villages",
    "Portugal e Aldeias": "Portugal and Villages",
    "8 Dias": "8 Days",
    "9 Dias": "9 Days",
    "6 Dias": "6 Days",
    "10 Dias": "10 Days",
    "7 Dias": "7 Days",
    "São Paulo/SP": "São Paulo, Brazil",
    "Piraju/SP": "Piraju, Brazil",
    "Rio de Janeiro/RJ": "Rio de Janeiro, Brazil",
    "Setembro de 2026": "September 2026",
    "Outubro de 2026": "October 2026",
    "Março de 2027": "March 2027",
    "Julho de 2026": "July 2026",
    "Junho de 2026": "June 2026",
    "Ativo": "Active",
    "Vagas Limitadas": "Limited Spots",
    "Esgotado": "Sold Out",
    "Vinhos": "Wines",
    "Cultura": "Culture",
    "Exclusivo": "Exclusive",
    "Gastronomia": "Gastronomy",
    "Litoral": "Coastal",
    "Lagos": "Lakes",
    "Luxo": "Luxury",
    "Moda": "Fashion",
    "Grupo": "Group",
    "História": "History",
    "Romântico": "Romantic",
    "Barco": "Boating",
    "Praias": "Beaches",
    "Culinária": "Cuisine",
    "Natureza": "Nature",
    "Aldeias": "Villages",
    "Tradição": "Tradition",
    "Vistas": "Views",
    "Trulli": "Trulli",
    "Mar": "Sea",
    
    // Highlights
    "Degustações exclusivas": "Exclusive tastings",
    "Vilarejos medievais": "Medieval villages",
    "Paisagens icônicas": "Iconic landscapes",
    "Teatro de Taormina": "Taormina Theatre",
    "Vale dos Templos": "Valley of the Temples",
    "Gastronomia siciliana": "Sicilian gastronomy",
    "Passeio de barco privativo": "Private boat ride",
    "Vila Carlotta e Monastero": "Villa Carlotta & Monastero",
    "Jardins de Bellagio": "Bellagio Gardens",
    "Óbidos medieval": "Medieval Óbidos",
    "Degustação no Vale do Douro": "Douro Valley tasting",
    "Aldeias de Xisto": "Schist Villages",
    "Positano e Amalfi": "Positano & Amalfi",
    "Passeio à Ilha de Capri": "Trip to Capri Island",
    "Jardins de Ravello": "Ravello Gardens",
    "Alberobello": "Alberobello",
    "Polignano a Mare": "Polignano a Mare",
    "Lecce barroca": "Baroque Lecce",
    
    // Dynamic Descriptions
    "Paisagens inesquecíveis, vilarejos medievais e vinhos que são verdadeiras obras de arte.": "Unforgettable landscapes, medieval villages, and wines that are true masterpieces.",
    "História milenar, praias deslumbrantes e uma culinária que conquista à primeira garfada.": "Millennial history, stunning beaches, and cuisine that wins you over at the first bite.",
    "Charme, elegância e cenários de tirar o fôlego nas margens do lago mais famoso da Itália.": "Charm, elegance, and breathtaking scenery on the shores of Italy's most famous lake.",
    "Roteiros encantadores por aldeias históricas, tradições e sabores autênticos.": "Charming itineraries through historic villages, traditions, and authentic flavors.",
    "Estradas panorâmicas, vilas coloridas e o azul intenso do mar Mediterrâneo.": "Scenic roads, colorful villages, and the deep blue of the Mediterranean Sea.",
    "Trulli, campos de oliveiras e o ritmo tranquilo do sul da Itália.": "Trulli, olive groves, and the peaceful rhythm of Southern Italy.",
    
    "Paisagens inesquecíveis, vilarejos medievais e vinhos que são verdadeiras obras de arte. A Toscana encanta todos os sentidos com sua simplicidade elegante.": "Unforgettable landscapes, medieval villages, and wines that are true masterpieces. Tuscany charms all senses with its elegant simplicity.",
    "História milenar, templos gregos, praias deslumbrantes e uma culinária rica que mistura influências árabes, gregas e normandas.": "Ancient history, Greek temples, stunning beaches, and a rich cuisine blending Arabic, Greek, and Norman influences.",
    "Charme, elegância e cenários cinematográficos cercados por montanhas majestosas e vilas com jardins deslumbrantes.": "Charm, elegance, and cinematic settings surrounded by majestic mountains and villas with gorgeous gardens.",
    "Roteiros fascinantes por aldeias históricas de pedra, castelos medievais, tradições preservadas e o melhor da gastronomia lusitana.": "Fascinating itineraries through historic stone villages, medieval castles, preserved traditions, and the best of Portuguese gastronomy.",
    "Estradas panorâmicas esculpidas nas rochas, vilas coloridas debruçadas sobre o mar azul e o aroma inconfundível de limões sicilianos.": "Panoramic roads carved into the rocks, colorful villages perched over the blue sea, and the unmistakable scent of Sicilian lemons.",
    "Os icônicos trulli de Alberobello, oliveiras milenares, praias de águas cristalinas e o ritmo relaxante e acolhedor do sul da Itália.": "The iconic trulli of Alberobello, ancient olive trees, crystal clear beaches, and the relaxing and welcoming rhythm of Southern Italy.",

    // Testimonials
    "A viagem para a Toscana foi simplesmente inesquecível! Tudo foi planejado com muito carinho e cuidado, desde a hospedagem na vila histórica até as degustações exclusivas. Voltei encantada!": "The trip to Tuscany was simply unforgettable! Everything was planned with so much love and care, from the accommodation in the historic villa to the exclusive tastings. I came back enchanted!",
    "Atendimento impecável e experiências que fugiram do óbvio. Viajar com a La Dolce Vita nos deu a segurança de um grupo com a exclusividade de um roteiro personalizado. Recomendamos fortemente!": "Impeccable service and off-the-beaten-path experiences. Traveling with La Dolce Vita gave us the safety of a group with the exclusivity of a custom itinerary. Highly recommended!",
    "Cada detalhe foi pensado com muito carinho. Os guias locais eram extremamente cultos e prestativos. Foi a melhor experiência de viagem que já tive na Europa. Com certeza farei outras!": "Every detail was thought of with a lot of love. The local guides were extremely knowledgeable and helpful. It was the best travel experience I've had in Europe. I will certainly do others!",
    "A curadoria dos restaurantes e o acesso exclusivo a vinícolas familiares que não recebem grandes grupos foi o ponto alto. Viajar dessa forma é inigualável.": "The curation of restaurants and exclusive access to family wineries that don't receive large groups was the highlight. Traveling this way is incomparable.",
    "Excelente atendimento do início ao fim. O suporte online em português nos ajudou a mudar uma reserva de passeio na última hora sem qualquer estresse.": "Excellent service from start to finish. Our online support helped us change a tour reservation at the last minute without any stress.",
    "Hospedar-se no Lago de Como com a vista deslumbrante que nos arranjaram foi um sonho. Todo o luxo e cuidado prometidos foram entregues. Voltaremos com certeza!": "Staying in Lake Como with the gorgeous view they arranged for us was a dream. All the luxury and care promised were delivered. We will definitely be back!",

    // Moments / Gallery
    "Brinde ao pôr do sol na Toscana": "Sunset Toast in Tuscany",
    "Um fim de tarde mágico regado a Brunello di Montalcino, risadas espontâneas e o horizonte dourado da Toscana.": "A magical late afternoon filled with Brunello di Montalcino, spontaneous laughter, and the golden horizon of Tuscany.",
    "Passeio de Riva no Lago de Como": "Riva Boat Tour in Lake Como",
    "Navegando em um clássico barco italiano de madeira pelas águas calmas do Lago de Como, admirando as vilas históricas.": "Sailing on a classic wooden Italian boat across the calm waters of Lake Como, admiring historic villas.",
    "Jantar sob as estrelas em Évora": "Dinner Under the Stars in Évora",
    "Uma mesa compartilhada em uma vinícola histórica alentejana. Gastronomia autêntica e conversas que duraram até a madrugada.": "A shared table at a historic Alentejo winery. Authentic gastronomy and conversations that lasted until dawn.",
    "Descobrindo os Trulli de Alberobello": "Discovering the Trulli of Alberobello",
    "Caminhando pelas ruelas brancas com telhados cônicos de pedra, desvendando as lendas locais com nosso guia privativo.": "Strolling through white alleys with conical stone roofs, uncovering local legends with our private guide.",
    "Nosso elétrico privativo em Lisboa": "Our Private Tram in Lisbon",
    "Reservamos um elétrico histórico exclusivo para o nosso grupo cruzar as ladeiras de Alfama regado a fado e vinho verde.": "We reserved an exclusive historic tram for our group to traverse the slopes of Alfama with fado and green wine.",
    "Vindima e colheita em vinhedo secular": "Harvest and Grape Stomping in a Century-Old Vineyard",
    "Nossos viajantes colocando a mão na massa na colheita e aprendendo as técnicas tradicionais dos produtores locais.": "Our travelers getting hands-on with the grape harvest and learning traditional techniques from local producers.",
    "Vista panorâmica da Costa de Positano": "Panoramic View of the Positano Coast",
    "O azul profundo do Mediterrâneo contrastando com as casas coloridas debruçadas sobre as falésias.": "The deep blue of the Mediterranean contrasting with the colorful houses perched on the cliffs.",
    "Degustação de vinhos raros no Porto": "Rare Wine Tasting in Porto",
    "Uma visita privativa a uma das caves mais antigas do mundo, degustando safras históricas de Vinho do Porto.": "A private visit to one of the oldest wine cellars in the world, tasting historic vintages of Port Wine."
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('site_lang');
    if (saved === 'pt' || saved === 'en') return saved;
    
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('pt') ? 'pt' : 'en';
  });

  const setLanguage = (lang) => {
    if (lang === 'pt' || lang === 'en') {
      setLanguageState(lang);
      localStorage.setItem('site_lang', lang);
    }
  };

  // Translation function: supports both key lookup and inline pt/en values
  const t = (keyOrPt, enVal) => {
    if (enVal !== undefined) {
      return language === 'pt' ? keyOrPt : enVal;
    }
    
    if (translations[language] && translations[language][keyOrPt] !== undefined) {
      return translations[language][keyOrPt];
    }
    
    return keyOrPt;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  }
  return context;
}
