import React from 'react';

type VideoTutorialProps = {
  src: string;
};

const VideoTutorial: React.FC<VideoTutorialProps> = (props) => (
  <div className='sc-iframe-container'>
    <iframe
      title='Video Instructions'
      src={props.src}
      allowFullScreen
      loading='lazy'
    >
      Your browser does not support our video player. You can view the video{' '}
      <a href={props.src} target='_blank' rel='noreferrer'>
        here
      </a>
      {/*
       */}
      .
    </iframe>
  </div>
);

export default VideoTutorial;
