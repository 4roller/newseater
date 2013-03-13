<?
    include_once('/home/zero/www/newseater/utils/xml2Array.php');

    $cat = $_GET['cat'];
    $swCat;

    switch($cat) {
        case 'top_stories':
            $swCat = '';
            break;
        case 'world':
            $swCat = 'world';
            break;
        case 'business':
            $swCat = 'business';
            break;
        case 'politics':
            $swCat = 'politics';
            break;
        case 'health':
            $swCat = 'health';
            break;
        case 'education':
            $swCat = 'education';
            break;
        case 'science_and_environment':
            $swCat = 'science_and_environment';
            break;
        case 'technology':
            $swCat = 'technology';
            break;
        case 'entertainment_and_arts':
            $swCat = 'entertainment_and_arts';
            break;
    }



    $bbcRSS = 'http://feeds.bbci.co.uk/news/' . $swCat . '/rss.xml';

    $xmlNode = simplexml_load_file($bbcRSS);
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