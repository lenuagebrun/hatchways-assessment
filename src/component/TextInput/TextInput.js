import React from 'react';
import './TextInput.css';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      list: [],
      searchTermTag: '',
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
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  <div className='tag'>{item.value}</div>
                </li>
              )
            })}
          </ul>
          <br />
          <input
            className='tag-bar'
            type='text'
            minlength='2'
            placeholder='Add a tag'
            value={this.state.newItem}
            onChange={e => this.updateInput('newItem', e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                this.addItem()
              }
            }}
          />
          <br />
        </div>
      </div>
    )
  }
}

export default TextInput;