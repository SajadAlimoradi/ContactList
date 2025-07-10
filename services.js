
import fs from 'fs/promises'

export const CONTACTS_LIST_FILE_PATH =     './data/contacts-list.json'

export async function loadContacts(){
    try {
        const contactListJSON = await fs.readFile(CONTACTS_LIST_FILE_PATH, 'utf-8');
        return JSON.parse(contactListJSON);
    } catch(error) {
        throw error
    }
}


export function formatContactList (contactList){
    return contactList
            .map(({id, firstName, lastName})=> ` #${id} ${firstName} ${lastName}`)
            .join('\n')
}