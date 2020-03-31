import assert from 'assert';
import app from '../../src/app';

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user, encrypts password and adds avatar', async() => {
    const user = await app.service('users').create({
      email: 'test@example.com',
      password: 'secret'
    });

    assert.ok(user.avater !== '');
    assert.ok(user.password !== 'secret');
  });

  it('removes password for external requests', async() => {
    const params = { provider: 'rest'};

    const user = await app.service('users').create({
      email: 'test2@example.com',
      password: 'secret'
    }, params);

    assert.ok(!user.password);
  });
});
