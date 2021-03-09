/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;
const url = require('url');

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","PUT,GET,DELETE,PATCH")
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Origin,Accept,Authorization')

    // .. Here you can create your data response in a JSON format
    const route = url.parse(req.url, true);

    //here we can use the express() routes
    if (route.pathname === '/products/search/') {
        const query = (route.query.query || '').trim();
        const items = route.query.items || 8;

        //we will split the user's query into words and match single words for each item name
        //this is pretty similar to have a elastic-search feature
        //and also we can search by tags
        const search = (string, data) => data.filter(item => 
            RegExp(`^${string.split(' ').map(word => `(?=.*${word})`).join('')}.+`, 'i').test(item.name) ||
            item.tags.filter(tag => RegExp(query, 'i').test(tag)).length
        );

        const results = search(query, data).splice(0, items);

        res.write(JSON.stringify(results));
        return res.end();
    }

    res.write('Products API')
    res.end();
    
}).listen( port );


console.log(`[Server running on ${hostname}:${port}]`);
