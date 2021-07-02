import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Api from '../services/api';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import '../styles/Home.css';
import 'bulma/css/bulma.min.css';

class Home extends Component {
  constructor() {
    super();
    let cartSize = 0;
    Object.values(sessionStorage).forEach((value) => {
      if (!value.includes('rendererID')) {
        const data = JSON.parse(value);
        cartSize += data.quantity;
      }
    });
    this.state = {
      data: [],
      search: '',
      category: '',
      cartSize,
    };

    this.HandlerState = this.HandlerState.bind(this);
    this.RequestApi = this.RequestApi.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart({ target: { value } }) {
    const data = JSON.parse(value);
    const key = data.id;
    if (sessionStorage[key]) {
      const recoveredObject = JSON.parse(sessionStorage[key]);
      const copy = { ...recoveredObject };
      if (copy.quantity < copy.inStorage) {
        copy.quantity += 1;
        sessionStorage[key] = JSON.stringify(copy);
        this.setState((prevState) => ({ cartSize: prevState.cartSize + 1 }));
      }
    } else {
      sessionStorage.setItem(key, value);
      this.setState((prevState) => ({ cartSize: prevState.cartSize + 1 }));
    }
  }

  HandlerState(event) {
    const { target: { name, value } } = event;
    if (name === 'category') {
      this.setState({ [name]: value }, () => this.RequestApi());
    } else {
      this.setState({ [name]: value });
    }
  }

  RequestApi() {
    const { search, category } = this.state;
    this.setState({ data: [] }, () => {
      Api.getProductsFromCategoryAndQuery(category, search)
        .then(({ results }) => {
          this.setState({ data: results });
        });
    });
  }

  render() {
    const { data, cartSize } = this.state;
    return (
      <div>
        <div className="searchSection">
          <CategoryList
            handleUserInput={ this.HandlerState }
          />
          <div className="searchBar search-size-2">
            <label htmlFor="search">
              <input
                className="input is-primary"
                placeholder="Digite Aqui o Termo para pesquisa"
                data-testid="query-input"
                type="text"
                name="search"
                onChange={ this.HandlerState }
              />
            </label>
            <button
              className="button is-primary search-button"
              data-testid="query-button"
              type="submit"
              onClick={ this.RequestApi }
            >
              Pesquisar
            </button>
          </div>
          <div className="search-size-1">
            <Link
              className="button is-link"
              to="/cart"
              data-testid="shopping-cart-button"
            >
              {`Carrinho ${cartSize}`}
            </Link>
          </div>
        </div>
        <h2 className="home-message" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <ProductList addToCart={ this.addToCart } productsList={ data } />
      </div>
    );
  }
}

export default Home;
