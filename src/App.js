import React, { useState, useEffect } from 'react';
import './App.css';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: `80%`,
    marginTop: 15
  },
  button: {
    background: `#70AE6E`,
    color: `white`,
    border: `none`,
    borderRadius: `3px`,
    minWidth: "150px",
    minHeight: `2.4em`,
    margin: `0.25em 0 0.25em 0`
  },
  visable: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottom: '1px solid #70AE6E',
  },
  toggle: {
    marginTop: 10
  },
  hiddenText: {
    marginTop: 15,
    marginBottom: 15
  },
  text: {
    fontSize: 18
  }
};

export default function MyComponent() {

  return (
    <SearchBar />
    //<div>
    //  <SearchBar />
    //  <ul>
    //    {items.map(item => (
    //      <li key={item.idAlbum}>
    //        {item.strAlbum} <TextInput />
    //        <DropDownBox hiddenText={item.strDescriptionEN} />
    //      </li>
    //    ))}
    //  </ul>
    //</div>
  );
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      list: [],
      searchAlbum: ''
    }
  }

  updateInput(key, value) {
    this.setState({
      [key]: value
    })
  }

  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    }
    const list = [...this.state.list];
    list.push(newItem)
    this.setState({
      list,
      newItem: ''
    })
  }

  deleteItem(id, item) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div>
        <div>
          Add an Item...
          <br />
          <input
            type='text'
            placeholder='type here...'
            value={this.state.newItem}
            onChange={e => this.updateInput('newItem', e.target.value)}
          />
          <button
            onClick={() => this.addItem()}
          >
            Add
          </button>
          <br />
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button
                    onClick={() => this.deleteItem(item.id)}
                  >X</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

const DropDownBox = ({ text, hiddenText, image }) => {

  const [clicked, toggle] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.visable}>
        <div style={styles.text}>{text}</div>
        <button
          onClick={() => toggle(!clicked)}
          style={styles.button}
        > Show {clicked ? `Less` : `More`} </button>
      </div>
      <div style={styles.toggle}>
        {clicked ? <div style={styles.hiddenText}><img src={image} />{hiddenText}</div> : null}
      </div>
    </div>
  )
};

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://theaudiodb.com/api/v1/json/1/album.php?i=112024")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.album);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
      <div>
        <input
          type='text'
          placeholder='search album...'
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <ul>
          {items.filter((val) => {
            if (searchTerm == '') {
              return val
            } else if (val.strAlbum.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).map(item => (
            <li key={item.idAlbum}>
              {item.strAlbum} {item.strArtist} <TextInput />
              <DropDownBox
                image={item.strAlbumThumb}
                hiddenText={item.strDescriptionEN}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
