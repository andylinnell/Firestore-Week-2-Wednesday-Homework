import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { service_account } from "./secrets.js";

initializeApp({credential: cert(service_account)});

const db = getFirestore();

const favGames = {
    name: "Elden Ring",
    console: "CPU",
    yearReleased: "2022",
    type: "Action/Adventure 3rd person"
};

const collectionName = "Favorite Childhood toys and games"
// db.collection(collectionName).add(favGames)
//     .then(doc => console.log("Game added", doc.id))
//     .catch (console.error)


    db.collection(collectionName)
    .get()
    .then(collection => {
        
        const items = collection.docs.map(
            eachItem => {
                let eachId = eachItem.data();
                eachId.id = eachItem.id;
                return eachId
            }
        );
        console.table(items);
    })
    .catch(console.error)