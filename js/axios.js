const urlMilestonesDelete = 'http://ligafalm.eu:28100/milestones/';
const urlMilestones='http://ligafalm.eu:28100/milestones?page=0&size=100';
var borrarMilestoneId=0;
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
        filas += `<tr><td>${element.name}</td><td>${fechaI}</td><td>${fechaF}</td><td>${element.progress}</td><td><i onclick="previoBorrar(${element.id})" data-toggle='modal' data-target='#deleteModal' class='fas fa-trash fa-sm fa-fw mr-2 text-gray-400'></i></td></tr>`;
    });
    tabla+=filas+finTabla;
    document.getElementById('cuerpo').innerHTML=tabla;
})
.catch((error) => {
    console.log(error)
})

function previoBorrar(milestonesId)
{
    borrarMilestoneId=milestonesId;
}

function borrar (milestonesId)
{
    if (borrarMilestoneId>0)
    {
        axios.delete (urlMilestonesDelete+borrarMilestoneId,{headers})
        .then((respuesta) => {
            let response = respuesta.data;
            console.log(response);
            window.location.assign('http://localhost:8080/sales/milestones.html');
        })
        .catch((error) => {
            console.log(error)
        })
    }
    else
    {
        console.log("No existe milestone");
    }
   
}
