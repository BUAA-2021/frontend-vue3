// 导出png
import html2canvas from "html2canvas";
export const getSnapShot = async (elementId) => {
    const snapshotElement = document.getElementById(elementId)
    if (!snapshotElement) return ''
    const canvas = await html2canvas(snapshotElement, {
        allowTaint: false,
        useCORS: true
    })
    const shot = canvas.toDataURL('image/png')
    const a = document.createElement('a');
    a.href = shot;
    a.download = '示例.png';
    a.click();
    return shot;
}