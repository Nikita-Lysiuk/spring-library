import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

export interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filters {
  authors: Set<string>;
  categories: Set<string>;
  languages: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setAuthors: (value: string) => void;
  setCategories: (value: string) => void;
  setLanguages: (value: string) => void;
  setPrices: (name: keyof PriceProps, value: number) => void;
}

export const useFilters = (): ReturnProps => {
  const [searchParams] = useSearchParams();

  const authors = useMemo(
    () => new Set(searchParams.getAll('authors')),
    [searchParams]
  );

  const categories = useMemo(
    () => new Set(searchParams.getAll('categories')),
    [searchParams]
  );

  const languages = useMemo(
    () => new Set(searchParams.getAll('languages')),
    [searchParams]
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const toggle = (set: Set<string>, value: string): Set<string> => {
    const newSet = new Set(set);
    if (newSet.has(value)) newSet.delete(value);
    else newSet.add(value);
    return newSet;
  };

  const [authorsSet, setAuthorsSet] = useState(authors);
  const [categoriesSet, setCategoriesSet] = useState(categories);
  const [languagesSet, setLanguagesSet] = useState(languages);

  const setAuthors = (val: string) => setAuthorsSet(toggle(authorsSet, val));
  const setCategories = (val: string) =>
    setCategoriesSet(toggle(categoriesSet, val));
  const setLanguages = (val: string) =>
    setLanguagesSet(toggle(languagesSet, val));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    authors: authorsSet,
    categories: categoriesSet,
    languages: languagesSet,
    prices,
    setAuthors,
    setCategories,
    setLanguages,
    setPrices: updatePrice,
  };
};
