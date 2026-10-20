// The four preset areas a new core can be cut from. Names and descriptions are
// the product's own; the colours come from the mineral ramp so an identity
// never arrives wearing a colour the app does not own.
export interface AreaPreset {
  key: string;
  name: string;
  description: string;
  color: string;
}

export const AREA_PRESETS: AreaPreset[] = [
  {
    key: "code",
    name: "Code",
    description: "Programming, development, engineering",
    color: "#24577E",
  },
  {
    key: "write",
    name: "Write",
    description: "Writing, blogging, documentation",
    color: "#466D83",
  },
  {
    key: "design",
    name: "Design",
    description: "UI/UX, graphic design, creative",
    color: "#628BA2",
  },
  {
    key: "exercise",
    name: "Exercise",
    description: "Fitness, sports, movement",
    color: "#7D9CAB",
  },
];
