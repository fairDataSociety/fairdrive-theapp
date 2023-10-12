import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';
import SearchContext from '@context/SearchContext';

import SearchLightIcon from '@media/UI/search-light.svg';
import SearchDarkIcon from '@media/UI/search-dark.svg';
import CloseLightIcon from '@media/UI/close-light.svg';
import CloseDarkIcon from '@media/UI/close-light.svg';

import classes from './SearchBar.module.scss';
import { useLocales } from '@context/LocalesContext';
import { useForm } from 'react-hook-form';
import PodContext from '@context/PodContext';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const { theme } = useContext(ThemeContext);
  const { updateSearch, searchDisabled } = useContext(SearchContext);
  const { activePod, loading } = useContext(PodContext);
  const { intl } = useLocales();
  const { register, handleSubmit, reset } = useForm<{ search: '' }>();

  const onSubmitInternal = ({ search }) => updateSearch(search);

  return (
    <form
      className="flex justify-center items-center w-80 md:w-98 h-10 py-2 px-4 bg-color-shade-dark-4-day dark:bg-color-shade-dark-4-night border border-color-shade-black-day dark:border-color-shade-dark-1-night effect-style-small-button-drop-shadow rounded"
      onSubmit={handleSubmit(onSubmitInternal)}
    >
      <span className="cursor-pointer" onClick={handleSubmit(onSubmitInternal)}>
        {theme === 'light' ? (
          <SearchLightIcon className="inline-block mr-1" />
        ) : (
          <SearchDarkIcon className="inline-block mr-1" />
        )}
      </span>

      <input
        type="text"
        id="search"
        name="search"
        disabled={!activePod || loading || searchDisabled}
        placeholder={intl.get('SEARCH')}
        className={`${classes.searchBar} ${
          theme === 'light' ? classes.searchBarLight : classes.searchBarDark
        }`}
        {...register('search', { required: true })}
      />

      <div
        className="cursor-pointer"
        onClick={() => {
          reset();
          updateSearch('');
        }}
      >
        {theme === 'light' ? (
          <CloseLightIcon className="inline-block mr-1" />
        ) : (
          <CloseDarkIcon className="inline-block mr-1" />
        )}
      </div>
    </form>
  );
};

export default SearchBar;
