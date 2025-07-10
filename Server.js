import http from 'http'
import url from 'url'

import { loadContacts } from './services.js';

const contactList = [];

const server = http.createServer((req, res) => {
    const urlData = url.parse(req.url, true);
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    res.write(
        JSON.stringify(contactList)
    );
    res.end()
})


async function main (){

    const loadContact = await loadContacts();
    contactList.push(...loadContact);
     
    server.listen(3000, () =>{
        console.log("Http server is listening on the port 3000")
    })
}

await main()