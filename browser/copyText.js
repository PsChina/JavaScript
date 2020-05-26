function copyText(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.width = 0;
    textarea.style.height = 0;
    textarea.style.padding = 0;
    textarea.style.margin = 0;
    textarea.style.border = 'none';
    textarea.zIndex = -9999;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('Copy');
    textarea.remove();
}