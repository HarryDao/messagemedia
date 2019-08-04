import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import ImageListItem from './ImageListItem';
import { SpinnerLoader } from './shared';

class ImageList extends React.PureComponent {
  componentDidMount() {
    this.fetchData(this.props.offset);
    window.addEventListener('scroll', this.onScrollBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollBottom);
  }

  onScrollBottom = (e, bottom, height) => {
    const { error, loading, offset } = this.props;

    if (error || loading) return;

    bottom = bottom || Math.floor(this.panel.getBoundingClientRect().bottom);
    height = height || window.innerHeight;

    if (bottom > height) return;

    this.fetchData(offset + 1);
  }

  fetchData = (offset) => {
    this.props.fetchApi(offset);
  }

  renderList() {
    const { list, selectImage } = this.props;

    return Object.keys(list).map(id => {
      return (
        <ImageListItem
          key={id}
          onSelect={selectImage}
          {...list[id]}
        />
      );
    });
  }

  renderError() {
    if (this.props.error) {
      return (
        <h4 className='error'>Something went wrong!</h4>
      );
    }
  }


  render() {
    const { loading } = this.props;
    return (
      <div
        className='ImageList'
        ref={panel => this.panel = panel}
      >
        <SpinnerLoader
          inProp={loading}
        />
        {this.renderList()}
        {this.renderError()}
      </div>
    );
  }
}

const mapStateToProps = ({ images }) => {
  const { list, offset, loading, error } = images;

  return { list, offset, loading, error };
}

export default connect(
  mapStateToProps,
  actions
)(ImageList);