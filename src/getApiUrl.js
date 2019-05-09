export default ({ pathname }) => {
  if (global.config.useMock) {
    return `${global.config.apiUrl}/mocks${pathname}.json`;
  }

  return `${global.config.apiUrl}${pathname}`;
};
