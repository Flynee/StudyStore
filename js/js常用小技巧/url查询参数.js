var params = new URLSearchParams(location.search.replace(/\?/ig, ""));
// location.search = 'name=zhang&sex=notgilr'

params.has('zhang');
params.get('sex');