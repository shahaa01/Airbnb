const p = Promise.reject(Promise.resolve("aadi"));

Promise.resolve(p).then(data => {
  console.log("✅ Still hi:", data); // "hi"
}).catch(err => console.log(`error is ${err.message}`));
