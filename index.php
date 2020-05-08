<?php 

function getJson($url){
    try{
        $json = file_get_contents($url);
        return json_decode($json);
    } catch(\Exception $e){
        return $e->getMessage();
    }
}

function writeJson($url, $data){
    try{
        file_put_contents($url, $data);
        return true;
    } catch(\Exception $e){
        return $e->getMessage();
    }
}

header('Content-Type: application/json');
try{

    $aResult = array();
    $data = json_decode(file_get_contents('php://input'), true);
    
    if( !isset($data["functionname"]) ) {
        $aResult['error'] = 'No function name!'; 
    }
    
    if( !isset($data["arguments"]) ) {
        $aResult['error'] = 'No function arguments!'; 
    }
    
    if( !isset($aResult['error']) ) {

        switch($data["functionname"]) {
            case 'getJson':
                if( !is_array($data["arguments"]) || (sizeof($data["arguments"]) < 1) ) {
                    $aResult['error'] = 'Error in arguments!';
                }
                else {
                    $aResult['result'] = getJson($data["arguments"][0]);
                }
            break;
            case 'writeJson':
                if( !is_array($data["arguments"]) || (count($data["arguments"]) < 2) ) {
                    $aResult['error'] = 'Error in arguments!';
                }
                else {
                    $aResult['result'] = writeJson($data["arguments"][0], $data["arguments"][1]);
                }
                break;
            default:
            $aResult['error'] = 'Not found function '.$data["functionname"].'!';
            break;
        }

    }

    echo json_encode($aResult);

} catch(\Exception $e){
    echo ($e->getMessage());
}