import assert from 'assert';
import app from '../../src/app';

describe('\'messages\' service', () => {
  it('registered the service', () => {
    const service = app.service('messages');

    assert.ok(service, 'Registered the service');
  });

  it('creates and processes message, adds user information', async() => {
    const user = await app.service('users').create({
      email: 'messagetest@example.com',
      password: 'supersecret'
    });

    const params = {user};
    const message = await app.service('messages').create({
      text: 'a test',
      additional: 'Should be removed'
    }, params);

    assert.equal(message.text, 'a test');
    assert.equal(message.userId, user._id);
    assert.ok(!message.additional);
    assert.deepEqual(message.user, user);
  })
});
