var fn = () => {
    setTimeout(() => {console.log(11);}, 3000);
};

new Promise(resolve => resolve(fn())).then(() => {
    setTimeout(() => {
        console.log(222);
    }, 5000);
});