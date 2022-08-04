export function saveJSON(app){
    const result = JSON.stringify(app.controls);
    const blob = new Blob([result], {type: "application/json"});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '示例.json';
    a.click();
}