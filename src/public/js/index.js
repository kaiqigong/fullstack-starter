import app from './app';
const fetch = async () => {
  const promise = new Promise((resolve, reject) => {
    resolve(1);
  });
  const result = await promise;
}
console.log(app);
