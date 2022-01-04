import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';
import SearchContext from '@context/SearchContext';

import SearchLightIcon from '@media/UI/search-light.svg';
import SearchDarkIcon from '@media/UI/search-dark.svg';
import CloseLightIcon from '@media/UI/close-light.svg';
import CloseDarkIcon from '@media/UI/close-light.svg';

import classes from './SearchBar.module.scss';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const { theme } = useContext(ThemeContext);
  const { search, updateSearch } = useContext(SearchContext);

  return (
    <div className="flex justify-center items-center w-98 h-10 py-2 px-4 bg-color-shade-dark-4-day dark:bg-color-shade-dark-4-night border border-color-shade-black-day dark:border-color-shade-dark-1-night effect-style-small-button-drop-shadow rounded">
      {theme === 'light' ? (
        <SearchLightIcon className="inline-block mr-1" />
      ) : (
        <SearchDarkIcon className="inline-block mr-1" />
      )}

      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search"
        className={`${classes.searchBar} ${
          theme === 'light' ? classes.searchBarLight : classes.searchBarDark
        }`}
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
      />

      <div className="cursor-pointer" onClick={() => updateSearch('')}>
        {theme === 'light' ? (
          <CloseLightIcon className="inline-block mr-1" />
        ) : (
          <CloseDarkIcon className="inline-block mr-1" />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
