import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLanguage } from "../context/LanguageContext";

// Categories data with translations
const categories = [
  { 
    name: { en: "Real Life", ar: "الحياة الواقعية", fr: "La vie réelle", es: "Vida real" }, 
    image: "https://www.creativefabrica.com/wp-content/uploads/2022/08/24/Daily-Fonts-36960332-1.png" 
  },
  { 
    name: { en: "Feelings", ar: "المشاعر", fr: "Sentiments", es: "Sentimientos" }, 
    image: "https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX44167268.jpg" 
  },
  { 
    name: { en: "Communication", ar: "التواصل", fr: "Communication", es: "Comunicación" }, 
    image: "https://thumbs.dreamstime.com/b/hand-writing-communication-text-drawings-graphics-digital-composite-90340922.jpg" 
  },
  { 
    name: { en: "Additional", ar: "إضافي", fr: "Supplémentaire", es: "Adicional" }, 
    image: "https://thumbs.dreamstime.com/b/additional-gold-text-black-background-d-rendered-royalty-free-stock-picture-image-can-be-used-online-website-banner-87918189.jpg" 
  },
  { 
    name: { en: "All", ar: "الكل", fr: "Tout", es: "Todo" }, 
    image: "https://st4.depositphotos.com/1008851/29267/v/1600/depositphotos_292674954-stock-illustration-life-text-grunge-blots-background.jpg" 
  },
];

// Translation object for page texts
const translations = {
  en: { welcome: "Welcome in Voxi", chooseCategory: "Choose your category", chooseLang: "Choose your language" },
  ar: { welcome: "مرحبًا بك في فوكسّي", chooseCategory: "اختر فئتك", chooseLang: "اختر لغتك" },
  fr: { welcome: "Bienvenue dans Voxi", chooseCategory: "Choisissez votre catégorie", chooseLang: "Choisissez votre langue" },
  es: { welcome: "Bienvenido a Voxi", chooseCategory: "Elige tu categoría", chooseLang: "Elige tu idioma" },
};

// Custom arrow component
const CustomArrow = ({ className, style, onClick, direction }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(0,0,0,0.5)",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      zIndex: 2,
      fontSize: "25px",
      color: "white",
      cursor: "pointer"
    }}
    onClick={onClick}
  >
    {direction === "left" ? "<" : ">"}
  </div>
);

const Category = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage(); // global language

  const handleClick = (cat) => {
    const catNameEn = cat.name.en;
    if (catNameEn === "All") navigate("/home");
    else navigate(`/dashboard/${catNameEn}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };

  const t = translations[lang]; // current page translations

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-2" style={{ color: "red", fontWeight: "bold" }}>{t.welcome}</h1>
      <h4 className="text-center mb-3">{t.chooseCategory}</h4>

      {/* Language selector */}
      <h5 className="text-center mb-2">{t.chooseLang}</h5>
      <div className="d-flex justify-content-center mb-4">
        <select className="form-select w-auto" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
        </select>
      </div>

      <Slider {...settings}>
        {categories.map((cat, index) => (
          <div key={index} style={{ padding: "10px" }}>
            <div
              className="card shadow-lg rounded-4 text-center"
              style={{ cursor: "pointer", width: "250px", margin: "0 auto", transition: "transform 0.3s, box-shadow 0.3s" }}
              onClick={() => handleClick(cat)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              <img 
                src={cat.image} 
                alt={cat.name[lang]} 
                className="img-fluid rounded-top"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{cat.name[lang]}</h5>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Category;
