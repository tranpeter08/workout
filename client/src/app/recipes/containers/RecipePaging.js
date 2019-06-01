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

  return <React.Fragment>
    <button 
      onClick={() => handlePaging(-step)} 
      disabled={!from || loading}>
      Prev
    </button>
    <span>Page {currentPage} of {totalPages} </span>
    <button 
      onClick={() => handlePaging(step)} 
      disabled={!more || loading}>
      Next
    </button>
  </React.Fragment>
}

const mapStateToProps = ({recipes: {more, count, loading}}) =>
  ({more, count, loading});

export default connect(mapStateToProps)(Pagination);