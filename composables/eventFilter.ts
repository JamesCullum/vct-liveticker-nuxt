export const useFilters = () => useState("filters", () => <Array<string>>[]);

const filterListLookup = new Map<string, number>();
filterListLookup.set("Global", 0);
filterListLookup.set("Eastern Europe", 8);
filterListLookup.set("Turkey", 20);

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
  "China",
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
  { label: "Turkey", filter: ["Turkey", "Türkiye"] },
  "Philippines",
  "Oceania",
  "MENA",
];

export function getFilterLabel(index: number): string {
  const option = filterOptions[index];
  return typeof option == "string" ? option : option.label;
}

export function filterContains(label: string, filters: Array<string>): number | null {
  if (!label) return null;

  for (const filterVal of filters) {
    if (filterListLookup.has(filterVal)) {
      // Advanced filters
      const index = filterListLookup.get(filterVal) as number;
      for (const subFilterVal of (filterOptions[index] as advancedFilter)
        .filter) {
        if (label.indexOf(subFilterVal) != -1) return index;
      }
    } else {
      // Normal filters
      const index = label.indexOf(filterVal);
      if(index != -1) return index;
    }
  }
  return null;
}

// Given two labels, check which one is higher up the list
// By doing it in a joined function, we don't need multiple iterations
export function findFirstFilter(labelA: string, labelB: string): number {
  if(!labelA && !labelB) return 0;
  if(!labelB) return -1;
  if(!labelA) return 1;

  for (const filterVal of filterOptions) {
    if(typeof filterVal === 'string') {
      // Normal filters
      const indexA = labelA.indexOf(filterVal);
      const indexB = labelB.indexOf(filterVal);
      if(indexA != -1 && indexB != -1) return 0;
      if(indexA != -1 && indexB == -1) return -1;
      if(indexB != -1 && indexA == -1) return 1;
    } else {
      // Advanced filter
      for (const subFilterVal of filterVal.filter) {
        const indexA = labelA.indexOf(subFilterVal);
        const indexB = labelB.indexOf(subFilterVal);
        if(indexA != -1 && indexB != -1) return 0;
        if(indexA != -1 && indexB == -1) return -1;
        if(indexB != -1 && indexA == -1) return 1;
      }
    }
  }
  return 0;
}