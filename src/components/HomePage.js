import React from 'react';

const HomePage = () => {
  return (
    <div className='index-intro'>
        <div>
            <h2>Welcome to enhanced <nobr>AI-generated</nobr> CV optimizer</h2>
        </div>
        <div className='cv-route-block'>
            <ul>
                <li className='done-span'><span>1</span> Download your CV</li>
                <li className='active-span'><span>2</span> Select your Career Path</li>
                <li><span>3</span> Create your CV</li>
            </ul>
        </div>
    </div>
  );
};

export default HomePage;
