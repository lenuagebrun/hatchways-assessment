import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
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

export default class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://theaudiodb.com/api/v1/json/1/album.php?i=112024")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.album
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      //unmount!!
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            {items.map(item => (
              <li key={item.idAlbum}>
                {item.strAlbum} <TextInput />
                <DropDownBox hiddenText={item.strDescriptionEN} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}


class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      list: []
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

const DropDownBox = ({ text, hiddenText }) => {

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
        {clicked ? <div style={styles.hiddenText}>{hiddenText}</div> : null}
      </div>
    </div>
  )
};