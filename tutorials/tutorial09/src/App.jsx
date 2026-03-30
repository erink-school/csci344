import React from "react";
import { Image } from "antd";
import Card from "./components/Card";
import AntCard from "./components/AntCard";

export default function App() {

    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>
            <main>
                <p>Hello React!</p>
            </main>
            <Card
                name="Sample item"
                image_url="https://picsum.photos/id/237/400/300"
                description="A short description goes here."
            />
            <Card
                name="Sample item"
                image_url="https://picsum.photos/id/219/100/100"
                description="A short description goes here."
            />
            <Image width={200}
            alt="basic"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
        </>
    );
}