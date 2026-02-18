# Lightning Network Tip Jar

Lightning Network Tip Jar is a simple web application that allows users to send tips to their waiters and waitresses.

![WebApp Gif](https://github.com/user-attachments/assets/58a932a9-e9a9-4758-a828-6706b8c01f17)

## Installation

To simulate a LND network with nodes for a restaurant costumer and some waiters, you will need to use a [Polar](https://lightningpolar.com/).

> Note that Polar requires the installation of [Docker](https://www.docker.com/).

After installing Polar, you can use [ln-tip-jar-polar.zip](./ln-tip-jar.polar.zip) to import the simulated network wich includes 4 LND nodes:

<img width="1113" height="422" alt="Polar Network" src="https://github.com/user-attachments/assets/331c0291-a99f-48ec-94b4-2ef92a07994f" />

- Alice is the spender / restaurant costumer.
- Bob, Carol and Dave are receivers / waiters.

You will need this network set up and running before you can use the Lightning Network Tip Jar application.

To install dependencies, run:

```bash
bun install
```

To run the application, you have to start the backend server and the frontend application in separate terminals:

```bash
bun dev:api
bun dev:web
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [lnrpc](https://github.com/RadarTech/lnrpc)
- [Untitled UI](https://www.untitledui.com/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)

## TODOs

- [ ] Fix payment flow
- [ ] Add backend tests

