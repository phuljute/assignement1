const express = require('express')
const app = express()
const port = 1234
const https = require('https');
const request = require('request');
const urlPrefix = "https://github.com"

app.get('/repositories/:owner/:repositoy/commit/:commitSHA',async (req, res) => { 

let url = urlPrefix + '/'+ req.params.owner + '/' + req.params.repositoy + '/'+ "commit" +'/'+ req.params.commitSHA;
https.get(url, (resp) => {
  let data = '';
//   A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})