import NextHead from 'next/head';
import React from "react";

const Head = () => (
    <NextHead>
        <link rel="icon" href="/chatgpt-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/path/to/your/stylesheet.css" />

    </NextHead>
);

export default Head;