export function parseControls(controls){
    let processedJSON = controls.map((item) => {
        return {
            ...item
        }
    })
    console.log(processedJSON)
}
