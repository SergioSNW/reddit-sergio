import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { setSearchTerm, setSelectedSubreddit } from '../../store/redditSlice';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdMedical } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { fetchSubredditSuggestions } from '../../api/reddit';
import ThemeToggle from '../Theme/ThemeToggle';

const Header = () => {
  const [searchTermBar, setSearchTermBar] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();
  const timeoutRef = useRef();

  // This function keeps track of the User input typed on the input field
  // It will be added to the input JSX element
  const onSearchTermChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));
    setShowDropdown(!!value);

    clearTimeout(timeoutRef.current);
    if (value) {
      // Debounce API call
      timeoutRef.current = setTimeout(async () => {
        const suggestions = await fetchSubredditSuggestions(value);
        console.log('Suggestions:', suggestions);
        setSuggestions(suggestions);
      }, 200);
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionClick = (subreddit) => {
    dispatch(setSelectedSubreddit(`r/${subreddit}`));
    dispatch(setSearchTerm(subreddit));
    setSuggestions([]);
    setShowDropdown(false);
  };

  useEffect(() => {
    setSearchTermBar(searchTerm);
  }, [searchTerm]);

  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    console.log('Submit triggered!');
    if (searchTerm.trim() === '') return;
    // Ensure the subreddit string starts with "r/"
    const subreddit = searchTerm.startsWith('r/')
      ? searchTerm
      : `r/${searchTerm}`;
    dispatch(setSelectedSubreddit(subreddit));
    setShowDropdown(false);
    // dispatch(setSearchTerm(searchTermBar));
    dispatch(setSearchTerm(''));
  };

  return (
    <header>
      <div className="logo">
        <IoMdMedical className="logo-img" />
        <h2 className="title">
          Reddit <span>Sergio</span>
        </h2>
      </div>
      <ThemeToggle />
      <form className="search" onSubmit={onSearchTermSubmit}>
        <input
          type="text"
          placeholder="Search for a Subreddit"
          value={searchTermBar}
          onChange={onSearchTermChange}
          aria-label="search-posts"
        ></input>
        <button type="submit" onClick={onSearchTermSubmit} aria-label="Search">
          <FaSearch />
        </button>
        {showDropdown && suggestions.length > 0 && (
          <ul
            className="autocomplete-dropdown"
            style={{
              position: 'absolute',
              zIndex: 100,
              background: 'white',
              border: '1px solid #ccc',
              width: '100%',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {suggestions.map((name) => (
              <li
                key={name}
                style={{ padding: '0.5rem', cursor: 'pointer' }}
                onMouseDown={() => onSuggestionClick(name)}
              >
                {`r/${name}`}
              </li>
            ))}
          </ul>
        )}
      </form>
    </header>
  );
};

export default Header;
