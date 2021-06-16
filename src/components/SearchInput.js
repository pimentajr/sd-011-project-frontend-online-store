import React, { Component } from 'react';

export default class SearchInput extends Component {
  render() {
    const { handleSubmit, handleInput } = this.props;
    return (
      <form className="home-form-div" onSubmit={handleSubmit}>
        <fieldset>
          <input
            data-testid="query-input"
            type="search"
            className="form-control form-control-lg"
            type="text"
            onChange={handleInput}
            placeholder="ex: gato"
          />
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        </fieldset>
        <button data-testid="query-button" type="submit" className="btn btn-success">
          Buscar
        </button>
      </form>
    );
  }
}
