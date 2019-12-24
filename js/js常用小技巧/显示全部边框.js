[].forEach.call($$("*"), dom => {
    dom.style.outline = "1px solid #" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
});
 