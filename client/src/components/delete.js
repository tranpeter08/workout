import React, {Component} from 'react';

export default class Delete extends Component {
  //props: type, title, setDelete(bool)
  onYesDelete() {
    //delete action
    console.log('deleted', this.props.title);
    this.props.setDelete(false);
  }

  render() {
    return(
      <div>
        <p>Do you want to delete {this.props.type} "{this.props.title}"?</p>
        <button type='button' onClick={() => this.onYesDelete()}>Yes</button>
        <button type='button' onClick={() => this.props.setDelete(false)}>No</button>
      </div>
    )
  }
}