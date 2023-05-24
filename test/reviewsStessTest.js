
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 }, //ramp up from 0 to 10-VU load test per second, in first 10 seconds
    { duration: '30s', target: 100 }, //ramp up from 10 to 100-VU load test per second, in next 30 seconds
    { duration: '10s', target: 0 }, // ramp down from 100-VU load test per second, in last 10 seconds
  ],
};

let min = 3000000;
let max = 3518965;

let id = Math.floor(Math.random() * (max - min + 1) + min);

export default function () {
  const res =  http.get(`http://localhost:6000/reviews/product_id=${id}`);
  check(res, {'received a response with 200': (response) => response.status === 200});
  sleep(1);
}