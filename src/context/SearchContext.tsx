import { FC, ReactNode, createContext, useState } from 'react';

interface SearchContext {
  search: string;
  searchDisabled: boolean;
  updateSearch: (newSearch: string) => void;
  setSearchDisabled: (disabled: boolean) => void;
}

interface SearchContextProps {
  children: ReactNode;
}

const searchContextDefaultValues: SearchContext = {
  search: '',
  searchDisabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateSearch: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSearchDisabled: () => {},
};

const SearchContext = createContext<SearchContext>(searchContextDefaultValues);

const SearchProvider: FC<SearchContextProps> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [searchDisabled, setSearchDisabled] = useState<boolean>(false);

  const updateSearch = (newSearch: string) => {
    setSearch(newSearch.trim());
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        searchDisabled,
        updateSearch,
        setSearchDisabled,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;

export { SearchProvider };
