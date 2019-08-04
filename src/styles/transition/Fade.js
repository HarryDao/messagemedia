import React from 'react';
import { Transition } from 'react-transition-group';


const Fade = ({ in: inProp, isFlex }, componentCreator, duration = 300) => {
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
        display: 'none',
    };
    const display = isFlex ? 'flex' : 'block';

    const transitionStyles = {
        entering: { opacity: 0, display },
        entered: { opacity: 1, display },
        exiting: { opacity: 0, display },
    };

    const createComponent = (state) => {
        const transitionStyle = transitionStyles[state];
        return componentCreator({ ...defaultStyle, ...transitionStyle });
    }
    

    return (
        <Transition in={inProp} timeout={duration}>
            {state => createComponent(state)}
        </Transition>
    );
}


export { Fade };


