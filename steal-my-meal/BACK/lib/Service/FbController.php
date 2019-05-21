<?php
//require_once ('db_connection.php');

$code = $_GET['code'];
this.getToken($code);
// $fbController = new FbController();

// class FbController {
  
$clientID = '281257842778510';
$clientSecret = '1067161d2ef86e5482d6a4766c3ba15d';

// function getToken($code)
// {
//     $requestToken = $code;
//     $options = [
//         "hostname" => `facebook.com`,
//         //port: 443,
//         "path" => `/login/oauth/access_token?client_id=.$clientID.&client_secret=.$clientSecret.&code=.$requestToken.`,
//         "method" => 'GET',
//         "headers" => [
//           //    accept: 'application/json' ?
//           'Content-Type' => 'application/json',
//         ]
//     ];
//     $r = new HttpRequest('http://example.com/feed.rss', HttpRequest::METH_GET);
// $r->setOptions(array('lastmodified' => filemtime('local.rss')));
// $r->addQueryData(array('category' => 3));
// try {
//     $r->send();
//     if ($r->getResponseCode() == 200) {
//         file_put_contents('local.rss', $r->getResponseBody());
//     }
// } catch (HttpException $ex) {
//     echo $ex;
// }

//     $http = HTTP.request(options, (resp) => {
//         console.log(`statusCode: ${resp.statusCode}`);
//         resp.on('data', (response) => {
//           process.stdout.write(response);
//           // redirect the user to the welcome page, along with the access token
//           res.redirect(`/success.html?${response}&origin=gh`);
//         });
//       });
//       http.on('error', (error) => {
//         console.error(error);
//       });
//       http.end();
//     })
// }





//   APP.get('/oauth/redirect', (req, res) => {
    
    // const requestToken = req.query.code;
    //   let options = {
    //     hostname: `github.com`,
    //     //port: 443,
    //     path: `/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    //     method: 'GET',
    //     headers: {
    //       //    accept: 'application/json' ?
    //       'Content-Type': 'application/json',
    //     }
    //   };
    //   let http = HTTP.request(options, (resp) => {
    //     console.log(`statusCode: ${resp.statusCode}`);
    //     resp.on('data', (response) => {
    //       process.stdout.write(response);
    //       // redirect the user to the welcome page, along with the access token
    //       res.redirect(`/success.html?${response}&origin=gh`);
    //     });
    //   });
    //   http.on('error', (error) => {
    //     console.error(error);
    //   });
    //   http.end();
    // })
?>










<!-- const X = require('express');
const APP = X();
const HTTP = require('https');
const PORT = 2105;



APP.get('/oauth/redirect', (req, res) => {
const requestToken = req.query.code;
  let options = {
    hostname: `github.com`,
    //port: 443,
    path: `/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    method: 'GET',
    headers: {
      //    accept: 'application/json' ?
      'Content-Type': 'application/json',
    }
  };
  let http = HTTP.request(options, (resp) => {
    console.log(`statusCode: ${resp.statusCode}`);
    resp.on('data', (response) => {
      process.stdout.write(response);
      // redirect the user to the welcome page, along with the access token
      res.redirect(`/success.html?${response}&origin=gh`);
    });
  });
  http.on('error', (error) => {
    console.error(error);
  });
  http.end();
}); -->
