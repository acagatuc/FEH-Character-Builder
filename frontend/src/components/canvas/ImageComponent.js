import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const ImageComponent = ({
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    width,
    height,
}) => {
    const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
        if (!image) return;
        if (image.name?.length > 0 && image.name) {
            const safeName = image.name.replace(":", "_");
            const url = `http://localhost:5000/api/heroes/heroImage/${safeName}.png`;
            setImageUrl(url);
        }
    }, [image]);
    const [imgElement] = useImage(imageUrl, "Anonymous");

    if (!image) return null;
    return (
        <Image
            image={imgElement}
            x={0}
            y={0}
            cropX={cropX}
            cropY={cropY}
            cropWidth={cropWidth}
            cropHeight={cropHeight}
            width={width}
            height={height}
        />
    );
};

export default ImageComponent;