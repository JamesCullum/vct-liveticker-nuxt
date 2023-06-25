export const useFilters = () => useState("filters", () => <Array<string>>[]);

const filterListLookup = new Map<string, number>();
filterListLookup.set("Global", 0);
filterListLookup.set("Eastern Europe", 7);

export type advancedFilter = {
  label: string;
  filter: string[];
};
export type filterOpt = string | advancedFilter;

export const filterOptions = <Array<filterOpt>>[
  { label: "Global", filter: ["Masters", "Champions"] },
  // International leagues
  "Americas",
  "Pacific",
  "EMEA",
  // Challengers
  "Brazil",
  "North America",
  "Korea",
  { label: "Eastern Europe", filter: ["East Surge"] },
  "Northern Europe",
  "LATAM",
  "Singapore",
  "Japan",
  "Indonesia",
  "Thailand",
  "DACH",
  "Spain",
  "France",
  "Italy",
  "Portugal",
  "Turkey",
  "Philippines",
  "Oceania",
  "MENA",
];

export function getFilterLabel(index: number): string {
  const option = filterOptions[index];
  return typeof option == "string" ? option : option.label;
}

export function filterContains(label: string, filters: Array<string>): boolean {
  if (!label) return false;

  for (const filterVal of filters) {
    if (filterListLookup.has(filterVal)) {
      // Advanced filters
      const index = filterListLookup.get(filterVal) as number;
      for (const subFilterVal of (filterOptions[index] as advancedFilter)
        .filter) {
        if (label.indexOf(subFilterVal) != -1) return true;
      }
    } else {
      // Normal filters
      if (label.indexOf(filterVal) != -1) return true;
    }
  }
  return false;
}
