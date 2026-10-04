import { buildStrata, type Stratum } from "../lib/strata";
const record = (
  id: string,
  minutes: number,
  date = "2026-10-05",
  recordedAt = 0,
): Stratum => ({ id, minutes, date, recordedAt, identityId: "writing" });

test("an empty history has no invented recorded layers", () => {
  expect(buildStrata([])).toMatchObject({
    layers: [],
    recordCount: 0,
    totalMinutes: 0,
    preview: null,
  });
});

test("longer sessions deposit thicker layers and a save adds a distinct top layer", () => {
  const rock = buildStrata([
    record("first", 15, "2026-10-04"),
    record("next", 60),
  ]);
  expect(rock.recordCount).toBe(2);
  expect(rock.totalMinutes).toBe(75);
  expect(rock.layers[1].id).toBe("next");
  expect(rock.layers[1].top - rock.layers[1].bottom).toBeGreaterThan(
    rock.layers[0].top - rock.layers[0].bottom,
  );
});

test("large histories preserve every record and minute while compressing earlier work", () => {
  const records = Array.from({ length: 100 }, (_, i) =>
    record(String(i), 60, "2026-10-05", i),
  );
  const rock = buildStrata(records);
  expect(rock.layers).toHaveLength(8);
  expect(rock.earlierCount).toBe(93);
  expect(rock.layers.reduce((sum, layer) => sum + layer.records, 0)).toBe(100);
  expect(rock.layers.reduce((sum, layer) => sum + layer.minutes, 0)).toBe(6000);
  expect(rock.layers.at(-1)?.id).toBe("99");
  expect(rock.layers.at(-1)!.top).toBeCloseTo(96, 8);
});

test("the live layer grows without counting unsaved time or mutating stored records", () => {
  const saved = [record("saved", 15)];
  const early = buildStrata(saved, 1);
  const later = buildStrata(saved, 15);
  expect(later.preview!.top - later.preview!.bottom).toBeGreaterThan(
    early.preview!.top - early.preview!.bottom,
  );
  expect(later.totalMinutes).toBe(15);
  expect(later.recordCount).toBe(1);
  expect(buildStrata(saved).preview).toBeNull();
  expect(saved).toEqual([record("saved", 15)]);
});

test("backdated logs settle into chronological history, with deterministic same-day order", () => {
  const rock = buildStrata([
    record("new", 15, "2026-10-05", 100),
    record("retro", 30, "2026-09-29"),
    record("earlier", 20, "2026-10-05", 50),
  ]);
  expect(rock.layers.map((l) => l.id)).toEqual(["retro", "earlier", "new"]);
});

test("invalid or zero effort cannot fabricate saved layers", () => {
  const rock = buildStrata([
    record("zero", 0),
    record("negative", -15),
    record("invalid", NaN),
    record("valid", 15),
  ]);
  expect(rock.recordCount).toBe(1);
  expect(rock.totalMinutes).toBe(15);
});
