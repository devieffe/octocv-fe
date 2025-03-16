import React from 'react';

const AssessmentQuestion1 = () => {
  return (
<div className="container text-center">
  <div className="row">
    <div className="col">
        <span>1</span> Which of the following is/are an operating system/s? 
      </div>
      <div className="col">
        <form>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              Windows11
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              Android
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              Wix
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              Angular
            </label>
          </div>
        </form>
      </div>
      <div> <button className="btn btn-dark">Continue</button></div>
      <div className='container text-center col-6 p-4'>
      // Breadcrumbs here ? like:<br/>
      Start -- ... -- Questions -- ... -- Finish
    </div>
    </div>
    </div>
  );
};

export default AssessmentQuestion1;
