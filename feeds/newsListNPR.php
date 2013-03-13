<?
    include_once('/home/zero/www/newseater/utils/xml2Array.php');

    $cat = $_GET['cat'];
    $swCat = 100;

    switch($cat) {
        case 'top_stories':
            $swCat = 1001;
            break;
        case 'world':
            $swCat = 1004;
            break;
        case 'US':
            $swCat = 1003;
            break;
        case 'business':
            $swCat = 1006;
            break;
        case 'US':
            $swCat = 1003;
            break;
        case 'people_places':
            $swCat = 1021;
            break;
        case 'technology':
            $swCat = 1019;
            break;
        case 'health_science':
            $swCat = 1007;
            break;
        case 'arts_culture':
            $swCat = 1008;
            break;
        case 'food':
            $swCat = 1053;
            break;
        case 'opinion':
            $swCat = 1057;
            break;
        case 'pop_culture':
            $swCat = 1048;
            break;
    }


    $nprRSS = 'http://www.npr.org/rss/rss.php' . '?id=' . $swCat;


    $xmlNode = simplexml_load_file($nprRSS);
    $arrayData = xmlToArray($xmlNode);

    $items = $arrayData['rss']['channel']['item'];

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