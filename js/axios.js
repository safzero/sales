const urlMilestones='http://ligafalm.eu:28100/milestones?page=0&size=100';
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

axios.get(urlMilestones,{headers})
.then((respuesta) => {
    let response=respuesta.data;
    let tabla=` <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
        <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Progress</th>
            <th>Options</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Name</th>
        <th>Start</th>
        <th>End</th>
        <th>Progress</th>
        <th>Options</th>
        </tr>
    </tfoot>
    <tbody>`;
    let finTabla=`</tbody>
    </table>`;
    let filas=``;
    response.forEach(element => {
        let fechaI=new Date(element.start).toDateString();
        let fechaF = new Date(element.end).toDateString();
        filas += `<tr><td>${element.name}</td><td>${fechaI}</td><td>${fechaF}</td><td>${element.progress}</td><td>delete</td></tr>`;
    });
    tabla+=filas+finTabla;
    document.getElementById('cuerpo').innerHTML=tabla;
})
.catch((error) => {
    console.log(error)
})

