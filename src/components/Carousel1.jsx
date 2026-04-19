import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CarouselComponent = () => {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row">
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 3" />
            </div>
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 4" />
            </div>
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 5" />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row">
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 6" />
            </div>
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 7" />
            </div>
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 8" />
            </div>
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 9" />
            </div>
            <div className="col">
              <img src="https://via.placeholder.com/150" className="d-block w-100" alt="Slide 10" />
            </div>
          </div>
        </div>
        {/* Add more carousel items as needed */}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
