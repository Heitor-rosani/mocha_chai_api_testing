import supertest from 'supertest';
const request = supertest("https://gorest.co.in/public/v2/")
import { faker } from '@faker-js/faker'; 
import { expect } from 'chai';


const TOKEN = 'Bearer ab6bd7f947aebad9833f4375950a66d8f6d2b49b7eabfebda8cc198605bc303e'

describe('Test Suite Posts', () => {
  let userId;
  const data = {
    user_id: 1313060,
    title: `${faker.commerce.product()}`,
    body: `${faker.address.street()}`
  }

  describe('POST a post', () => {
    it('POST', async () => {
      const res = await request
        .post('posts')
        .set('Authorization', TOKEN)
        .send(data);
      expect(res.statusCode).to.be.eql(201)
      expect(res.body).to.deep.include(data)
      userId = res.body.id
    }) 
  })

  describe('GET post', () => {
    it('GET All', async () => {
      const res = await request
        .get('/posts')
        .set('Authorization', TOKEN)
      expect(res.statusCode).to.be.eql(200)
    })

    it('GET post by Id', async () => {
      const res = await request
        .get(`/posts/${userId}`)
        .set('Authorization', TOKEN)
      expect(res.statusCode).to.be.eql(200)
      expect(res.body).to.deep.include(data)
    })
  })
})