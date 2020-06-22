export function copyText(text) {
    let flag = false;
    const currentFocus = document.activeElement;
    const textarea = document.createElement("textarea");
    textarea.style.margin = '0';
    textarea.style.padding = '0';
    textarea.style.opacity = '0';
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.readOnly = true;
    textarea.value = text;
    textarea.focus();
    if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length);
    }
    else {
        textarea.select();
    }
    try {
        flag = document.execCommand("copy");
    } catch (eo) {
        flag = false;
    }
    textarea.blur();
    document.body.removeChild(textarea);
    if (currentFocus) {
        currentFocus.focus();
        currentFocus.blur();
    }
    return flag;
}