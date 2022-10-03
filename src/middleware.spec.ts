import { Middleware } from './middleware';

describe('UserMiddleware', () => {
  it('should be defined', () => {
    expect(new Middleware()).toBeDefined();
  });
});
