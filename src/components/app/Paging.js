import React, { Component } from 'react';
import styles from './Paging.css';

export default class Paging extends Component {

  handlePage(increment) {
    const { page, onPage } = this.props;
    onPage({ page: page + increment });
  }

  render() {
    const { totalResults, page, perPage, searchTerm } = this.props;
    
    if(!totalResults) return <div>No results found, try another search</div>;
    

    const totalPages = Math.ceil(totalResults / perPage);
    return (
      <div className={styles.paging}>
        <h2>{totalResults} results found for &quot;{searchTerm}&quot;</h2>
        &nbsp;
        <div className="pagination">
          <button className="prev" onClick={() => this.handlePage(-1)} disabled={page === 1}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          &nbsp;
          <button className="next" onClick={() => this.handlePage(+1)} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    );
  } 
}