// import http from 'k6/http';
// import {sleep} from 'k6';

// export const options = {
//   // Key configurations for Stress in this section
//   stages: [
//     { duration: '10s', target: 10 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
//     { duration: '30s', target: 100 }, // stay at higher 200 users for 10 minutes
//     { duration: '5s', target: 0 }, // ramp-down to 0 users
//   ],
// };

// export default () => {
//   const urlRes = http.req('https://test-api.k6.io');
//   sleep(1);
//   // MORE STEPS
//   // Here you can have more steps or complex script
//   // Step1
//   // Step2
//   // etc.
// };

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, //ramp up from 0 to 10-VU load test per second, in first 10 seconds
    { duration: '1m30s', target: 1800 }, //ramp up from 10 to 100-VU load test per second, in next 30 seconds
    { duration: '20s', target: 0 }, // ramp down from 100-VU load test per second, in last 10 seconds
  ],
};

export default function () {
  const res =  http.get('http://localhost:6000/reviews/product_id=12/metadata');
  check(res, {'received a response with 200': (response) => response.status === 200});
  sleep(1);
}

// average request duration 4.39s
// request failed 0.71%
// total request made 29129
// request made per second 237.49/s

