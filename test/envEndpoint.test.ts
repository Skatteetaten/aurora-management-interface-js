import { request } from './helper';

describe('Env endpoint Test', () => {
  it('Should mask secret values', async () => {
    const res = await request({
      environmentVariables: {
        USER: 'admin',
        PASSWORD: '12345',
        PRIVATE_KEY: '6789',
        TOP_SECRET: 'void',
        SECRET_TO_SHOW: 'no secret',
      },
    })
      .get('/env')
      .expect(200);
    const env = res.body;
    expect(env.USER).toEqual('admin');
    expect(env.PASSWORD).toEqual('**********');
    expect(env.PRIVATE_KEY).toEqual('**********');
    expect(env.TOP_SECRET).toEqual('**********');
    expect(env.SECRET_TO_SHOW).toEqual('no secret');
  });
});
