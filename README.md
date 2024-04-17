# Starting Prisma and Next.js Servers

## Seeding the Database

Before starting the prisma server and the Next server, we first need to seed our db.
To seed data into the database, run:

```bash
npx prisma db seed
```

## Prisma Server

To start the Prisma server, follow these steps:

1. Navigate to the root directory of the project.
2. Run the following command to start the Prisma server which will most likely run on [http://localhost:5555](http://localhost:555):
   ```bash
   npx prisma studio
   ```

## Next.js Server

To start the Next.js server, follow these steps:

1. Navigate to the root directory of the project.
2. Run the following command to start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the Next.js application.
