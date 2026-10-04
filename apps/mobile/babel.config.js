module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // NativeWind v4 uses the jsxImportSource to compile `className`.
      // zustand ships `import.meta.env.MODE` guards, which Hermes cannot parse
      // and a classic web script cannot run, so we transform them at build time.
      [
        "babel-preset-expo",
        { jsxImportSource: "nativewind", unstable_transformImportMeta: true },
      ],
      "nativewind/babel",
    ],
  };
};
