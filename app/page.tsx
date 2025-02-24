'use client'

import { useEffect, useState } from "react";
import Draw from "./components/Draw";
import image2Array from "./utils/image2Array";

export default function Home() {
    const [Loaded, setLoaded] = useState<boolean>(false)
    const [number, setNumber] = useState<string>("")

    useEffect(() => {
        const Load_Model = async () => {
            const raw = await fetch('/api/models', {
                method: "GET"
            })

            const result = await raw.json()

            if (result.loaded) return setLoaded(true)

            setTimeout(() => Load_Model(), 500)
        }

        Load_Model()
    }, [])

    const handleImageChange = async (imageDataUrl: string) => {
        const imgData = JSON.stringify(await image2Array(imageDataUrl, 28, 28))

        const raw = await fetch('/api/models', {
            method: "POST",
            body: imgData
        })

        const response = await raw.json()

        const result = response.result.replace("Tensor\n ", "").split(",").map((x: string) => x.replaceAll("[", "").replaceAll("]", "").trim()).filter((x: any) => x)

        setNumber(`${result.findIndex((x: string) => x == "1")}`)
    };

    return (
        <main className="flex dark:bg-gray-900 h-screen p-4">
            {
                !Loaded && <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-700">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold dark:text-white">
                                    Model Loding...
                                </h3>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-blueGray-500 text-lg leading-relaxed dark:text-gray-200">
                                    Model is loading...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <Draw canvasHeight={420} canvasWidth={420} onImageChange={handleImageChange} />

            <h1 className="mx-auto text-3xl font-bold text-white">คุณเขียนเลข {number}</h1>
        </main>
    )
}
