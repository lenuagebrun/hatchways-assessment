import React, { useState, useEffect } from 'react';

import DropDownBox from '../DropDownBox/DropDownBox';
import TextInput from '../TextInput/TextInput';
import './ContactComponent.css';

const ContactComponent = (props) => {
  const [searchTermName, setSearchTermName] = useState('');
  const [searchTermTag, setSearchTermTag] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.students);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='content'>
        <div className='container'>
          <div className='search'>
            <input
              className='search-bar'
              type='text'
              placeholder='Search by name'
              onChange={(event) => {
                setSearchTermName(event.target.value);
              }}
            />
            <input
              className='search-bar'
              type='text'
              placeholder='Search by tag'
              onChange={(event) => {
                setSearchTermTag(event.target.value);
              }}
            />
          </div>
          <ul>
            {items.filter((val) => {
              if (searchTermName == '') {
                return val
              } else if (val.firstName.toLowerCase().includes(searchTermName.toLowerCase())) {
                return val
              }
            }).map(item => (
              <li
                key={item.id}
              >
                <div className='contact'>
                  <img className='profile-pic' src={item.pic} />
                  <div className='info'><p className='name'>{item.firstName} {item.lastName}</p><br />
                    <div>
                      <p>Email: {item.email}</p>
                      <p>Company: {item.company}</p>
                      <p>Skill: {item.skill}</p>
                      <p>Average: {item.grades.reduce((a, b) => a + parseFloat(b), 0) / 8}%</p>
                      <TextInput />
                    </div>
                    <div className='drop-down'>
                      <DropDownBox hiddenText={item.grades.map((grade,i) => <p key={i}>Test {i + 1}: {grade}%</p>)} />
                    </div>
                  </div>
                </div>
              </li>

              //<DropDownBox
              //  image={item.strAlbumThumb}
              //  hiddenText={item.strDescriptionEN}
              ///>
              //
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ContactComponent;