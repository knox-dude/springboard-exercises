

function Box({width=0, height=0, backgroundColor="black"} : {width?: number, height?: number, backgroundColor?: string}) {
    return (
        <div style={{width: width, height: height, backgroundColor: backgroundColor}}></div>
    )
}


export default Box