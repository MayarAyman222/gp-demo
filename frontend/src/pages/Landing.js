import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../context/AppContext";

const Landing = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  const { theme, setTheme, language, setLanguage } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Multi-language text
  const texts = {
    en: {
      home: "Home",
      features: "Features",
      how: "How it Works",
      users: "Users",
      about: "About",
      settings: "Settings",
      logout: "Logout",
      welcome: "Welcome",
      heroTitle: "Communication For Everyone.",
      heroDesc:
        "Voxi helps individuals with communication challenges such as Alzheimer’s, stroke, autism, or speech difficulties express their thoughts clearly and confidently.",
      startBtn: "Start with Voxi →",
      featuresTitle: "Features",
      feature1: { title: "Easy Communication", 
        desc: "Express needs and feelings through intuitive visual icons.",
      img: "/images/communication.jpg", },
      feature2: { title: "Large Icon Library",
         desc: "Hundreds of categorized icons for daily life communication.",
        img: "/images/R.jpg", },
      feature3: { title: "Fast & Simple",
         desc: "Clean interface designed for seniors and kids.",
        img: "/images/OIP.jpg", },
      usersTitle: "Who Can Use Voxi?",
      usersList: [
        {
          img: "/images/autism.jpg",
          title: "Children with Special Needs",
          desc: "For children with autism, intellectual disability, Down syndrome, hearing impairment, visual supports ease language development and help learning life skills."
        },
        {
          img: "/images/cerebral palsy.jpg",
          title: "Children & Adults with Severe Physical Difficulties",
          desc: "For people with cerebral palsy, head trauma, or stroke, symbols become an alternative communication system to express needs, emotions, and ideas."
        },
        {
          img: "/images/Elderly.jpg",
          title: "Elderly People",
          desc: "Cognitive impairments from aphasia, Alzheimer, dementia, or psychiatric diseases can require augmentative or alternative communication systems."
        },
        {
          img: "/images/emergency.jpg",
          title: "Emergency or Sanitary Situations",
          desc: "When patients are intubated, in shock, or can't speak, symbols allow communication with doctors for needs, feelings, and informed consent."
        },
        {
          img: "/images/Learning.jpg",
          title: "Children Beginning to Read",
          desc: "Symbols help children decode written text, understand words, and support reading development. Symbols should be accompanied by text."
        },
        {
          img: "/images/beginning to read.jpg",
          title: "Learning a Second Language",
          desc: "Visual supports help native and non-native speakers understand text and communicate during early stages of learning a new language."
        },
        {
          img: "/images/Tourist .jpg",
          title: "Tourists & Visitors",
          desc: "Symbols facilitate access to culture, shops, restaurants, and administrative procedures for temporary residents or travelers."
        },
        {
          img: "/images/everyone.jpg",
          title: "For Everyone",
          desc: "Visual aids help anyone navigate unknown places, communicate easily, and adapt to a visual world familiar to all."
        }
      ],
      aboutTitle: "About Voxi",
      aboutDesc1: "Voxi is built to make communication smooth, accessible, and human-centered. Our app provides ready-to-use visual icons and phrases that simplify daily interactions.",
      aboutDesc2: "Whether it's emotions, needs, or everyday activities—Voxi helps bridge the communication gap.",
      footer: "© 2025 Voxi — Communication For Everyone",
    },
    ar: {
      home: "الرئيسية",
      features: "الميزات",
      how: "كيف تعمل",
      users: "المستخدمون",
      about: "من نحن",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      welcome: "مرحبا",
      heroTitle: "التواصل للجميع.",
      heroDesc: "فوكسى يساعد الأفراد الذين يواجهون صعوبات في التواصل مثل الزهايمر، السكتة الدماغية، التوحد، أو صعوبات النطق على التعبير عن أفكارهم بوضوح وثقة.",
      startBtn: "ابدأ مع فوكسى →",
      featuresTitle: "الميزات",
      feature1: { title: "تواصل سهل", 
        desc: "عبّر عن احتياجاتك ومشاعرك باستخدام رموز بصرية بديهية." ,
        img:"/images/communication.jpg",},
      feature2: { title: "مكتبة أيقونات كبيرة",
         desc: "مئات الأيقونات المصنفة للتواصل اليومي.",
        img:"/images/R.jpg", },
      feature3: { title: "سريع وبسيط", 
        desc: "واجهة نظيفة مصممة لكبار السن والأطفال.",
      img:"/images/OIP.jpg", },
      usersTitle: "من يمكنه استخدام فوكسى؟",
      usersList: [
        {
          img: "/images/autism.jpg",
          title: "الأطفال ذوي الاحتياجات الخاصة",
          desc: "لدى الأطفال المصابين بالتوحد أو الإعاقة الذهنية أو متلازمة داون أو ضعف السمع، تساعد الدعامات البصرية على تطوير اللغة ومهارات الحياة."
        },
        {
          img: "/images/cerebral palsy.jpg",
          title: "الأطفال والبالغون ذوي الصعوبات البدنية الشديدة",
          desc: "للأشخاص المصابين بالشلل الدماغي أو إصابات الرأس أو السكتة الدماغية، الرموز تصبح نظام تواصل بديل للتعبير عن الاحتياجات والمشاعر والأفكار."
        },
        {
          img: "/images/Elderly.jpg",
          title: "كبار السن",
          desc: "يمكن أن تتطلب الإعاقات الإدراكية الناتجة عن الأفازيا أو الزهايمر أو الخرف أو الأمراض النفسية استخدام أنظمة تواصل بديلة أو داعمة."
        },
        {
          img: "/images/emergency.jpg",
          title: "حالات الطوارئ أو الطبية",
          desc: "عندما يكون المرضى مخدرين أو في صدمة أو غير قادرين على الكلام، تسمح الرموز بالتواصل مع الأطباء لتلبية الاحتياجات والمشاعر والحصول على موافقة مستنيرة."
        },
        {
          img: "/images/beginning to read.jpg",
          title: "الأطفال المبتدئون في القراءة",
          desc: "تساعد الرموز الأطفال على فهم النصوص المكتوبة وفك الشيفرة وتحسين مهارات القراءة، مع ضرورة وضع النص بجانب الرموز."
        },
        {
          img: "/images/Learning.jpg",
          title: "تعلم لغة ثانية",
          desc: "تساعد الدعامات البصرية المتحدثين الأصليين وغير الأصليين على فهم النصوص والتواصل في المراحل الأولى لتعلم لغة جديدة."
        },
        {
          img: "/images/Tourist .jpg",
          title: "السياح والزوار",
          desc: "تسهل الرموز الوصول إلى الثقافة والمتاجر والمطاعم والإجراءات الإدارية للمقيمين أو الزوار المؤقتين."
        },
        {
          img: "/images/everyone.jpg",
          title: "للجميع",
          desc: "تساعد الوسائل البصرية أي شخص على التنقل في أماكن غير معروفة والتواصل بسهولة والتكيف مع العالم البصري المحيط به."
        }
      ],
      aboutTitle: "عن فوكسى",
      aboutDesc1: "فوكسى مصمم لجعل التواصل سلسًا ومتاحًا ومركزًا على الإنسان. يوفر التطبيق أيقونات وعبارات جاهزة لتسهيل التفاعلات اليومية.",
      aboutDesc2: "سواء كانت المشاعر أو الاحتياجات أو الأنشطة اليومية — فوكسى يساعد في سد فجوة التواصل.",
      footer: "© 2025 فوكسى — التواصل للجميع",
    },
    fr: {
      home: "Accueil",
      features: "Fonctionnalités",
      how: "Comment ça marche",
      users: "Utilisateurs",
      about: "À propos",
      settings: "Paramètres",
      logout: "Déconnexion",
      welcome: "Bienvenue",
      heroTitle: "La communication pour tous.",
      heroDesc: "Voxi aide les personnes ayant des difficultés de communication telles que Alzheimer, AVC, autisme ou troubles de la parole à exprimer leurs pensées clairement et en toute confiance.",
      startBtn: "Commencez avec Voxi →",
      featuresTitle: "Fonctionnalités",
      feature1: { title: "Communication facile", 
        desc: "Exprimez vos besoins et sentiments grâce à des icônes visuelles intuitives.",
      img:"/images/communication.jpg", },
      feature2: { title: "Grande bibliothèque d'icônes",
         desc: "Des centaines d'icônes classées pour la communication quotidienne." ,
        img:"/images/R.jpg",},
      feature3: { title: "Rapide & Simple", 
        desc: "Interface claire conçue pour les seniors et les enfants.",
      img:"/images/OIP.jpg", },
      usersTitle: "Qui peut utiliser Voxi ?",
      usersList: [
        {
          img: "/images/autism.jpg",
          title: "Enfants avec besoins spéciaux",
          desc: "Pour les enfants avec autisme, handicap intellectuel, syndrome de Down ou déficience auditive, les supports visuels facilitent le développement du langage et les compétences de vie."
        },
        {
          img: "/images/cerebral palsy.jpg",
          title: "Enfants & adultes avec difficultés physiques sévères",
          desc: "Pour les personnes atteintes de paralysie cérébrale, traumatismes crâniens ou AVC, les symboles deviennent un système de communication alternatif pour exprimer besoins, émotions et idées."
        },
        {
          img: "/images/Elderly.jpg",
          title: "Personnes âgées",
          desc: "Les troubles cognitifs dus à l'aphasie, Alzheimer, démence ou maladies psychiatriques peuvent nécessiter des systèmes de communication alternatifs ou augmentatifs."
        },
        {
          img: "/images/emergency.jpg",
          title: "Situations d'urgence ou sanitaires",
          desc: "Lorsque les patients sont intubés, en état de choc ou incapables de parler, les symboles permettent de communiquer avec les médecins pour les besoins, sentiments et consentement éclairé."
        },
        {
          img: "/images/Learning.jpg",
          title: "Enfants débutant la lecture",
          desc: "Les symboles aident les enfants à décoder le texte écrit, comprendre les mots et soutenir le développement de la lecture. Les symboles doivent être accompagnés de texte."
        },
        {
          img: "/images/beginning to read.jpg",
          title: "Apprentissage d'une langue seconde",
          desc: "Les supports visuels aident les locuteurs natifs et non natifs à comprendre le texte et à communiquer pendant les premières étapes de l'apprentissage d'une nouvelle langue."
        },
        {
          img: "/images/Tourist .jpg",
          title: "Touristes et visiteurs",
          desc: "Les symboles facilitent l'accès à la culture, aux magasins, restaurants et procédures administratives pour les résidents ou visiteurs temporaires."
        },
        {
          img: "/images/everyone.jpg",
          title: "Pour tous",
          desc: "Les aides visuelles permettent à chacun de naviguer facilement dans des lieux inconnus et de communiquer dans un monde visuel familier."
        }
      ],
      aboutTitle: "À propos de Voxi",
      aboutDesc1: "Voxi est conçu pour rendre la communication fluide, accessible et centrée sur l'humain. Notre application fournit des icônes et phrases prêtes à l'emploi pour simplifier les interactions quotidiennes.",
      aboutDesc2: "Que ce soit pour les émotions, les besoins ou les activités quotidiennes — Voxi aide à combler le fossé de la communication.",
      footer: "© 2025 Voxi — La communication pour tous",
    },
    es: {
      home: "Inicio",
      features: "Características",
      how: "Cómo funciona",
      users: "Usuarios",
      about: "Acerca de",
      settings: "Configuración",
      logout: "Cerrar sesión",
      welcome: "Bienvenido",
      heroTitle: "Comunicación para todos.",
      heroDesc: "Voxi ayuda a personas con dificultades de comunicación como Alzheimer, accidentes cerebrovasculares, autismo o dificultades del habla a expresar sus pensamientos con claridad y confianza.",
      startBtn: "Comienza con Voxi →",
      featuresTitle: "Características",
      feature1: { title: "Comunicación fácil",
         desc: "Expresa necesidades y sentimientos mediante iconos visuales intuitivos.",
        img:"/images/communication.jpg" },
      feature2: { title: "Gran biblioteca de iconos", 
        desc: "Cientos de iconos categorizados para la comunicación diaria." ,
      img:"/images/R.jpg",},
      feature3: { title: "Rápido y simple", 
        desc: "Interfaz limpia diseñada para personas mayores y niños.",
      img:"/images/OIP.jpg," },
      usersTitle: "¿Quién puede usar Voxi?",
      usersList: [
        {
          img: "/images/autism.jpg",
          title: "Niños con necesidades especiales",
          desc: "Para niños con autismo, discapacidad intelectual, síndrome de Down o discapacidad auditiva, los soportes visuales facilitan el desarrollo del lenguaje y las habilidades de vida."
        },
        {
          img: "/images/cerebral palsy.jpg",
          title: "Niños y adultos con dificultades físicas severas",
          desc: "Para personas con parálisis cerebral, traumatismos craneales o accidentes cerebrovasculares, los símbolos se convierten en un sistema de comunicación alternativo para expresar necesidades, emociones e ideas."
        },
        {
          img: "/images/Elderly.jpg",
          title: "Personas mayores",
          desc: "Los deterioros cognitivos debidos a afasia, Alzheimer, demencia o enfermedades psiquiátricas pueden requerir sistemas de comunicación aumentativa o alternativa."
        },
        {
          img: "/images/emergency.jpg",
          title: "Situaciones de emergencia o sanitarias",
          desc: "Cuando los pacientes están intubados, en shock o no pueden hablar, los símbolos permiten la comunicación con los médicos para necesidades, emociones y consentimiento informado."
        },
        {
          img: "/images/Learning.jpg",
          title: "Niños que comienzan a leer",
          desc: "Los símbolos ayudan a los niños a decodificar el texto escrito, comprender palabras y apoyar el desarrollo de la lectura. Los símbolos deben ir acompañados de texto."
        },
        {
          img: "/images/beginning to read.jpg",
          title: "Aprendizaje de un segundo idioma",
          desc: "Los soportes visuales ayudan a hablantes nativos y no nativos a entender textos y comunicarse en las primeras etapas del aprendizaje de un nuevo idioma."
        },
        {
          img: "/images/Tourist .jpg",
          title: "Turistas y visitantes",
          desc: "Los símbolos facilitan el acceso a la cultura, tiendas, restaurantes y procedimientos administrativos para residentes temporales o viajeros."
        },
        {
          img: "/images/everyone.jpg",
          title: "Para todos",
          desc: "Las ayudas visuales ayudan a cualquiera a orientarse en lugares desconocidos y comunicarse fácilmente en un mundo visual familiar."
        }
      ],
      aboutTitle: "Acerca de Voxi",
      aboutDesc1: "Voxi está diseñado para hacer la comunicación fluida, accesible y centrada en la persona. Nuestra aplicación proporciona iconos y frases listos para usar que simplifican las interacciones diarias.",
      aboutDesc2: "Ya sea emociones, necesidades o actividades diarias — Voxi ayuda a cerrar la brecha de comunicación.",
      footer: "© 2025 Voxi — Comunicación para todos",
    },
  };

  const t = texts[language];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", paddingTop: "100px", backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg shadow-sm fixed-top" style={{ backgroundColor: "var(--header-bg)", transition: "background 0.3s, color 0.3s" }}>
        <div className="container d-flex align-items-center">
          <button className="navbar-brand d-flex align-items-center gap-2 btn btn-link p-0" onClick={() => navigate("/landing")}>
            <img src="https://cdn-icons-png.flaticon.com/512/892/892781.png" alt="Voxi Logo" width="40" />
            <span style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-color)" }}>Voxi</span>
          </button>

          <div className="d-flex gap-3 align-items-center ms-auto">
            {[{text: t.home, id:"home"}, {text: t.features, id:"features"}, {text: t.how, id:"how"}, {text: t.users, id:"users"}, {text: t.about, id:"about"}].map((link,i)=>(
              <button key={i} className="btn btn-link fw-semibold p-0" style={{ color: "var(--text-color)" }} onClick={() => scrollTo(link.id)}>{link.text}</button>
            ))}
            <button className="btn btn-link fw-semibold p-0" style={{ color: "var(--text-color)" }} onClick={() => navigate("/settings")}>{t.settings}</button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>{t.logout}</button>
            {user && <span className="fw-bold ms-3">{t.welcome}, {user.firstName}</span>}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="d-flex align-items-center" style={{ height: "100vh", background: "linear-gradient(to right, var(--bg-color), #ffffff)" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 style={{ fontSize: "50px", fontWeight: "800", color: "var(--text-color)" }}>{t.heroTitle}</h1>
              <p className="mt-3" style={{ fontSize: "18px", lineHeight: "1.7", color: "var(--text-color)" }}>{t.heroDesc}</p>
              <button onClick={() => navigate("/category")} className="btn btn-dark mt-4 px-5 py-3 fw-bold" style={{ borderRadius: "12px", fontSize: "18px" }}>{t.startBtn}</button>
            </div>
            <div className="col-md-6 text-center">
              <img src="" alt="" className="img-fluid" style={{ maxHeight: "380px" }} />
            </div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section id="features" className="py-5" style={{ background: "var(--bg-color)" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-4">{t.featuresTitle}</h2>
          <div className="row g-4 mt-1">
            {[t.feature1, t.feature2, t.feature3].map((f,i)=>(
              <div key={i} className="col-md-4">
                <div className="p-4 shadow-sm rounded" style={{ backgroundColor: "var(--card-bg)" }}>
                  <img src={f.img}  style={{ width: "100%" }} className="mb-3" />
                  <h5 className="fw-bold mb-2">{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USERS */}
      <section id="users" className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">{t.usersTitle}</h2>
          <div className="row g-4">
            {t.usersList.map((u, i)=>(
              <div key={i} className="col-md-3 text-center">
                <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "var(--card-bg)", height: "100%" }}>
                  <img src={u.img} width="70" alt={u.title} style={{ width:"100%"}}/>
                  <h5 className="fw-bold mt-3">{u.title}</h5>
                  <p style={{ fontSize: "14px", marginTop: "10px" }}>{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" alt="About Voxi" className="img-fluid" style={{ maxHeight: "330px" }} />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-3" style={{ fontSize: "32px" }}>{t.aboutTitle}</h2>
              <p style={{ fontSize: "18px", lineHeight: "1.7" }}>{t.aboutDesc1}</p>
              <p style={{ fontSize: "18px" }}>{t.aboutDesc2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-4" style={{ backgroundColor: "var(--text-color)", color: "var(--bg-color)" }}>
        <h5 className="fw-bold mb-0">{t.footer}</h5>
      </footer>
    </div>
  );
};

export default Landing;

