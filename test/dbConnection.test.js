const request = require('supertest');
const server = require('../server/index')

describe('get product Reviews', ()=>{
  test('Should retrieve LATEST 5 reviews of product_id 12', (done) => {
    request(server)
    .get('/reviews/12?product_id=12&sort=newest&count=5')
    .end((err, res) => {
    var result = JSON.parse(res.text);
      expect(res.statusCode).toEqual(200);
      expect(result.product_id).toBe(12);
      expect(result.counts).toBe(5);
      expect(result.results.length).toBe(5);
      done();
    })
  })
})

describe('get product Metadata', ()=>{
  test('Should retrieve metadata of product_id 12', (done)=> {
  request(server)
  .get('/reviews/12/metadata')
  .end((err, res) => {
    var result = JSON.parse(res.text);
    console.log('result', result)
    expect(res.statusCode).toEqual(200);
    expect(typeof (result.ratings)).toBe('object');
    expect(typeof (result.characteristics)).toBe('object');
    done();
  })
  })
})

describe('search keyword in Reviews', ()=>{
  test('Should retrieve reviews with keyword xxx of product_id 12', (done)=> {
  request(server)
  .get('/reviews/12/search?keyword=xxx&product_id=12')
  .end((err, res) => {
    var result = JSON.parse(res.text);
    expect(res.statusCode).toEqual(200);
    expect(result.length).not.toEqual(0);
    done();
  })
  })
})

describe('post a new Review', ()=>{
  test('Should post a new review of product_id 12', (done)=> {
  request(server)
  .post('/reviews/12/postReview/?product_id=12&rating=3&recommend=TRUE&characteristics={"Fit": {"id": 39, "value": 2}, "Length": {"id": 40, "value": 2}, "Comfort": {"id": 41, "value": 2},"Quality": {"id": 42, "value": 3}}&summary=xxxxxxxddd&body=yyyyyyyyyyyyyyyyyy&photos=&reviewer_name=polar&reviewer_email=polar@mail')
  .end((err, res) => {
    expect(res.statusCode).toEqual(201);
    expect(res.text).toBe('review posted successfully');
    done();
  })
  })
})

describe('mark Review helpful', ()=>{
  test('Should mark review helpful (review_id = 20) of product_id 12', (done)=> {
  request(server)
  .put('/reviews/12/helpful?review_id=20')
  .end((err, res) => {
    expect(res.statusCode).toEqual(204);
    done();
  })
  })
})
