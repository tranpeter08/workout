import React from 'react';
import axios from 'axios';

class ImageUpload extends React.Component{
  state= {
    base64Str:'',
    loading: '',
    uploaded: '',
    error:''
  }

  handleChange = e => {
    let file = e.target.files[0];
    if (file) {
      this.setState(
        {error: ''},
        () => this.handleFile(file)
    )}
  }

  handleFile = file => {
  
    if (file.type.split('/')[0] !== 'image') {
      return this.handleValidate('File needs to be an image.');
    };

    if (file.size > 3 * 1000 * 1000) {
      return this.handleValidate('Max file size is 3 MB.');
    };

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Str = reader.result;
      this.setState({base64Str})
    };

    reader.readAsDataURL(file);
  }

  handleValidate = error => {
    this.setState(
      {error},
      () => document.getElementsByName('file')[0].value = ''
    );
  }

  handleUpload = () => {
    let data = new FormData();
    data.append('image', this.state.base64Str.split(',')[1]);

    axios.post(
      'http://localhost:8080/users/upload',
      {image: this.state.base64Str.split(',')[1]},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  render() {
    return (
      <div>
        <label>
          Image Preview: <img width='200px' src={this.state.base64Str}></img>
        </label>
        <input name='file' onChange={this.handleChange} type='file'/>
        <span>{this.state.error}</span>
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    )
  }
}

export default ImageUpload;