<pre><?
    include_once('/home/zero/www/newseater/utils/xml2Array.php');

    $cat = $_GET['cat'];
    $swCat = '&topic=';

    switch($cat) {
        case 'top_stories':
            $swCat = '';
            break;
        case 'world':
            $swCat .= 'w';
            break;
        case 'US':
            $swCat .= 'n';
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
        default: 
            $swCat = '';
    }

    $googleRSS = 'http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&output=rss' . $swCat;
    //echo $googleRSS;


    $xmlNode = simplexml_load_file($googleRSS);
    $arrayData = xmlToArray($xmlNode);
    print_r($arrayData);


    $items = $arrayData['rss']['channel']['item'];
/*
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
    */
    echo  json_encode($newItems);

?>