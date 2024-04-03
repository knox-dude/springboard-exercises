
interface BoxProps {
    width: number;
    height: number;
    backgroundColor: string;
}

const Box: React.FC<BoxProps> = ({ width, height, backgroundColor }) => {
    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor,
            }}
        />
    );
};


export default Box