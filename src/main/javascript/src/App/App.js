import React, { Component } from 'react';
import './App.css';

import Input from '../Input'
import Form from '../Form'
import Table from '../Table'
import Error from '../Error'
import http from '../http'
import Numeral from './Numeral'

class App extends Component {
  state = {
    number: '',
    numerals: [],
    errors: [],
  }

  handleInput = (event) => {
    if (this.state.errors) {
      this.setState({ errors: [] })
    }
    this.setState({ number: event.target.value })
  }

  isValidRange = n =>
    n > 0 && n < 4000

  isDuplicate = (numerals, n) =>
    !!numerals.find(numeral => numeral.arabic === n)

  handleSubmit = (event) => {
    event.preventDefault()
    const { number, numerals, errors } = this.state

    if (!number) {
      return
    }
    const n = parseInt(number, 10)
    if (!this.isValidRange(n)) {
      this.setState({
        errors: ['Number must be in range of 1 and 3999', ...errors],
      })
      return;
    }
    if (this.isDuplicate(numerals, n)) {
      this.setState({
        errors: ['Number already included', ...errors],
      })
      return;
    }
    http.post('api/v1/conversion', { number })
      .then(numeral => this.setState({
        numerals: [numeral, ...numerals],
        number: '',
      }))
  }

  render() {
    const { number, numerals, errors } = this.state;
    const headers = ['Arabic', 'Roman']

    return (
      <div>
        <h2>The best Arabic to Roman number converter...</h2>
        <h3>...at least from the 1 to 3999</h3>
        <h4>...and colored primes!</h4>
        <div className="numeral__input-wrapper">
          <Form handleSubmit={this.handleSubmit}>
            <Input
              handleSubmit={this.handleSubmit}
              placeholder="What needs to be converted?"
              value={number}
              handleInput={this.handleInput}
            />
          </Form>
        </div>
        {
          errors.length > 0 && <Error messages={errors} />
        }
        <div>
          <Table headers={headers}>
            {
              numerals.map(numeral =>
                <Numeral
                  key={numeral.arabic}
                  numeral={numeral}
                />)
            }
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
