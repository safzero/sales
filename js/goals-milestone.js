const urlGoalsMilestone = 'http://ligafalm.eu:28100/milestones/';

const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const milestoneId=urlParams.get('milestoneId');
console.log(milestoneId);
getMilestone(milestoneId);

axios.get(urlGoalsMilestone+milestoneId+'/goals',{headers})
.then((response)=>{
    let goals = response.data.goals;
    if (goals.length>0)
    {
        let tabla=` <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>AssignedTo</th>
            <th>Progress</th>
            <th>Transactions</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Name</th>
        <th>Description</th>
        <th>AssignedTo</th>
        <th>Progress</th>
        <th>Transactions</th>
        </tr>
    </tfoot>
    <tbody>`;
    let finTabla=`</tbody>
    </table>`;
    let filas=``;
    goals.forEach(element => {
        
        filas += `<tr><td>${element.name}</td><td>${element.description}</td><td>${element.assignedTo}</td><td>${element.progress}</td><td>
        ${element.transactions}</td></tr>`;
    });
    tabla+=filas+finTabla;
    document.getElementById('cuerpo').innerHTML=tabla;
    }
})

function getMilestone (milestoneId)
{
    console.log(milestoneId);
    axios.get(urlGoalsMilestone+milestoneId,{headers})
    .then((respuesta) => {
        document.getElementById("milestone-name").innerHTML=respuesta.data.name;
        document.getElementById("milestone-start").innerHTML=respuesta.data.start;
        document.getElementById("milestone-end").innerHTML=respuesta.data.end;
    })
    .catch((error)=> {
        console.log(error);
    })
}
