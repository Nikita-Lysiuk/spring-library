import { useFilters, useMeta, useQueryFilters } from '@/features/books/hooks';
import { languages } from '@/features/books/types';
import { Input } from '@/components/ui/input';
import { CheckboxFiltersGroup, RangeSlider } from '@/components';

interface Props {
  className?: string;
}

const Filters = ({ className }: Props) => {
  const { authors, categories, isLoading } = useMeta();
  const filters = useFilters();

  useQueryFilters(filters);

  const authorsList = authors.map(a => ({
    value: a.id,
    text: a.name,
  }));

  const categoriesList = categories.map(c => ({
    value: c.id,
    text: c.name,
  }));

  const languagesList = languages.map(l => ({
    value: l.value,
    text: l.label,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold mb-5">Filter</h2>

      <CheckboxFiltersGroup
        title="Authors"
        name="authors"
        className="mt-5"
        limit={6}
        defaultItems={authorsList.slice(0, 6)}
        items={authorsList}
        loading={isLoading}
        onClickCheckbox={filters.setAuthors}
        selected={filters.authors}
      />

      <CheckboxFiltersGroup
        title="Categories"
        name="categories"
        className="mt-5"
        limit={6}
        defaultItems={categoriesList.slice(0, 6)}
        items={categoriesList}
        loading={isLoading}
        onClickCheckbox={filters.setCategories}
        selected={filters.categories}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-semibold mb-3">Price from and to</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0.0}
            max={500.0}
            value={String(filters.prices.priceFrom)}
            onChange={e =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="500"
            min={20.0}
            max={500.0}
            value={String(filters.prices.priceTo)}
            onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <div className="pr-6">
          <RangeSlider
            min={0.0}
            max={500.0}
            step={0.2}
            value={[
              filters.prices.priceFrom || 0.0,
              filters.prices.priceTo || 500.0,
            ]}
            onValueChange={updatePrices}
          />
        </div>
      </div>

      <CheckboxFiltersGroup
        title="Languages"
        name="languages"
        className="my-5"
        limit={6}
        defaultItems={languagesList.slice(0, 6)}
        items={languagesList}
        loading={isLoading}
        onClickCheckbox={filters.setLanguages}
        selected={filters.languages}
      />
    </div>
  );
};

export default Filters;
