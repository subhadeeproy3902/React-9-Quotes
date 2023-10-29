import React, { useState,} from 'react';
import './RandomQuote.css';
import { BiRefresh, BiLogoTwitter } from 'react-icons/bi';
import axios from 'axios';

const RandomQuote = () => {
  const [error, setError] = useState(null);
  const [quote, setQuote] = useState({
    quote: "In this world, winning is everything. As long as I win in the end.That's all that matters.",
    author: "Subhadeep Roy",
  });
  window.onload = () => {
    setQuote({
      quote: "In this world, winning is everything. As long as I win in the end.That's all that matters.",
      author: "Subhadeep Roy"
    });
  };

  const loadQuotes = async () => {
    setQuote(null);
    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/quotes`, {
        headers: {
          "X-Api-Key": "aMLk9jgL1bB2PQbiJOdshQ==uoNyjIo9ffl4XWTE",
        },
      });
      const newQuote = response.data[0];
      console.log(newQuote)
      console.log(newQuote.quote.length)
      if (newQuote.quote.length < 350) {
        setQuote(newQuote);
      } else {
        loadQuotes();
      }
    } catch (error) {
      setError("Failed to load Quotes");
    }
  };

  const twitter = () => {
    if (quote) {
      window.open(
        `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`
      );
    }
  };

  return (
    <div className="container">
      {quote === null ? (
        <div className="quote">Loading...</div>
      ) : error ? (
        <div className="quote">{error}</div>
      ) : (
        <div className="xd">
          <div className="quote">{quote.quote}</div>
          <div className="lol">
            <div className="line"></div>
            <div className="bottom">
              <div className="author">- {quote.author}</div>
              <div className="icons">
                <BiRefresh className="reload" onClick={loadQuotes} />
                <BiLogoTwitter onClick={twitter} className="twitter" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomQuote;
