import React from 'react';
import {connect} from 'react-redux';

const Pagination = props => {
  const {
    paging: {from, to}, 
    more, 
    count, 
    loading, 
    handlePaging} = props;

  const step = 10;
  const currentPage = from / step + 1;
  const totalPages = count % step === 0 ? 
    count / step : Math.round(count / step) + 1;

  const prevButton = (
    <button
      id='pagination-prev' 
      onClick={() => handlePaging(-step)} 
      disabled={loading}
    >
      <i className="fas fa-caret-left"></i> Prev
    </button>
  );

  const nextButton = (
    <button
      id='pagination-next' 
      onClick={() => handlePaging(step)} 
      disabled={loading}
    >
      Next <i className="fas fa-caret-right"></i>
    </button>
  )

  return <nav className='pagination'>
    { from ? prevButton : null }
    <span>Page {currentPage} of {totalPages} </span>
    { more ? nextButton : null }
  </nav>
}

const mapStateToProps = ({recipes: {more, count, loading}}) =>
  ({more, count, loading});

export default connect(mapStateToProps)(Pagination);