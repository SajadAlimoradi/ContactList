import readline from 'readline/promises'
import {stdin as input, stdout as output} from 'process'
import fs from 'fs/promises'
import { json } from 'stream/consumers'


import {loadContacts, CONTACTS_LIST_FILE_PATH, formatContactList} from './services.js'

const rl = readline.createInterface({input, output})
const contactList = []



async function deleteContact(){

    if (contactList.length < 1){
        console.error('There is no contact on the list');
        return
    }

    showContactList()

    const contactId = await rl.question('ID: ');
    const contactIndex = contactList.findIndex(({id}) => id === Number(contactId))

    if (contactIndex < 0){
        console.error("Invalid  ID");
        return;
    }

    contactList.splice(contactIndex, 1)
    saveContact()
}



async function saveContact(){
    try{
        const contactListJSON = JSON.stringify(contactList)
        await fs.writeFile(CONTACTS_LIST_FILE_PATH, contactListJSON)
    } catch(error) {
        throw error;
    }

}

async function help(){
    // console.clear()
    console.log('-------- Help --------')
    console.log('n: Add new Contact \nl:show contact list \nq:quit \nd: delete')
    console.log('----------------------')
    const action = await rl.question("Enter you'r action: ")
    console.log(action)

    if (action === 'n'){
        await addNewContact();
    } else if (action === 'l'){
        showContactList();
    } else if (action === 'd'){
        await deleteContact();
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
    const fromattedContactList = formatContactList(contactList)
    console.log(' ------ Contacts List: ------')
    console.log(fromattedContactList)
    console.log(' ------ Contacts List: ------')
}


function quit(){
    rl.close()
}


// await addNewContact();
// showContactList();
// quit();



async function main (){

    const loadContact = await loadContacts();
    contactList.push(...loadContact);
    help();
}

await main()