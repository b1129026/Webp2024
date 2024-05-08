import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      itemList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.state.itemList.push(this.state.value);
    this.setState({value: '', itemlList: this.state.itemList,});
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name : 
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul style={{ textAlign: 'left' }}>
          {this.state.itemList.map((item, index) => <li key={`item_${index}`}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<NameForm />, document.getElementById('root'));

reportWebVitals();
