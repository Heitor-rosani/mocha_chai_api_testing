import supertest from 'supertest';
const request = supertest("https://gorest.co.in/public/v2/")
import { faker } from '@faker-js/faker';  


export const userCreator = async () => {
  const token = 'Bearer ab6bd7f947aebad9833f4375950a66d8f6d2b49b7eabfebda8cc198605bc303e';

  const data = {
    email: faker.internet.email(),
    name: faker.internet.userName(),
    gender: 'Male',
    status: 'Active'
  };

  const res = await request
    .post('users')
    .set('Authorization', token)
    .send(data);
  return res.body.id;
}

export const dataGenderRandom = () => {
  var number = Math.floor(Math.random() * 10);
  const gender = ['male', 'female']
  var gender_type = gender[Math.floor(Math.random() * gender.length)]

  return [number, gender_type];
}

export const dataChanger = () => {
  const data = {
    email: faker.internet.email(),
    name: faker.internet.userName()
  };
  return data
}

