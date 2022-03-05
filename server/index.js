const express = require('express');
const cors = require('cors');
const app = express();

let data = [

    {
        "id": "123-s2-546",
        "name": "John Jacobs",
        "items": [
            "bucket",
            "bottle"
        ],
        "address": "1st Cross, 9th Main, abc Apartment",
        "pincode": "5xx012"
    },
    {
        "id": "123-s3-146",
        "name": "David Mire",
        "items": [
            "Bedroom Set"
        ],
        "address": "2nd Cross, BTI Apartment",
        "pincode": "4xx012"
    },
    {
        "id": "223-a1-234",
        "name": "Soloman Marshall",
        "items": [
            "bottle"
        ],
        "address": "Riverbed Apartment",
        "pincode": "4xx032"
    },
    {
        "id": "121-s2-111",
        "name": "Ricky Beno",
        "items": [
            "Mobile Set"
        ],
        "address": "Sunshine City",
        "pincode": "5xx072"
    },
    {
        "id": "123-p2-246",
        "name": "Sikander Singh",
        "items": [
            "Air Conditioner"
        ],
        "address": "Riverbed Apartment",
        "pincode": "4xx032"
    },
    {
        "id": "b23-s2-321",
        "name": "Ross Wheeler",
        "items": [
            "Mobile"
        ],
        "address": "1st Cross, 9th Main, abc Apartement",
        "pincode": "5xx012"
    },
    {
        "id": "113-n2-563",
        "name": "Ben Bish",
        "items": [
            "Kitchen Set",
            "Chair"
        ],
        "address": "Sunshine City",
        "pincode": "5xx072"
    },
    {
        "id": "323-s2-112",
        "name": "John Michael",
        "items": [
            "Refrigerator"
        ],
        "address": "1st Cross, 9th Main, abc Apartement",
        "pincode": "5xx012"
    },
    {
        "id": "abc-34-122",
        "name": "Jason Jordan",
        "items": [
            "Mobile"
        ],
        "address": "Riverbed Apartment",
        "pincode": "4xx032"
    }

]

app.use(cors())
app.get('/search', function (req, res, next) {
    const value = req.query.value;
    console.log(req.query)
    let results = [];
    if(value == '')
        results = data
    else
        results = data.filter(item => {
        let flag = false;
        Object.keys(item).forEach(key => {
            if (key !== 'items' && item[key].toLowerCase().includes(value.toLowerCase()))
                flag = true;
            else if(key === 'items'){
                item[key].forEach(val => {
                    if(val.toLowerCase().includes(value.toLowerCase()))
                        flag = true;
                })
            }
        })
        return flag;
    })
    res.json({results})
})

app.listen(3001, ()=>{
    console.log("listening at port %d", 3001)
})
