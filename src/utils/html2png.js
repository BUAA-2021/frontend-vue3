// 导出png
import html2canvas from "html2canvas";
export const getSnapShot = async (elementId,name) => {
    const snapshotElement = document.getElementById(elementId)
    if (!snapshotElement) return ''
    const canvas = await html2canvas(snapshotElement, {
        allowTaint: false,
        useCORS: true
    })
    const shot = canvas.toDataURL('image/png')
    const a = document.createElement('a');
    a.href = shot;
    a.download = `${name}.png`;
    a.click();
    return shot;
}