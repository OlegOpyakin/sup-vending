import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Wrench, Cpu,
  X, Mail, Send, ArrowUp, Users, Palette,
  Anchor, Clock, Zap, Calendar, MapPin, Gauge, ShoppingBag, Leaf
} from 'lucide-react';

// ========================
//        TRANSLATIONS
// ========================
const translations = {
  en: {
    heroTitle: 'SUP Vending.',
    heroSubtitle: '24/7 autonomous SUP board rental. No staff. No waiting.',
    heroCta: 'Discover more',
    modalTitle: 'Discover more',
    modalDescription: 'Our team is ready to show you how SUP Vending can transform your waterfront business.',
    email: 'Email',
    telegram: 'Telegram',
    responseTime: 'We typically respond within a few hours.',
    close: 'Close',
    toggleTheme: 'Toggle theme',
    switchLanguage: 'Switch language (RU)',
    scrollToTop: 'Scroll to top and discover more',
    featuresTitle: 'How It Works',
    feature1Title: '1 Minute to Rent',
    feature1Desc: 'Scan QR code, unlock the board, and start paddling. No paperwork, no queues.',
    feature2Title: '24/7 Availability',
    feature2Desc: 'Rent a board early morning or late night — whenever you want to go.',
    feature3Title: 'Solar Powered',
    feature3Desc: 'Self-sufficient station with solar panels and ultra-low-power smart locks.',
    feature4Title: '10 Boards per Station',
    feature4Desc: 'Each station holds 10 SUP boards, ready for instant rental.',
    problemTitle: 'The Problem We Solve',
    problemDesc: 'Traditional SUP rentals take 3-5 minutes per customer with paperwork and live instruction. During peak hours, queues reach 15-20 minutes. Rentals work only 10-12 hours a day — you can\'t get a board early morning or late night.',
    problemStat1: '60% of people skip SUP rental because of long queues',
    problemStat2: '15-20 min waiting time during peak hours',
    problemStat3: 'Only 10-12 hours of operation per day',
    teamTitle: 'Built by MIPT Engineers.',
    teamCaption: 'The SUP Vending Team',
    ivanRole: 'Business Analysis & Programming',
    konstantinRole: 'Chief Engineer',
    antonRole: 'Marketing, Sales & Clients',
    alexanderRole: 'UX/UI Design',
    useCasesTitle: 'Where Water Meets Technology.',
    moscow: 'Moscow Water Areas',
    beach: 'Beach & Resorts',
    footer: '© 2026 SUP Vending',
    qrTitle: 'Join our Telegram channel',
    loadingWebsite: 'Loading website...',
  },
  ru: {
    heroTitle: 'SUP-вендинг.',
    heroSubtitle: 'Круглосуточная аренда SUP-бордов. Без персонала. Без очередей.',
    heroCta: 'Перейдём к делу?',
    modalTitle: 'Перейдём к делу?',
    modalDescription: 'Наша команда готова показать, как SUP-вендинг преобразит ваш водный бизнес.',
    email: 'Почта',
    telegram: 'Телеграм',
    responseTime: 'Обычно отвечаем в течение пары часов.',
    close: 'Закрыть',
    toggleTheme: 'Переключить тему',
    switchLanguage: 'Сменить язык (EN)',
    scrollToTop: 'Наверх и перейти к делу',
    featuresTitle: 'Как это работает',
    feature1Title: 'Аренда за 1 минуту',
    feature1Desc: 'Сканируйте QR-код, открывайте замок и плывите. Без бумаг и очередей.',
    feature2Title: 'Доступно 24/7',
    feature2Desc: 'Возьмите SUP рано утром или поздно вечером — когда вам удобно.',
    feature3Title: 'На солнечных батареях',
    feature3Desc: 'Автономная станция с солнечными панелями и сверхэкономичными замками.',
    feature4Title: '10 досок на станции',
    feature4Desc: 'Каждая станция вмещает 10 SUP-бордов, готовых к аренде в любой момент.',
    problemTitle: 'Проблема, которую мы решаем',
    problemDesc: 'Традиционная аренда SUP занимает 3-5 минут на клиента из-за бумажных договоров и живого инструктажа. В часы пик очереди достигают 15-20 минут. Прокаты работают всего 10-12 часов в день — нельзя взять доску рано утром или поздно вечером.',
    problemStat1: '60% людей отказываются от аренды SUP из-за долгих очередей',
    problemStat2: '15-20 мин ожидания в часы пик',
    problemStat3: 'Всего 10-12 часов работы в день',
    teamTitle: 'Создано инженерами МФТИ.',
    teamCaption: 'Команда SUP-вендинг',
    ivanRole: 'Бизнес-аналитика и разработка',
    konstantinRole: 'Главный инженер',
    antonRole: 'Маркетинг, продажи и клиенты',
    alexanderRole: 'Дизайн UX/UI',
    useCasesTitle: 'Где вода встречается с технологиями.',
    moscow: 'Акватории Москвы',
    beach: 'Пляжи и курорты',
    footer: '© 2026 SUP-вендинг',
    qrTitle: 'Присоединяйтесь к нашему Телеграм-каналу',
    loadingWebsite: 'Загрузка сайта...',
  },
};

// ========================
//        LANGUAGE HOOK
// ========================
const useLanguage = () => {
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  useEffect(() => {
    const stored = localStorage.getItem('lang') as 'en' | 'ru' | null;
    const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
    const initial = stored ?? browserLang;
    setLang(initial);
  }, []);
  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'ru' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  };
  const t = useCallback((key: keyof typeof translations['en']) => {
    return translations[lang]?.[key] ?? translations['en'][key] ?? key;
  }, [lang]);
  return { lang, toggleLanguage, t };
};

// ========================
//        THEME HOOK
// ========================
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (systemPrefers ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);
  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };
  return { theme, toggleTheme };
};

// ========================
//    CONTACT MODAL
// ========================
const ContactModal = ({
  isOpen,
  onClose,
  t,
  lang,
}: {
  isOpen: boolean;
  onClose: () => void;
  t: (key: keyof typeof translations['en']) => string;
  lang: 'en' | 'ru';
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
              aria-label={t('close')}
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="min-h-[4rem] mb-6">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={lang}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  {t('modalTitle')}
                </motion.h3>
              </AnimatePresence>
            </div>
            <div className="min-h-[4rem] mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lang + 'desc'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="text-gray-700 dark:text-gray-200"
                >
                  {t('modalDescription')}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="space-y-5">
              <a
                href="mailto:smartshadowofficial@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-900/70 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('email')}</div>
                  <div className="text-sm md:text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    smartshadowofficial@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://t.me/suntrasher"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-900/70 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('telegram')}</div>
                  <div className="text-sm md:text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    @suntrasher
                  </div>
                </div>
              </a>
            </div>

            <div className="min-h-[2rem] mt-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lang + 'resp'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  className="text-sm text-center text-gray-500 dark:text-gray-400"
                >
                  {t('responseTime')}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ========================
//  SCROLL TO TOP BUTTON
// ========================
const ScrollToTopButton = ({
  onOpenModal,
  t,
}: {
  onOpenModal: () => void;
  t: (key: keyof typeof translations['en']) => string;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollToTop = (duration: number) => {
    const start = window.scrollY;
    const startTime = performance.now();
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, start * (1 - ease));
      if (progress < 1) requestAnimationFrame(animateScroll);
    };
    requestAnimationFrame(animateScroll);
  };

  const handleClick = () => {
    smoothScrollToTop(800);
    setTimeout(() => onOpenModal(), 800);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="fixed top-6 left-6 z-40 flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-sm md:text-base font-medium shadow-lg shadow-blue-600/30 transition-all"
      aria-label={t('scrollToTop')}
    >
      <ArrowUp className="w-5 h-5" />
      {t('heroCta')}
    </motion.button>
  );
};

// ========================
//  SVG PADDLE (для прелоадера)
// ========================
const PaddleIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="50" y1="10" x2="50" y2="70" stroke="currentColor" />
    <ellipse cx="50" cy="82" rx="18" ry="12" stroke="currentColor" fill="currentColor" fillOpacity="0.2" />
    <line x1="40" y1="18" x2="60" y2="18" stroke="currentColor" />
  </svg>
);

// ========================
//      FEATURES SECTION (вместо Sticky)
// ========================
const FeaturesSection = ({
  t,
  lang,
}: {
  t: (key: keyof typeof translations['en']) => string;
  lang: 'en' | 'ru';
}) => {
  const features = [
    { icon: Clock, title: 'feature1Title', desc: 'feature1Desc' },
    { icon: Zap, title: 'feature2Title', desc: 'feature2Desc' },
    { icon: Leaf, title: 'feature3Title', desc: 'feature3Desc' },
    { icon: ShoppingBag, title: 'feature4Title', desc: 'feature4Desc' },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatePresence mode="wait">
            <motion.h2
              key={lang + 'features'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {t('featuresTitle')}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-black rounded-3xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                <feature.icon className="w-7 h-7" />
              </div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={lang + feature.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                >
                  {t(feature.title as keyof typeof translations['en'])}
                </motion.h3>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={lang + feature.desc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {t(feature.desc as keyof typeof translations['en'])}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================
//      PROBLEM SECTION
// ========================
const ProblemSection = ({
  t,
  lang,
}: {
  t: (key: keyof typeof translations['en']) => string;
  lang: 'en' | 'ru';
}) => {
  const stats = [
    { label: 'problemStat1', icon: '😤' },
    { label: 'problemStat2', icon: '⏱️' },
    { label: 'problemStat3', icon: '🕐' },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <AnimatePresence mode="wait">
            <motion.h2
              key={lang + 'problem'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            >
              {t('problemTitle')}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={lang + 'problemDesc'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto"
            >
              {t('problemDesc')}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 text-center border border-red-100 dark:border-red-900/30"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <AnimatePresence mode="wait">
                <p
                  key={lang + stat.label}
                  className="text-sm md:text-base font-medium text-gray-900 dark:text-white"
                >
                  {t(stat.label as keyof typeof translations['en'])}
                </p>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================
//      TEAM CARD
// ========================
const TeamCard = ({
  name,
  role,
  icon: Icon,
  lang,
  image,
}: {
  name: string;
  role: string;
  icon: React.ElementType;
  lang: 'en' | 'ru';
  image?: string;
}) => (
  <div className="h-full bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-medium mb-4 overflow-hidden">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        name.split(' ').map(n => n[0]).join('')
      )}
    </div>
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400 min-h-[3rem]">
      <Icon className="w-4 h-4 flex-shrink-0" />
      <AnimatePresence mode="wait">
        <motion.span
          key={lang + name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
);

// ========================
//         MAIN APP
// ========================
function App() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==========================================
  // PRELOADER LOGIC
  // ==========================================
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const maxTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsAppLoading(false), 800);
    }, 8000);

    if (heroLoaded) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setIsAppLoading(false), 500);
      }, 500);
      return () => {
        clearTimeout(timer);
        clearTimeout(maxTimeout);
      };
    }
    return () => clearTimeout(maxTimeout);
  }, [heroLoaded]);

  return (
    <div className="font-sans antialiased bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">

      {/* PRELOADER OVERLAY */}
      {isAppLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-black"
          style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <PaddleIcon className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p
                key={lang}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="text-base text-gray-500 dark:text-gray-400 font-medium tracking-wide"
              >
                {t('loadingWebsite')}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        t={t}
        lang={lang}
      />
      <ScrollToTopButton
        onOpenModal={() => setIsModalOpen(true)}
        t={t}
      />

      {/* Fixed controls */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
          aria-label={t('switchLanguage')}
        >
          {lang === 'en' ? 'RU' : 'EN'}
        </button>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
          aria-label={t('toggleTheme')}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/sup-hero.jpg"
            alt="SUP boarding"
            className="w-full h-full object-cover"
            onLoad={() => setHeroLoaded(true)}
            onError={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="min-h-[14rem] md:min-h-[18rem] mb-10">
            <AnimatePresence mode="wait">
              <motion.h1
                key={lang}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
              >
                {t('heroTitle')}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={lang + 'sub'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-xl md:text-2xl text-white/90"
              >
                {t('heroSubtitle')}
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium shadow-lg shadow-blue-600/30 transition-all"
          >
            {t('heroCta')}
          </motion.button>
        </div>
      </section>

      {/* PROBLEM SECTION — новый блок */}
      <ProblemSection t={t} lang={lang} />

      {/* FEATURES SECTION — вместо Sticky */}
      <FeaturesSection t={t} lang={lang} />

      {/* Team Section */}
      <section className="py-24 px-6 md:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 min-h-[5rem] md:min-h-[4rem]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={lang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {t('teamTitle')}
              </motion.h2>
            </AnimatePresence>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 max-w-5xl mx-auto mb-16">
            <img
              src="/images/team.jpeg"
              alt="SUP Vending Team"
              className="w-full h-auto block"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop';
              }}
            />
            <div className="absolute bottom-8 left-8 hidden sm:flex">
              <div className="px-6 py-3 rounded-full bg-black/70 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <span key={lang} className="text-white text-xl md:text-2xl font-medium">
                    {t('teamCaption')}
                  </span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamCard name="Ivan Turubar" role={t('ivanRole')} icon={Cpu} lang={lang} image="/images/team/Ivan.jpeg" />
            <TeamCard name="Konstantin Lishik" role={t('konstantinRole')} icon={Wrench} lang={lang} image="/images/team/Konstantin.jpeg" />
            <TeamCard name="Anton Goryainov" role={t('antonRole')} icon={Users} lang={lang} image="/images/team/Anton.JPG" />
            <TeamCard name="Alexander Petryaev" role={t('alexanderRole')} icon={Palette} lang={lang} image="/images/team/Alexander.jpg" />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 min-h-[5rem] md:min-h-[4rem]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={lang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {t('useCasesTitle')}
              </motion.h2>
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 group">
              <img
                src="/images/moscow-water.jpg"
                alt="Moscow water areas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-8">
                <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm min-h-[3rem] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={lang + 'moscow'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl font-semibold text-white"
                    >
                      {t('moscow')}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 group">
              <img
                src="/images/beach-sup.jpg"
                alt="Beach and resorts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-8">
                <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm min-h-[3rem] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={lang + 'beach'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl font-semibold text-white"
                    >
                      {t('beach')}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
            {t('qrTitle')}
          </h3>
          <img
            src="/images/t_me.jpg"
            alt="Telegram QR code"
            className="mx-auto w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=https://t.me/suntrasher';
            }}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <Anchor className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <AnimatePresence mode="wait">
              <span key={lang} className="text-gray-500 dark:text-gray-400">
                {t('footer')}
              </span>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-5 mt-4 md:mt-0">
            <img src="/images/FSI.png" alt="FSI emblem" className="h-20 w-auto object-contain" />
            <img src="/images/MIPT.png" alt="MIPT logo" className="h-20 w-auto object-contain" />
          </div>
          <a
            href="mailto:smartshadowofficial@gmail.com"
            className="mt-4 md:mt-0 text-blue-600 dark:text-blue-400 hover:underline"
          >
            smartshadowofficial@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;