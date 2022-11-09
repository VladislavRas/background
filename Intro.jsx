import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import matrixCanvas from 'root/utils/matrixCanvas';
import { preloader } from 'root/utils/preloader';
import './Intro.scss';

const Intro = () => {
  const [loading, setLoading] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    preloader({
      onChange(percentage, complete) {
        setLoading(percentage);
        if (complete) {
          
        }
      },
    });
  }, []);

  useEffect(() => {
    let matrix = null;
    if (elementRef.current) {
      elementRef.current.width = window.innerWidth;
      elementRef.current.height = window.innerHeight;
      matrix = matrixCanvas(elementRef.current);
    }
    return () => {
      if (matrix) matrix.destroy();
    };
  }, [elementRef.current, viewport]);

  return (
    <CSSTransition
      classNames="intro"
      timeout={1000}
      in={true} // toggle active intro
      mountOnEnter
      unmountOnExit
    >
      <div className="intro" id="intro">
        <canvas className="intro__canvas" ref={elementRef}></canvas>
        <div className="intro__main">
          <img src={require('images/logo.png')} alt="logo" />
          <p>Loading...{loading.toFixed(0)}%</p>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Intro;
