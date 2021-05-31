const rules = [
  {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  },
];

module.exports = {
  load() {
    return rules;
  },
};
