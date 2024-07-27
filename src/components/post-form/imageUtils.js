// imageUtils.js

export const resizeImage = async (file, maxWidth, maxHeight) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    return new Promise((resolve, reject) => {
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                const resizedFile = new File([blob], file.name, { type: file.type });
                resolve(resizedFile);
            }, file.type);
        };

        img.onerror = (error) => reject(error);
    });
};
