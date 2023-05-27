
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // stages: [
  //   { duration: '10s', target: 100 }, //ramp up from 0 to 10-VU load test per second, in first 10 seconds
  //   { duration: '1m', target: 2000 }, //ramp up from 10 to 100-VU load test per second, in next 30 seconds
  //   { duration: '20s', target: 0 }, // ramp down from 100-VU load test per second, in last 10 seconds
  // ],
  vus: 450,
  duration: '1m'
};

let min = 500009;
let max = 600011;

let id = Math.floor(Math.random() * (max - min + 1) + min);

export default function () {
  const res =  http.get(`http://localhost:6000/reviews?product_id=${id}`);
  check(res, {'received a response with 200': (response) => response.status === 200});
  sleep(1);
}