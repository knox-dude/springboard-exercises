import { useState } from "react";
import { v4 as uuid } from "uuid";
import Box from "./Box"
import NewBoxForm from "./NewBoxForm"

interface BoxProps {
    width: number;
    height: number;
    backgroundColor: string;
}

function BoxList() {
    const [boxes, setBoxes] = useState<Array<BoxProps>>([]);

    const renderBoxes = () => {
        return boxes.map((box) => {
            return (
                <li key={uuid()}>
                    <Box width={box.width} height={box.height} backgroundColor={box.backgroundColor} />
                </li>
            );
        });
    }

    const addBox = (box: BoxProps) => {
        const newBox: BoxProps = { ...box};
        setBoxes(prevState => [...prevState, newBox]);
    };

    return (
        <div className="BoxList">
            <NewBoxForm addBox={addBox} />
            {renderBoxes()}
        </div>
    );
}

export default BoxList