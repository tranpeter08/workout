import React from 'react';
import {connect} from 'react-redux';

const Pagination = props => {
  const {
    recipes: {from, to, more, count, loading}, 
    handlePaging
  } = props;

  const step = 10;
  const currentPage = from / step + 1;
  const totalPages = count % step === 0 ? 
    count / step 
    :
    Math.round(count / step) + 1;

  const prevButton = (
    <button
      className='pagination-prev' 
      onClick={() => handlePaging(-step)} 
      disabled={loading}
    >
      <i className="fas fa-caret-left"></i> Prev
    </button>
  );

  const nextButton = (
    <button
      className='pagination-next' 
      onClick={() => handlePaging(step)} 
      disabled={loading}
    >
      Next <i className="fas fa-caret-right"></i>
    </button>
  );

  return <nav className='pagination'>
    { from ? prevButton : null }
    <span>Page {currentPage} of {totalPages} </span>
    { more ? nextButton : null }
  </nav>
}

const mapStateToProps = ({recipes}) => ({recipes});

export default connect(mapStateToProps)(Pagination);