<?
    include_once('/home/zero/www/newseater/utils/xml2Array.php');

    $cat = $_GET['cat'];
    $swCat;

    switch($cat) {
        case 'top_news':
            $swCat = 'topNews';
            break;
        case 'US':
            $swCat = 'domestichNews';
            break;
        case 'world':
            $swCat = 'worldNews';
            break;
        case 'oddly_enough':
            $swCat = 'oddlyEnoughNews';
            break;
        case 'business':
            $swCat = 'businessNews';
            break;
        case 'investing':
            $swCat = 'investingNews';
            break;
        case 'politics':
            $swCat = 'politicsNews';
            break;
        case 'health':
            $swCat = 'healthNews';
            break;
        case 'sports':
            $swCat = 'sportsNews';
            break;
        case 'science':
            $swCat = 'scienceNews';
            break;
        case 'internet':
            $swCat = 'internetNews';
            break;
        case 'technology':
            $swCat = 'technologyNews';
            break;
        case 'entertainment':
            $swCat = 'entertainmentNews';
            break;
    }



    $reutersRSS = 'http://www.reuters.com/rssFeed/' . $swCat ;

    $xmlNode = simplexml_load_file($reutersRSS);
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