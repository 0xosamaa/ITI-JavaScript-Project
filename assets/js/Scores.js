const table = document.querySelector('table');

const scores = () => {
    return localStorage.getItem('session');
};

const array = JSON.parse(localStorage.getItem('session'));

array.forEach((score) => {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = score.player;
    tr.append(td);
    td = document.createElement('td');
    td.innerHTML = score.score;
    tr.append(td);
    table.append(tr);
});
