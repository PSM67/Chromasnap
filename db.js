// Local database management engine matching your schema structure
const DB_NAME = "ChromaSnapLocalDB";
const DB_VERSION = 1;

function getDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("Chromasnaptab")) {
                db.createObjectStore("Chromasnaptab", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("Strip")) {
                db.createObjectStore("Strip", { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject("Local database initialization failed.");
    });
}
