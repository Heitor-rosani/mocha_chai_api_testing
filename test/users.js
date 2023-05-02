import supertest from 'supertest';
const request = supertest("https://gorest.co.in/public/v2/")
import { expect } from 'chai';
import { userCreator, dataGenderRandom, dataChanger } from '../helper/user_helper.js';

describe('Tests suite users', () => {

  const token = 'Bearer ab6bd7f947aebad9833f4375950a66d8f6d2b49b7eabfebda8cc198605bc303e'
  let userId;
  
  describe('DELETE User', () => {
    before(async () => {
      userId = await userCreator();
    })
    it('Should delete the user', async ()=>{
      before(async () => {
        userId = await userCreator();
      })

      const resp = await request
        .delete(`users/${userId}`)
        .set('Authorization', token);
      expect(resp.statusCode).to.be.eql(204);
    });
  });

  describe('GET User', () => {

    const numberGender = dataGenderRandom();
    it('Should get by id', async ()=>{
      const res = await request
        .get(`users?page=${numberGender[0]}&gender=${numberGender[1]}`)
        .set('Authorization', token);
      res.body.forEach(element => {
        expect(element.name).to.be.a('string');
        expect(element.id).not.to.be.a('string');
        expect(element.gender).to.be.eql(numberGender[1]);
      });
    });
  });

  describe('PUT data user', () => {
    const numberGender = dataGenderRandom();
    it('GET User ID', async () => {
      const res = await request
        .get(`users?page=${numberGender[0]}&gender=${numberGender[1]}`)
        .set('Authorization', token);
      expect(res.statusCode).to.be.eql(200);
      userId = res.body[0].id;
    });

    it('PUT User', async () => {   
      const data = dataChanger();
      const resp = await request
        .put(`users/${userId}`)
        .set('Authorization', token)
        .send(data);
      expect(resp.statusCode).to.be.eql(200);
      const res_put = await request
        .get(`users/${userId}`)
        .set('Authorization', token);
      expect(res_put.statusCode).to.be.eql(200);
      expect(res_put.body.name).to.be.eql(data.name);
      expect(res_put.body.email).to.be.eql(data.email);
    })
  });
})
  