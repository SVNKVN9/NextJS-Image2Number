const image2Array = async (imageSrc: string, targetWidth: number, targetHeight: number) => {
    return new Promise<number[][][] | null>((resolve) => {
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (!context) return resolve(null);

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, targetWidth, targetHeight).data;

            const rawdata: number[] = [];

            for (let i = 0; i < imageData.length; i += 4) {
                const red = imageData[i];
                const green = imageData[i + 1];
                const blue = imageData[i + 2];
                const alpha = imageData[i + 3];

                rawdata.push(red + green + blue + alpha);
            }

            const pixels: number[][] = []

            for (let i = 0; i < 28; i++) {
                pixels.push(rawdata.slice(i * 28, (i + 1) * 28));
            }

            const resultArray: number[][][] = [];

            for (let i = 0; i < pixels.length; i++) {
                const innerArray: number[][] = [];
                for (let j = 0; j < pixels[i].length; j++) {
                    innerArray.push([pixels[i][j]]);
                }

                resultArray.push(innerArray);
            }

            resolve(resultArray);
        };

        img.onerror = () => resolve(null);
    });
};

export default image2Array