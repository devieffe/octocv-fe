import React from 'react';
import CarouselComponent from './Carousel1';

const CandidateDashboard = () => {
  return (
    <>
    <div className='container text-center col-6 custom-container'>
      <h2>Candidate dashboard</h2>
      <p>Now let's make an assessment to test your cognitive ability as well as your computer literacy skills.</p>
      <h2>Career path</h2>
      <p>personalized career path 
      on this step you need too.</p>
      </div>

      <CarouselComponent />

    <div className='text-center p-4'>
      <button className="btn btn-dark">Download CV</button>
    </div>
    </>
  );
};

export default CandidateDashboard;