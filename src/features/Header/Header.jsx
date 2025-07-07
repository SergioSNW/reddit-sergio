import React, { useState, useEffect } from 'react';
import './Header.css';
import { setSearchTerm } from '../../store/redditSlice';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdMedical } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  const [searchTermBar, setSearchTermBar] = useState('');
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();

  // This function keeps track of the User input typed on the input field
  // It will be added to the input JSX element
  const onSearchTermChange = (e) => {
    setSearchTermBar(e.target.value);
  };

  useEffect(() => {
    setSearchTermBar(searchTerm);
  }, [searchTerm]);

  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermBar));
  };

  return (
    <header>
      <div className="logo">
        <IoMdMedical className="logo-img" />
        <h2 className="title">
          Reddit <span>Sergio</span>
        </h2>
      </div>
      <form className="search" onSubmit={onSearchTermSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTermBar}
          onChange={onSearchTermChange}
          aria-label="search-posts"
        ></input>
        <button type="submit" onClick={onSearchTermSubmit} aria-label="Search">
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

export default Header;
