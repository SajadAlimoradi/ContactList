import readline from 'readline/promises'
import {stdin as input, stdout as output} from 'process'
import fs from 'fs/promises'
import { json } from 'stream/consumers'


const CONTACTS_LIST_FILE_PATH =     './data/contacts-list.json'

const rl = readline.createInterface({input, output})
const contactList = []



async function saveContact(){
    try{
        const contactListJSON = JSON.stringify(contactList)
        await fs.writeFile(CONTACTS_LIST_FILE_PATH, contactListJSON)
    } catch(error) {
        throw error;
    }

}


async function loadContacts(){
    try {
        const contactListJSON = await fs.readFile(CONTACTS_LIST_FILE_PATH, 'utf-8');
        contactList.push(
            ...JSON.parse(contactListJSON)
        );
    } catch(error) {
        throw error
    }
}


async function help(){
    console.log('n: Add new Contact \nl:show contact list \nq:quit')
    const action = await rl.question("Enter you'r action: ")
    console.log(action)

    if (action === 'n'){
        await addNewContact();
    } else if (action === 'l'){
        showContactList();
    } else{
        quit();
        return
    }

    help()
}


async function addNewContact(){
    const firstName = await rl.question('First Name: ')
    const lastName = await rl.question('Last Name: ')
    
    const newContact = {
        id: contactList.length,
        firstName,
        lastName
    }
    contactList.push(newContact)
    saveContact();
}


function showContactList (){
    const fromattedContactList = contactList
            .map(({id, firstName, lastName})=> ` #${id} ${firstName} ${lastName}`)
            .join('\n')
    console.log('Contacts List: ')
    console.log(fromattedContactList)
}


function quit(){
    rl.close()
}


// await addNewContact();
// showContactList();
// quit();



async function main (){
    await loadContacts();
    help();
}

await main()