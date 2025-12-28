// __mocks__/axios.js
const axiosMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: () => axiosMock,
  isAxiosError: () => false,
};
module.exports = axiosMock;
