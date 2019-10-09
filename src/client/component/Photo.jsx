/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-empty */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-array-index-key */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import React from 'react';


// eslint-disable-next-line react/prefer-stateless-function
class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      res: null,
      fileName: null,
      imageFiles: [],
      inputValue: 0,
      searchedImage: null,
    };
  }

  componentDidMount() {
    this.getImageDataFromDB();
  }

  componentWillUnmount() {

  }

  onChangeHandler(event) {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  onClickHandler() {
    if (this.state.selectedFile) {
      const data = new FormData();
      // eslint-disable-next-line react/destructuring-assignment
      data.append('file', this.state.selectedFile);

      let tagNo = 0;
      if (this.state.imageFiles) {
        tagNo = this.state.imageFiles.length - 1;
      }

      data.append('comment', `${this.state.selectedFile.name} is uploaded.`);
      data.append('tagId', parseInt(tagNo, 10) + 1);

      axios({
        method: 'post',
        url: 'http://localhost:3000/api/photo',
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(() => {
          this.state.res = 'file upload success!!!';
          this.state.fileName = this.state.selectedFile.name;
          this.setState({
            res: this.state.res,
            fileName: this.state.fileName,
          });
          this.getImageDataFromDB();
          this.state.selectedFile = null;
          data.delete();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }

  getImageDataFromDB() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/photo/many',
    })
      .then((res) => {
        if (res.data && res.data.success === true) {
          // this.state.imageFiles = res.photos;
          this.setState({
            imageFiles: res.data.photos,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value,
    });

    if (this.state.imageFiles && this.state.imageFiles.length > 0) {
      const idx = this.state.imageFiles.findIndex((item) => {
        return parseInt(item.tagIDs[0], 10) === parseInt(e.target.value, 10);
      });
      // console.log('search idx ===', idx);
      if (idx > -1) {
        const queryId = this.state.imageFiles[idx]._id;
        axios({
          method: 'get',
          url: `http://localhost:3000/api/photo/${queryId}`,
        })
          .then((res) => {
            if (res.data.success === true) {
              this.state.searchedImage = res.data.photo;
              this.setState({
                searchedImage: res.data.photo,
              });
              console.log('search res===', res);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  uploadPhoto() {
    console.log('upload photo butoon is clicked. ');
  }

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={this.onChangeHandler.bind(this)} />
        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler.bind(this)}>Upload</button>
        <br />
        <p>
          {this.state.fileName || ''}
          &nbsp;&nbsp;
          {this.state.res || ''}
        </p>
        <input type="number" value={this.state.inputValue} onChange={this.updateInputValue.bind(this)} />
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            {this.state.imageFiles.map((item, index) => (
              <div key={index}>
                <p>
                  {item.tagIDs}
                </p>
                <img src={`/static/${item._id}`} />
                <p>
                  {item.commentIDs}
                </p>
              </div>
            ))}
          </div>
          <div style={{ width: '50%' }}>
            <h4>Searched Image is showing:</h4>
            <br />
            {(() => {
              if (this.state.searchedImage) {
                return (
                  <div>
                    <p>
                      Searched image tag name:
                      { this.state.searchedImage.tagIDs }
                    </p>
                    <img src={`/static/${this.state.searchedImage._id}`} />
                    <p>
                      {this.state.searchedImage.commentIDs}
                    </p>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Photo;
