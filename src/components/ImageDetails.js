import React from 'react';
import { connect } from 'react-redux';
import { Fade } from '../styles/transition';
import * as actions from '../redux/actions';
import spinnerImage from '../images/spinner.gif';

class ImageDetails extends React.PureComponent {
  componentDidMount() {
    this.container.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    this.container.removeEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown = (e) => {
    if (this.image && this.image.contains(e.target)) return;
    this.props.selectImage(null);
  }

  render() {
    const { image } = this.props;
    
    return Fade({
      in: image ? true : false,
      isFlex: true
    }, style => {
      const url = (image && image.original) ||
        (image && image.url) || 
        '';
      const title = (image && image.title) || '';

      return (
        <div
          style={style}
          className='ImageDetails'
          ref = {container => this.container = container}
        >
          <button
            className='close-x'
            onClick={this.onMouseDown}
          >
            <i className='fas fa-times'/>
          </button>
          <div
            className='image'
            style={{backgroundImage: `url(${spinnerImage})`}}
          >
            <img
              ref={image => this.image = image}
              src={url}
              alt={title}
            />
          </div>
        </div>
      );
    });

  }
}

const mapStateToProps = ({ images }) => {
  const { list, selected } = images;

  return { image: list[selected] }
}

export default connect(
  mapStateToProps,
  actions
)(ImageDetails);