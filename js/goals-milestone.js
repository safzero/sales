const urlGoalsMilestone = 'http://ligafalm.eu:28100/milestones/';
const urlGoal = 'http://ligafalm.eu:28100/goals/';
var transactions, retMilestoneId, progress;

const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

const form = document.getElementById('form-update-goal');
form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    
    const dataRequest = {
        "id":formData.get('id'),
        "name":formData.get('name'),
        "description":formData.get('description'),
        "assignedTo":formData.get('assigned'),
        "progress":progress,
        "transactions":transactions
    }

    console.log(dataRequest);

    axios.put(urlGoal+dataRequest.id,dataRequest,{headers})
    .then((respuesta) => {console.log(respuesta);
        window.location.assign('goals-milestones.html?milestoneId='+retMilestoneId)})
    .catch(error => console.log(error))

})


getGoals();

function getGoals ()
{
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const milestoneId=urlParams.get('milestoneId');
retMilestoneId=milestoneId;
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
            <th>Options</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Name</th>
        <th>Description</th>
        <th>AssignedTo</th>
        <th>Progress</th>
        <th>Transactions</th>
        <th>Options</th>
        </tr>
    </tfoot>
    <tbody>`;
    let finTabla=`</tbody>
    </table>`;
    let filas=``;
    goals.forEach(element => {
        
        filas += `<tr><td>${element.name}</td><td>${element.description}</td><td>${element.assignedTo}</td><td>${element.progress}</td><td>
        ${element.transactions}</td><td><i onclick="getGoal(${element.id})" data-toggle='modal' data-target='#updateGoalModal' 
        class='fas fa-pen fa-sm fa-fw mr-2 text-gray-400'></i></td></tr>`;
    });
    tabla+=filas+finTabla;
    document.getElementById('cuerpo').innerHTML=tabla;
    }
})
}

function getGoal (goalId)
{
    console.log(goalId);
    axios.get(urlGoal+goalId,{headers})
    .then((respuesta) => {
        document.getElementById("goal-id").value=respuesta.data.id;
        document.getElementById("goal-name").value=respuesta.data.name;
        document.getElementById("goal-description").value=respuesta.data.description;
        document.getElementById("goal-assigned").value=respuesta.data.assignedTo;
        transactions=respuesta.data.transactions;
        progress=respuesta.data.progress;
    })
    .catch((error)=> {
        console.log(error);
    })
}

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
