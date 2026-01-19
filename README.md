# Lightning Network Tip Jar

Lightning Network Tip Jar is a simple web application that allows users to send tips to their waiters and waitresses.

## Installation

To simulate a LND network for you and your waiters, you will need to use a [Polar](https://lightningpolar.com/).

> Note that Polar requires the installation of [Docker](https://www.docker.com/).

After installing Polar, you can use [ln-tip-jar-polar.zip](./ln-tip-jar.polar.zip) to import the simulated network wich includes 4 LND nodes:

- Alice is the spender / restaurant client.
- Bob, Carol and Dave are receivers / waiters.

You will need this network set up and running before you can use the Lightning Network Tip Jar application.

To install dependencies, run:

```bash
bun install
```

To run the application, run:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [lnrpc](https://github.com/RadarTech/lnrpc)
- [Untitled UI](https://www.untitledui.com/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)