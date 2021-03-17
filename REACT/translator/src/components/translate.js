/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import axios from 'axios';

const doTranslation = async (input, languageCode, cancelToken) => {
  //console.log(process.env);
  
  try {
    const { data } = await axios.post(
          `${process.env.REACT_APP_URI}?key=${process.env.REACT_APP_TRANSLATOR_KEY}`,
      {
        q: input,
        target: languageCode
      },
      { cancelToken: cancelToken.token }
    );

    return data.data.translations[0].translatedText;
  } catch (err) {
    return "";
  }
};

export default ({ language, text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      return;
    }

    const cancelToken = axios.CancelToken.source();

    doTranslation(text, language, cancelToken).then(setTranslated);

    return () => {
      try {
        cancelToken.cancel();
      } catch (err) {}
    };
  }, [text, language]);

  return (
    <div>
      <label className="label">Output</label>
      <h1 className="title">{translated}</h1>
    </div>
  );
};
