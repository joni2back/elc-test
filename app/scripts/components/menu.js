/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import { searchProducts } from '../services/search-service';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchQuery: null,
            results: [],
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        e.preventDefault();

        const searchQuery = (e.target.value || '').trim();

        if (! searchQuery) {
            return;
        }

        this.setState({searchQuery, loading: true})

        //here we can have a dispatch action with redux having the results stored there
        searchProducts(searchQuery)
            .then(results => this.setState({results, loading: false}))
            .catch(() => this.setState({loading: false}))
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <ul className="search-results">
                        { this.state.results.map(result => 
                            <li key={result._id} title={result.name}>
                                <a href={result.picture} target="_blank">
                                    <img src={result.picture} className="search-item-img" alt={result.name} />
                                    { result.name }
                                    <span class="search-item-price">${ result.price }</span>
                                </a>
                            </li>
                        )}

                        { this.state.loading ? 
                            <small>Loading...</small> : 
                            (this.state.searchQuery && !this.state.results.length ? <small>No results found</small> : null)
                        }
                    </ul>
                </div>
            </header>
        );
    }
}

// Export out the React Component
module.exports = Menu;