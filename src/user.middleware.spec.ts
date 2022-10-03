import { UserMiddleware } from './middleware';

describe('UserMiddleware', () => {
  it('should be defined', () => {
    expect(new UserMiddleware()).toBeDefined();
  });
});
