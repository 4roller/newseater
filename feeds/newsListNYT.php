<?
//    include_once('/home/zero/www/newseater/utils/xml2Array.php');

    $cat = $_GET['cat'];
    

    switch($cat) {
        case 'popular':
            $swCat = 'all';
            break;
        case 'world':
            $swCat = 'world';
            break;
        case 'arts':
            $swCat = 'arts';
            break;
        case 'business':
            $swCat = 'business';
            break;
        case 'technology':
            $swCat = 'technology';
            break;
        case 'science':
            $swCat = 'science';
            break;
        case 'style':
            $swCat = 'style';
            break;
        case 'travel':
            $swCat = 'travel';
            break;
        case 'sports':
            $swCat = 'sports';
            break;
        case 'opinion':
            $swCat = 'opinion';
            break;
        case 'health':
            $swCat = 'health';
            break;

    }

    $apiKeyStr = '?api-key=a5608436ba93f0ab6b806900459bddd7:5:67368943';
    $nytRSS = 'http://api.nytimes.com/svc/news/v3/content/all/' . $swCat . $apiKeyStr;


    $rawJSON = file_get_contents($nytRSS);
    $output = json_decode($rawJSON,1);

    $items  = $output['results'];
//    print_r($output);

    $newItems = array();
    foreach($items as $key=>$value) {
        $newValues = array();
        foreach($value as $keyi=>$valuei){
            if($keyi !== 'content:encoded' && $keyi !=='guid') {
                $newValues[$keyi] = $valuei;
            }
        }
        $newItems[$key] = $newValues;
    }
    echo  json_encode($newItems);

?>