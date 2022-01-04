import { FC, ReactNode, createContext, useState } from 'react';

interface SearchContext {
  search: string;
  updateSearch: (newSearch: string) => void;
}

interface SearchContextProps {
  children: ReactNode;
}

const searchContextDefaultValues: SearchContext = {
  search: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateSearch: () => {},
};

const SearchContext = createContext<SearchContext>(searchContextDefaultValues);

const SearchProvider: FC<SearchContextProps> = ({ children }) => {
  const [search, setSearch] = useState('');

  const updateSearch = (newSearch: string) => {
    setSearch(newSearch.trim());
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        updateSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;

export { SearchProvider };
