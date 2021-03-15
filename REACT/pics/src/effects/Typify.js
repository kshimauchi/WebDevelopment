import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

const ReactTypingEffectFunc= () => {
    return (
        <div>
        <ReactTypingEffect
          text = {"Welcome to Search Bucket..."}
          cursorRenderer={cursor => <h3>{cursor}</h3>}
          displayTextRenderer={(text, i) => {
            return (
              <h3>
                {text.split('').map((char, i) => {
                  const key = `${i}`;
                  return (
                    <span
                      key={key}
                      style={i%2 === 0 ? { color: '#FFFFF'} : {}}
                    >{char}</span>
                  );
                })}
              </h3>
            );
          }}
          speed= {"20ms"}
        />
        </div>
    );
  };
export default ReactTypingEffectFunc;