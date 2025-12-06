/*import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  { name: "Real Life", image: "https://www.creativefabrica.com/wp-content/uploads/2022/08/24/Daily-Fonts-36960332-1.png" },
  { name: "Feelings", image: "https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX44167268.jpg" },
  { name: "Communication", image: "https://thumbs.dreamstime.com/b/hand-writing-communication-text-drawings-graphics-digital-composite-90340922.jpg" },
  { name: "Additional", image: "https://thumbs.dreamstime.com/b/additional-gold-text-black-background-d-rendered-royalty-free-stock-picture-image-can-be-used-online-website-banner-87918189.jpg" },
  { name: "All", image: "https://st4.depositphotos.com/1008851/29267/v/1600/depositphotos_292674954-stock-illustration-life-text-grunge-blots-background.jpg" },
];

const Category = () => {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    if (cat === "All") navigate("/home");
    else navigate(`/dashboard/${cat}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-2" style={{ color: "red", fontWeight: "bold" }}>Welcome in Voxi</h1>
      <h4 className="text-center mb-5">Choose your category</h4>

      {/* Slider container for cards *}
      <div
        className="d-flex overflow-auto"
        style={{ gap: "20px", paddingBottom: "20px", scrollBehavior: "smooth" }}
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="card shadow-sm rounded-3 flex-shrink-0"
            style={{
              width: "220px",
              cursor: "pointer",
              transition: "transform 0.3s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
            onClick={() => handleClick(cat.name)}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {/* Image container for horizontal slider inside card *}
            <div
              className="d-flex overflow-auto"
              style={{ gap: "10px", padding: "5px", scrollBehavior: "smooth" }}
            >
              <img src={cat.image} alt={cat.name} className="img-fluid rounded" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
              <img src={cat.image} alt={cat.name} className="img-fluid rounded" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
              <img src={cat.image} alt={cat.name} className="img-fluid rounded" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
            </div>
            <h5>{cat.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};
*/
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Categories data
const categories = [
  { name: "Real Life", image: "https://www.creativefabrica.com/wp-content/uploads/2022/08/24/Daily-Fonts-36960332-1.png" },
  { name: "Feelings", image: "https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX44167268.jpg" },
  { name: "Communication", image: "https://thumbs.dreamstime.com/b/hand-writing-communication-text-drawings-graphics-digital-composite-90340922.jpg" },
  { name: "Additional", image: "https://thumbs.dreamstime.com/b/additional-gold-text-black-background-d-rendered-royalty-free-stock-picture-image-can-be-used-online-website-banner-87918189.jpg" },
  { name: "All", image: "https://st4.depositphotos.com/1008851/29267/v/1600/depositphotos_292674954-stock-illustration-life-text-grunge-blots-background.jpg" },
];

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

  const handleClick = (cat) => {
    if (cat === "All") navigate("/home");
    else navigate(`/dashboard/${cat}`);
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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-2" style={{ color: "red", fontWeight: "bold" }}>Welcome in Voxi</h1>
      <h4 className="text-center mb-5">Choose your category</h4>

      <Slider {...settings}>
        {categories.map((cat) => (
          <div key={cat.name} style={{ padding: "10px" }}>
            <div 
              className="card shadow-lg rounded-4 text-center"
              style={{
                cursor: "pointer",
                width: "250px",
                margin: "0 auto",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onClick={() => handleClick(cat.name)}
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
                alt={cat.name} 
                className="img-fluid rounded-top"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{cat.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Category;
