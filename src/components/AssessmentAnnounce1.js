import React from 'react';

const AssessmentAnnounce = () => {
  return (
    <>
    <div className='container text-center col-6 custom-container'>
      <h2>The following questions are designed to assess your Computer Literacy skills</h2>
      <p>Take you time to answer each question to the best of your ability.</p>
      <button className="btn btn-dark">Continue</button>
    </div>
    <div className='container text-center col-6 p-4'>
      Breadcrumbs here ?? like:<br/>
      Start -- ... -- Questions -- ... -- Finish
    </div>
    </>
  );
};

export default AssessmentAnnounce;