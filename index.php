<?php 

function getJson($url){
    try{
        $json = file_get_contents($url);
        return json_decode($json, true);
    } catch(\Exception $e){
        return $e->getMessage();
    }
}

function writeJson($url, $data){
    try{
        file_put_contents($url, json_encode($data));
        return true;
    } catch(\Exception $e){
        return $e->getMessage();
    }
}

header('Content-Type: application/json');

$aResult = array();

if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

if( !isset($aResult['error']) ) {

    switch($_POST['functionname']) {
        case 'getJson':
           if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
               $aResult['error'] = 'Error in arguments!';
           }
           else {
               $aResult['result'] = getJson($_POST['arguments'][0]);
           }
           break;
        case 'writeJson':
            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                $aResult['error'] = 'Error in arguments!';
            }
            else {
                $aResult['result'] = writeJson($_POST['arguments'][0], $_POST['arguments'][1]);
            }
            break;
        default:
           $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
           break;
    }

}

echo json_encode($aResult);