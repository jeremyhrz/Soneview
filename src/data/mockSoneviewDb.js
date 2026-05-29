export const mockSoneviewDb = {
  categories: [
    { id: 'tv', name: 'Smart TVs', icon: 'Tv', image: '/images/tv-hero.png' },
    { id: 'audio', name: 'Audio Premium', icon: 'Speaker', image: '/images/audio-category.png' },
    { id: 'computing', name: 'Computing Pro', icon: 'Laptop', image: '/images/laptop-hero.png' },
    { id: 'air', name: 'Climatización', icon: 'Wind', image: '/images/ac-product.png' },
    { id: 'home', name: 'Línea Blanca', icon: 'Refrigerator', image: '/images/fridge-product.png' }
  ],
  products: [
    // SMART TVS (6 products)
    {
      id: 1,
      name: 'Smart TV 55" 4K QLED Pro',
      category: 'tv',
      image: '/images/img_tv_4k_55.png',
      badge: 'Flagship',
      description: 'Experimenta la cúspide de la tecnología visual con nuestro panel QLED Pro. Diseñado para ofrecer una precisión de color absoluta y negros profundos, este televisor es el centro de entretenimiento definitivo para el hogar moderno.',
      specs: ['Panel QLED 4K Ultra HD', 'Frecuencia de Actualización 120Hz', 'Procesador Quad-Core AI Crystal Vision', 'Soporte Dolby Vision IQ & Atmos', 'Sistema Operativo Android TV 11', '4 Puertos HDMI 2.1 (eARC)']
    },
    {
      id: 2,
      name: 'Smart TV 75" 8K Ultra Elite',
      category: 'tv',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200',
      badge: 'Elite',
      description: 'La máxima expresión del detalle. Con una resolución 8K nativa y tecnología Mini LED, el modelo Ultra Elite redefine lo que es posible en una pantalla de gran formato.',
      specs: ['Resolución 8K Nativa (7680 x 4320)', 'Tecnología Quantum Mini LED', 'Brillo Pico 2000 nits', 'Object Tracking Sound+ (OTS+)', 'Diseño Infinity Screen sin bordes', 'WiFi 6E Integrado']
    },
    {
      id: 3,
      name: 'Smart TV 65" 4K Crystal View',
      category: 'tv',
      image: 'https://images.unsplash.com/photo-1461151351821-79734979f831?auto=format&fit=crop&q=80&w=800',
      description: 'Una ventana a la realidad. El Crystal View ofrece imágenes nítidas y vibrantes con un procesamiento de imagen optimizado para streaming en 4K.',
      specs: ['Panel LED 4K HDR', 'Tecnología Dynamic Crystal Color', 'HDR10+ Adaptativo', 'Google Assistant & Alexa integrados', '3 Puertos HDMI 2.0', 'Diseño AirSlim']
    },
    {
      id: 4,
      name: 'Smart TV 50" 4K Slim Frame',
      category: 'tv',
      image: 'https://images.unsplash.com/photo-1552282374-c97162836695?auto=format&fit=crop&q=80&w=800',
      badge: 'Oferta',
      description: 'Elegancia y rendimiento en un diseño ultradelgado. Perfecto para cualquier espacio, ofreciendo una experiencia cinematográfica sin distracciones.',
      specs: ['4K Ultra HD Resolución', 'Procesador Crystal 4K', 'Modo Juego Automático (ALLM)', 'Sonido Dolby Digital Plus', 'ThinQ AI Dashboard', 'Marco Minimalista']
    },
    {
      id: 5,
      name: 'Smart TV 43" Full HD Neo',
      category: 'tv',
      image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=800',
      description: 'Compacto pero potente. El modelo Neo lleva la inteligencia de Soneview a un formato versátil con una calidad de imagen Full HD excepcional.',
      specs: ['Resolución Full HD 1080p', 'Micro Dimming Pro', 'Smart Hub con apps precargadas', 'PurColor para tonos naturales', '2 Puertos HDMI', 'Eficiencia Energética Clase A']
    },
    {
      id: 6,
      name: 'Smart TV 32" HD Compact',
      category: 'tv',
      image: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?auto=format&fit=crop&q=80&w=800',
      description: 'La solución inteligente para espacios reducidos. Disfruta de tus apps favoritas con una interfaz fluida y una conectividad completa.',
      specs: ['Resolución HD Ready', 'Sintonizador Digital ISDB-T', 'Conexión WiFi Direct', 'Reproductor Multimedia USB', 'Salida de Audio Óptica', 'Vesa Mount Ready']
    },

    // COMPUTING PRO (6 products)
    {
      id: 7,
      name: 'Nitro Book Pro i9 Ultra',
      category: 'computing',
      image: '/images/laptop-hero.png',
      badge: 'Nuevo',
      description: 'La estación de trabajo definitiva para profesionales y creadores. Con el procesador i9 de última generación, no hay tarea que se resista.',
      specs: ['Intel Core i9-13900H (14 núcleos)', '32GB RAM DDR5 5200MHz', '1TB SSD NVMe Gen4', 'NVIDIA RTX 4070 8GB GDDR6', 'Pantalla 16" 2.5K 165Hz IPS', 'Teclado Retroiluminado RGB']
    },
    {
      id: 8,
      name: 'Soneview N-Series Silver',
      category: 'computing',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
      badge: 'Best Seller',
      description: 'Productividad sin límites en un diseño ligero y elegante. La N-Series es la compañera ideal para el trabajo híbrido y el estudio.',
      specs: ['AMD Ryzen 7 5700U', '16GB RAM LPDDR4x', '512GB SSD NVMe', 'Pantalla 14" Full HD Antirreflejante', 'Lector de Huellas Dactilares', 'Batería de hasta 12 horas']
    },
    {
      id: 9,
      name: 'Monitor Gamer 34" Curved',
      category: 'computing',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
      badge: 'Pro',
      description: 'Sumérgete en la acción con una curvatura envolvente de 1500R. Diseñado para ofrecer una ventaja competitiva en cada partida.',
      specs: ['Resolución WQHD (3440 x 1440)', 'Tasa de Refresco 144Hz', 'Tiempo de Respuesta 1ms (MPRT)', 'Curvatura 1500R Inmersiva', '99% sRGB Color Gamut', 'AMD FreeSync Premium']
    },
    {
      id: 10,
      name: 'Soneview Workstation Mini',
      category: 'computing',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800',
      description: 'Potencia concentrada. Ideal para oficinas modernas que buscan alto rendimiento en el mínimo espacio posible.',
      specs: ['Intel Core i7-12700T', '16GB RAM DDR4', '512GB SSD + Slot HDD 2.5"', 'Gráficos Intel UHD 770', 'Conectividad Dual LAN & WiFi 6', 'Soporte Vesa incluido']
    },
    {
      id: 11,
      name: 'Mechanical Keyboard RGB',
      category: 'computing',
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
      description: 'Precisión táctil y durabilidad extrema. Cada tecla está diseñada para soportar millones de pulsaciones con una respuesta instantánea.',
      specs: ['Switches Mecánicos Azules (Táctiles)', 'Iluminación RGB por tecla', 'Estructura de Aluminio Aeroespacial', 'Keycaps de PBT Doble Inyección', 'Cable USB-C Desmontable', 'Full Anti-Ghosting']
    },
    {
      id: 12,
      name: 'Pro Mouse Wireless 25K',
      category: 'computing',
      image: 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&q=80&w=800',
      description: 'Libertad de movimiento con precisión de grado profesional. Sensor de alta resolución para un seguimiento píxel a píxel.',
      specs: ['Sensor Óptico 25,600 DPI', 'Tecnología Inalámbrica Pro-Connect', 'Peso Ultraligero (63g)', '6 Botones Programables', 'Pies de PTFE de baja fricción', 'Autonomía de 80 horas']
    },

    // CLIMATIZACIÓN (6 products)
    {
      id: 13,
      name: 'Split Inverter 24000 BTU Pro',
      category: 'air',
      image: '/images/ac-product.png',
      badge: 'Nuevo',
      description: 'El máximo confort climático para espacios amplios. Nuestra tecnología Inverter Gold optimiza el consumo energético manteniendo la temperatura ideal.',
      specs: ['Tecnología Inverter Gold (Ahorro 70%)', 'Capacidad 24,000 BTU / 2 Toneladas', 'Gas Ecológico R410A', 'Esterilización UV Integrada', 'Control por WiFi (App Soneview Home)', 'Filtro de Alta Densidad Silver Ion']
    },
    {
      id: 14,
      name: 'Split Inverter 12000 BTU Neo',
      category: 'air',
      image: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=800',
      description: 'Silencioso y eficiente. Diseñado para dormitorios y oficinas, el modelo Neo ofrece un enfriamiento rápido sin ruidos molestos.',
      specs: ['Compresor Inverter de Alta Eficiencia', 'Capacidad 12,000 BTU', 'Función "I Feel" (Sensor Remoto)', 'Autolimpieza i-Clean', 'Display LED Oculto', 'Modo Sueño Inteligente']
    },
    {
      id: 15,
      name: 'Portable AC 9000 BTU',
      category: 'air',
      image: 'https://images.unsplash.com/photo-1585338927000-1c787b17eb5e?auto=format&fit=crop&q=80&w=800',
      description: 'Frescura donde la necesites. Fácil de instalar y mover, ideal para espacios donde no es posible una instalación fija.',
      specs: ['Funcionalidad 3-en-1 (Frío/Ventilador/Deshum)', 'Capacidad 9,000 BTU', 'Kit de Ventana incluido', 'Control Remoto LCD', 'Temporizador 24 horas', 'Ruedas Omnidireccionales']
    },
    {
      id: 16,
      name: 'Window AC 5000 BTU Digital',
      category: 'air',
      image: 'https://images.unsplash.com/photo-1631548210082-65825310619a?auto=format&fit=crop&q=80&w=800',
      description: 'La solución clásica modernizada. Compacto, potente y con controles digitales precisos para un manejo sencillo.',
      specs: ['Control Digital con Pantalla', 'Chasis Corredizo para fácil montaje', 'Filtro de Aire Lavable', 'Reinicio Automático tras corte eléctrico', '3 Velocidades de Ventilación', 'Rejillas Direccionales de 4 vías']
    },
    {
      id: 17,
      name: 'Smart Air Purifier HEPA',
      category: 'air',
      image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=800',
      badge: 'Popular',
      description: 'Respira aire puro en tu hogar. Sistema de filtrado multietapa que elimina el 99.97% de las partículas contaminantes.',
      specs: ['Filtro HEPA H13 de Grado Médico', 'Sensor de Calidad de Aire PM2.5', 'CADR 260 m³/h', 'Indicador de Cambio de Filtro', 'Compatible con Alexa & Google Home', 'Modo Ultra-Silencioso para Dormir']
    },
    {
      id: 18,
      name: 'Industrial Fan 20" Pro',
      category: 'air',
      image: 'https://images.unsplash.com/photo-1591110055100-33758b9195d8?auto=format&fit=crop&q=80&w=800',
      description: 'Potencia de aire para entornos exigentes. Construcción robusta en metal para una larga vida útil en talleres o áreas grandes.',
      specs: ['Motor de Alta Velocidad 150W', 'Aspas de Aluminio Balanceadas', 'Estructura de Acero Reforzado', '3 Ajustes de Velocidad', 'Inclinación Ajustable 180°', 'Certificación de Seguridad Industrial']
    },

    // AUDIO PREMIUM (6 products)
    {
      id: 19,
      name: 'X-Blast Tower 1000W',
      category: 'audio',
      image: '/images/audio-category.png',
      badge: 'Flagship',
      description: 'La potencia hecha sonido. Con bajos que se sienten y una claridad cristalina, la X-Blast es el alma de cualquier evento.',
      specs: ['Potencia Pico 1000W PMPO', 'Doble Subwoofer de 10"', 'Sistema de Luces RGB Audiorítmicas', 'Entrada para Micrófono & Guitarra', 'Función TWS (Conecta 2 torres)', 'Reproductor USB, SD & Bluetooth 5.2']
    },
    {
      id: 20,
      name: 'Soundbar 5.1 Cinema Pro',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
      badge: 'Best Seller',
      description: 'Transforma tu sala en una sala de cine. Audio envolvente real con subwoofer inalámbrico para una experiencia inmersiva.',
      specs: ['Sonido Envolvente Real 5.1 Canales', 'Subwoofer Inalámbrico Activo', 'Soporte Dolby Atmos & DTS:X', 'Conexión HDMI ARC / Óptica / Coaxial', 'Ecualizador Digital Preestablecido', 'Montaje de Pared incluido']
    },
    {
      id: 21,
      name: 'ANC Headphones Zenith',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      description: 'Aíslate del mundo y sumérgete en tu música. Cancelación activa de ruido líder en su clase para un audio sin distracciones.',
      specs: ['Cancelación Activa de Ruido Híbrida', 'Drivers de Neodimio de 40mm', 'Autonomía de 50 Horas (ANC off)', 'Carga Rápida (10m = 5h de música)', 'Micrófonos Duales para llamadas nítidas', 'Diseño Plegable Premium']
    },
    {
      id: 22,
      name: 'Bluetooth Speaker Rugged',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
      description: 'Diseñado para la aventura. Resistente al agua, al polvo y a los golpes, este parlante te acompaña en cualquier terreno.',
      specs: ['Certificación IPX7 (Sumergible)', 'Radiadores Pasivos para Bajos Intensos', 'Batería de 20 Horas de duración', 'Exterior Siliconado Anti-Choque', 'Micrófono Integrado para manos libres', 'Soporte para Asistentes de Voz']
    },
    {
      id: 23,
      name: 'Studio Monitors 4" Pair',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=800',
      description: 'Fidelidad sonora para productores y audiófilos. Respuesta de frecuencia plana para una mezcla y escucha crítica precisa.',
      specs: ['Diseño Bi-Amplificado de 60W RMS', 'Woofers de Kevlar Tejido de 4"', 'Tweeters de Cúpula de Seda de 1"', 'Entradas Balanceadas TRS & RCA', 'Ajuste de Sala Acústica', 'Blindaje Magnético']
    },
    {
      id: 24,
      name: 'TWS Earbuds Pro Crystal',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
      description: 'Audio premium en un formato minúsculo. El diseño Crystal destaca por su estética futurista y su sonido balanceado.',
      specs: ['Estuche de Carga Transparente', 'Modo de Baja Latencia para Juegos', 'Cancelación de Ruido Ambiental (ENC)', 'Carga Inalámbrica Qi compatible', 'Certificación IPX5 resistente al sudor', 'Controles Táctiles Inteligentes']
    },

    // LÍNEA BLANCA (6 products)
    {
      id: 25,
      name: 'French Door Refrigerator 22p³',
      category: 'home',
      image: '/images/fridge-product.png',
      badge: 'Elite',
      description: 'La joya de la cocina. Espacio optimizado, conservación avanzada de alimentos y un diseño en acero inoxidable que cautiva.',
      specs: ['Sistema Total No Frost Multi Air Flow', 'Compresor Inverter con 10 años de garantía', 'Iluminación LED Panorámica', 'Dispensador de Agua & Hielo Interno', 'Cajones con Control de Humedad', 'Filtro Desodorizante Fresh Air']
    },
    {
      id: 26,
      name: 'Front Load Washer 18kg Pro',
      category: 'home',
      image: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=800',
      badge: 'Nuevo',
      description: 'Cuidado profesional para tus prendas. El lavado a vapor elimina alérgenos y arrugas, ahorrando tiempo y energía.',
      specs: ['Motor Inverter Direct Drive', 'Tecnología de Lavado a Vapor (Steam)', '14 Programas de Lavado Inteligentes', 'Panel de Control Táctil Digital', 'Sensor de Carga Automático', 'Diagnóstico Inteligente por Smartphone']
    },
    {
      id: 27,
      name: 'Gas Range 5 Burners Inox',
      category: 'home',
      image: '/images/stove-product.png',
      description: 'Potencia culinaria en tu hogar. Cinco quemadores de diferentes tamaños para cocinar múltiples platillos con precisión profesional.',
      specs: ['Estructura Completa en Acero Inoxidable', 'Quemador Triple Flama de alta potencia', 'Parrillas de Hierro Fundido', 'Horno de Gran Capacidad con Luz', 'Encendido Eléctrico en perillas', 'Válvula de Seguridad en Horno']
    },
    {
      id: 28,
      name: 'Microwave 32L Grill',
      category: 'home',
      image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=800',
      description: 'Más que un microondas. Con función de Grill integrada, permite dorar y gratinar tus comidas con resultados perfectos.',
      specs: ['Potencia Microondas 1000W / Grill 1100W', 'Interior con Recubrimiento Cerámico', 'Tecnología Inverter de Cocción', '10 Niveles de Potencia', 'Menú de Cocción Automática', 'Función de Descongelado por Peso']
    },
    {
      id: 29,
      name: 'Dishwasher 14 Place Settings',
      category: 'home',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      description: 'Eficiencia y limpieza absoluta. Olvida el lavado a mano con un sistema que cuida tu vajilla y el medio ambiente.',
      specs: ['Capacidad para 14 Servicios', 'Tecnología QuadWash de 4 brazos', 'Funcionamiento Ultra-Silencioso 44dB', 'Tercera Bandeja para Cubiertos', 'Secado por Condensación Eficiente', 'Conectividad WiFi SmartThinQ']
    },
    {
      id: 30,
      name: 'Electric Oven Build-in 70L',
      category: 'home',
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800',
      description: 'El aliado perfecto para la repostería y asados. Empotrable y con múltiples funciones de calor para resultados uniformes.',
      specs: ['Sistema de Convección Forzada', 'Capacidad XXL de 70 Litros', 'Panel de Vidrio Templado Triple Capa', '10 Funciones de Cocción Programadas', 'Esmalte EasyClean Anti-Adherente', 'Temporizador Digital con Apagado Auto']
    }
  ],
  heroSlides: [
    {
      id: 1,
      title: 'Soneview Smart TV QLED',
      subtitle: 'El pináculo del realismo visual. Panel QLED Pro con negros profundos y colores infinitos.',
      image: '/images/img_tv_4k_55.png',
      cta: 'Ver Flagship',
      category: 'tv'
    },
    {
      id: 2,
      title: 'Nitro Book Pro Ultra',
      subtitle: 'Diseñada para los que no aceptan límites. Potencia bruta en un diseño ultra-premium.',
      image: '/images/laptop-hero.png',
      cta: 'Explorar Laptops',
      category: 'computing'
    }
  ]
};
