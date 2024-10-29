import request from 'supertest';

import app from '../../src/app.js';

describe('User API', () => {
  it('Should return all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0].name).toBe('Jhon Doe');
  });

  it('Should return a user by id', async () => {
    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jhon Doe');
  });

  it('Should return 404 if user not found', async () => {
    const response = await request(app).get('/api/users/444444');

    expect(response.status).toBe(404);
    expect(response.text).toBe('User not found');
  });

  it('Should create a new user', async () => {
    const newUser = {
      name: 'Muhanned',
      email: 'Muhanned@gmail.com',
    };
    const response = await request(app).post('/api/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Muhanned');
    expect(response.body.email).toBe('Muhanned@gmail.com');
    expect(response.body).toHaveProperty('id');
  });

  it('Should update an existing user', async () => {
    const updateUSer = {
      name: 'John Doe',
      email: 'newJhon@example.com',
    };

    const response = await request(app).put('/api/users/1').send(updateUSer);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateUSer.name);
    expect(response.body.email).toBe(updateUSer.email);
  });

  it('Should return 404 when trying to update non-existing user', async () => {
    const updateUSer = {
      name: 'John Doe',
      email: 'newJhon@gmail.com',
    };

    const response = await request(app).put('/api/users/4444').send(updateUSer);

    expect(response.status).toBe(404);
    expect(response.text).toBe('User not found');
  });

  it('Should delete a user', async () => {
    const response = await request(app).delete('/api/users/1');

    expect(response.status).toBe(204);
  });

  it('Should return a 404 when trying to delete a non-existent user', async () => {
    const response = await request(app).delete('/api/users/4444');

    expect(response.status).toBe(404);
    expect(response.text).toBe('User not found');
  });
});
