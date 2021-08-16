import { useState } from 'react';

interface HighlightedMatchedPhrase {
  before: string;
  matched: string;
  after: string;
}

export const useHighlightingOfMatchingPhrase = (
  phrase: string,
  searchedPhrase: string
) => {
  const [highlightedMatchedPhrase, setHighlightedMatchedPhrase] =
    useState<HighlightedMatchedPhrase | null>(null);

  const doHighlightMatchedPhrase = (): void => {
    const query = phrase;
    const indexOfMatchingString = searchedPhrase.search(query);
    if (indexOfMatchingString !== -1) {
      const substrBeforeMatched = searchedPhrase.substr(
        0,
        indexOfMatchingString
      );
      const substrMatched = searchedPhrase.substr(
        indexOfMatchingString,
        query.length
      );
      const substrAfterMatched = searchedPhrase.substr(
        indexOfMatchingString + query.length,
        searchedPhrase.length
      );
      setHighlightedMatchedPhrase({
        before: substrBeforeMatched,
        matched: substrMatched,
        after: substrAfterMatched,
      });
    } else {
      setHighlightedMatchedPhrase(null);
    }
  };

  return {
    highlightedMatchedPhrase,
    doHighlightMatchedPhrase,
  };
};
