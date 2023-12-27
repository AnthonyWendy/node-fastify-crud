import { sql } from "./db.js"

sql`
    create table videos (
        id text primary key,
        title text,
        description text,
        duration integer
    );
`.then(() => {
    console.log('tabela criada')
})