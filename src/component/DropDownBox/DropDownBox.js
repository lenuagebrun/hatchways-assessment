import React, { useState } from 'react';

import './DropDownBox.css';

const DropDownBox = ({ hiddenText }) => {

  const [clicked, toggle] = useState(false);

  return (
    <div className='container'>
      <div className='visable'>
        <button
          onClick={() => toggle(!clicked)}
          className='button'
        >{clicked ? '-' : '+'} </button>
      </div>
      <div className='toggle'>
        {clicked ? <div className='hiddenText'><ul><li>{hiddenText}<br /></li></ul></div> : null}
      </div>
    </div>
  )
};

export default DropDownBox;