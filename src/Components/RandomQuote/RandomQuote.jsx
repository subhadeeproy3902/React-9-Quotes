import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import { BiRefresh, BiLogoTwitter } from 'react-icons/bi';

const RandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [usedQuotes, setUsedQuotes] = useState([]);

  const loadQuotes = async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const quotes = await response.json();
      let filteredQuotes = quotes.filter(
        (quote) => !usedQuotes.includes(quote.text)
      );

      // If all quotes have been used, reset the usedQuotes list.
      if (filteredQuotes.length === 0) {
        setUsedQuotes([]);
        filteredQuotes = quotes;
      }

      const select =
        filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

      setQuote(select);

      // Add the used quote to the usedQuotes list.
      setUsedQuotes([...usedQuotes, select.text]);
    } catch (err) {
      console.error('Error loading quotes:', err);
      setError('Failed to load quotes. Please try again later.');
    }
  };

  const random = () => {
    setQuote(null);
    loadQuotes();
  };

  const twitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`
    );
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  return (
    <div className="container">
      {quote === null ? (
        <div className="quote">Loading...</div>
      ) : error ? (
        <div className="quote">{error}</div>
      ) : (
        <div className="xd">
          <div className="quote">{quote.text}</div>
          <div className="lol">
            <div className="line"></div>
            <div className="bottom">
              <div className="author">- {quote.author.split(',')[0]}</div>
              <div className="icons">
                <BiRefresh className="reload" onClick={random} />
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
