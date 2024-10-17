import React, { useState, useEffect } from 'react';
import '../index.css';

const images = [
  'https://cdn.pixabay.com/photo/2023/06/29/12/28/cats-8096304_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/09/21/18/58/dog-4494554_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/01/05/10/53/rabbit-8489271_1280.png',
  'https://cdn.pixabay.com/photo/2020/09/17/14/16/parrot-5579297_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/09/28/11/40/fish-961953_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg'
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCards, setShowCards] = useState(false);
  const [currentCard, setCurrentCard] = useState('about');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleCards = () => {
    setShowCards((prev) => !prev);
  };

  const handleArrowClick = () => {
    setCurrentCard((prev) => (prev === 'about' ? 'contact' : 'about'));
  };

  return (
    <div className="container">
      <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="overlay">
              <h1>Welcome to Pet Adoption</h1>
              <p>Find your perfect pet today!</p>
              <button className="btn btn-primary" onClick={toggleCards}>
                {showCards ? 'Hide Info' : 'Show Info'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCards && (
        <div className="info-cards">
          <div className={`card ${currentCard}-card`}>
            {currentCard === 'about' ? (
              <>
                <h2>About Us</h2>
                <p>
                  Adopting a pet is not just about finding a new companion; it's about saving a life. Many animals in shelters are in desperate need of loving homes, and by adopting, you provide them with a second chance. Pets bring joy, comfort, and companionship into our lives, enhancing our emotional well-being. Our app connects potential pet owners with local shelters and rescues, making the adoption process seamless and accessible. With detailed profiles, pictures, and information about each pet, we ensure you can find the perfect companion that matches your lifestyle and needs.
                </p>
              </>
            ) : (
              <>
                <h2>Contact Us</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="3"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </>
            )}
            <button className="arrow" onClick={handleArrowClick}>
              ➔ {/* Arrow for navigation */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
