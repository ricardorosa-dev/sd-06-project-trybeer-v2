import React from 'react';
import './Loading.scss';
import loadingGif from '../../assets/gifs/loading.gif';

const Loading = () => (
  <div className="loading">
    <img src={ loadingGif } width="800px" alt="loading gif" />
  </div>
);

export default Loading;
