This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## RM notes for adding to another project

### Install packages
mpn install
npm install three
npm install @react-three/fiber
npm install @theatre/core
npm install @theatre/studio
mpn install @theatre/r3f
npm install @react-three/drei

## Set correct NVM 
nvm use 20

### drag needed files to the public
newFrameBox1x1.glb

### Add the animation file to the lib
NFTFrameBasicTest.json

### declare your media before using the component
We have basic detection for the media type, but you can override it by passing the mediaType prop

```javascript

let mediaName = "cat.jpg";
//override the media type, can pass video or image
let mediaType = "";

<NFTFrame mediaName={mediaName} mediaType={mediaType} />

```

### modal pop up.
We added a very basic animated modal popup. But this is probably best controlled / coded outside of our code. Our CSS is in Global CSS. 