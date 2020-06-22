export function copyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.padding = '0';
    textarea.style.margin = '0';
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    document.execCommand('Copy');
    textarea.remove();
}