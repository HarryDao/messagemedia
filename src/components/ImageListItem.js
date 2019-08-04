import React from 'react';

const randomize = (n = 2) => {
  if (n === 1) return Math.random() < 0.5;

  const small = 10 ** (n - 1);
  const big = 10 ** n;
  let num = Math.floor(Math.random() * (big - small)+ small)
    .toString()
    .split('');

  for (let l = num.length, i = l - 3; i > 0; i -= 3) {
    num[i - 1] += ',';
  }

  return num.join('');
}

class ImageListItem extends React.PureComponent {
  renderUserImage() {
    const { userImage, user } = this.props;
    if (userImage) {
      return <img src={userImage} alt={user} />;
    }

    return <i className='fas fa-user'/>
  }

  onButtonClick = () => {
    const { id, onSelect } = this.props;
    onSelect(id);
  }

  renderPaperClip() {
    if (randomize(1)) {
      return <span><i className='fas fa-paperclip'/></span>;
    }
  }

  render() {
    const {
      url,
      user,
    } = this.props;
    const style={ backgroundImage: `url(${url})` };

    return (
      <div
        className='ImageListItem'
      >
        <div
          className='image'
          onClick={this.onButtonClick}
        >
          <div className='inner'>

            <div
              className='image-container'
              style={style}
            />

            <div className='stats'>
              <div className='left'>
                {this.renderPaperClip()}
              </div>

              <div className='right'>
                <span><i className='fas fa-eye'/>{randomize(4)}</span>
                <span><i className="fas fa-comment"/>{randomize(2)}</span>
                <span><i className="fas fa-heart"/>{randomize(3)}</span>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className='user'>
          <div>{this.renderUserImage()}</div>
          <div>{user}</div>
        </div>
      </div>
    );
  }
}

export default ImageListItem;