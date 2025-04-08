import {
    DocumentStore,
    GetDatabaseNamesOperation,
    CreateDatabaseOperation
} from "ravendb";

const databaseName = "my-product-search-app";
const store = new DocumentStore("http://127.0.0.1:8080", databaseName);
store.conventions.disableTopologyUpdates = true;
store.initialize();

async function ensureDatabaseExists() {
    const existingDatabases = await store.maintenance.server.send(
        new GetDatabaseNamesOperation(0, 50)
    );

    if (!existingDatabases.includes(databaseName)) {
        const dbRecord = { databaseName };

        try {
            await store.maintenance.server.send(
                new CreateDatabaseOperation(dbRecord, 1)
            );
            console.log(`✅ Database '${databaseName}' created`);
        } catch (e: any) {
            if (
                e.name === "ConcurrencyException" ||
                e.message?.includes("already exists")
            ) {
                console.log(`⚠️  Database '${databaseName}' already exists. (ConcurrencyException)`);
            } else {
                throw e;
            }
        }
    } else {
        console.log(`⚠️  Database '${databaseName}' already exists`);
    }
}

ensureDatabaseExists().catch(console.error);

export { store };