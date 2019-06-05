<?php
  
  class FbController {
  
    private $dbm;
    private $appID = '281257842778510';
    private $appSecret = '1067161d2ef86e5482d6a4766c3ba15d';
    private $cert = __DIR__ . '/../../cert/cacert.pem';
  
    public function __construct(DBManager $dbm )
    {
        $this->dbm = $dbm;
    }

function getToken($code)
{
    $curl = curl_init();
    $url = "https://graph.facebook.com/v3.3/oauth/access_token?client_id={$this->appID}&redirect_uri=http://localhost:8100/tabs/meals&client_secret={$this->appSecret}&code={$code}";
    curl_setopt_array($curl, [
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_URL => $url,
      CURLOPT_CAINFO => $this->cert,
      CURLOPT_CAPATH => $this->cert
    ]);


    $result = curl_exec($curl);
    if(curl_errno($curl)){
      echo 'Curl error: ' . curl_error($curl);
    }

    curl_close($curl);
    echo json_encode($this->inspectToken($result));
}

function inspectToken($result){
    $curl = curl_init();
    $token = json_decode($result,true)['access_token'];
    $url = "https://graph.facebook.com/debug_token?input_token={$token}&access_token={$this->appID}|{$this->appSecret}";
    curl_setopt_array($curl, [
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_URL => $url,
      CURLOPT_CAINFO => $this->cert,
      CURLOPT_CAPATH => $this->cert
    ]);
    $data = curl_exec($curl);
    if(curl_errno($curl)){
      echo 'Curl error: ' . curl_error($curl);
    }
    return $this->getUserData($data,$token);
  }

function getUserData($data,$token){
  $curl = curl_init();
  $userID = json_decode($data,true)['data']['user_id'];
  $url = "https://graph.facebook.com/v3.3/{$userID}?fields=first_name,last_name,picture.width(400).height(400)&access_token={$token}";
  curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => $url,
    CURLOPT_CAINFO => $this->cert,
    CURLOPT_CAPATH => $this->cert
  ]);
  $result = curl_exec($curl);
  if(curl_errno($curl)){
    echo 'Curl error: ' . curl_error($curl);
  }
  return $this->updateUserData($result);
}

function updateUserData($result){
  $data = json_decode($result,true);
  $id = $data['id'];
  $firstName = $data['first_name'];
  $lastName = $data['last_name'];
  $pic = $data['picture']['data']['url'];
  
  $sql = "SELECT CreateUser('$id','$firstName','$lastName','$pic') as 'Login'";
  
  $result = $this->dbm->sqlExecute($sql);
  return $id;
}
  
}
?>
