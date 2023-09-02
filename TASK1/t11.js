const form = document.querySelector('#list');
const result = document.querySelector('#result');
const students = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const studName = document.querySelector('#person').value;
    const m1 = Number(document.querySelector('#sub1').value);
    const m2 = Number(document.querySelector('#sub2').value);
    const m3 = Number(document.querySelector('#sub3').value);
    const perc = Number(((m1 + m2 + m3) / 300) * 100);

    students.push({ name: studName, percentage: perc });

    document.querySelector('#person').value = '';
    document.querySelector('#sub1').value = '';
    document.querySelector('#sub2').value = '';
    document.querySelector('#sub3').value = '';
    result.innerHTML = '';

    students.forEach((student) => {
        const li = document.createElement('li');
        li.textContent = `${student.name}: ${student.percentage.toFixed(2)}%`;
        result.appendChild(li);
    });
});

const sort = document.querySelector('#sort');
sort.addEventListener('click', function () {
    students.sort((a, b) => b.percentage - a.percentage);
    result.innerHTML = '';

    students.forEach((student) => {
        const li = document.createElement('li');
        li.textContent = `${student.name}: ${student.percentage.toFixed(2)}%`;
        result.appendChild(li);
    });
});
const avgbtn = document.querySelector('#avgbtn');
avg.addEventListener('click',function (e){
    e.preventDefault();
    let totalPercentage = 0;
    for (let i = 0; i < students.length; i++) {
        totalPercentage += students[i].percentage;
    }
    const aver = totalPercentage / students.length;
    const avg = document.querySelector('#avg');
    avg.innerHTML = '';
         
        const h6 = document.createElement('h6');
        h6.textContent = ` THE CLASS AVERAGE IS : ${aver}`;
        avg.appendChild(h6);
        
});
