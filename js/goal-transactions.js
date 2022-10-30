const urlGoalsMilestone = 'http://ligafalm.eu:28100/milestones/';

const urlGoals='http://ligafalm.eu:28100/goals';
const urlGoal = 'http://ligafalm.eu:28100/goals/';
const urlUsers = 'http://ligafalm.eu:28100/users';
const urlMilestones = 'http://ligafalm.eu:28100/milestones';
const urlGoalsUser = 'http://ligafalm.eu:28100/goals/user/';
const urlGoalMilestoneRel = 'http://ligafalm.eu:28100/goals/milestone/';
const urlTransactions='http://ligafalm.eu:28100/transactions';

var transactions, retMilestoneId, progress;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const goalId=urlParams.get('goalId');

const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};



//Nueva transaction y relación con goal
const formNewTransaction = document.getElementById('form-add-goal-transaction');

formNewTransaction.addEventListener('submit', function(element) {
    element.preventDefault();
    const formDataNewTransaction = new FormData(formNewTransaction);

    const dataRequestNewTransaction = {
        "product":formDataNewTransaction.get('product'),
        "total":formDataNewTransaction.get('total'),
        "type":"SELL",
        "done":1,
        "goal":goalId
        }

    axios.post(urlTransactions,dataRequestNewTransaction,{headers})
    .then((respuesta) => {

        window.location.assign('goals.html');
    })
})


const form = document.getElementById('form-update-transaction');
form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    
    const dataRequest = {
        "id":parseInt(formData.get('id')),
        "product":formData.get('product'),
        "total":formData.get('total'),
        "type":'SELL',
        "done":1,
        "goal":goalId
    }


    axios.put(urlTransactions+"/"+dataRequest.id,dataRequest,{headers})
    .then((respuesta) => {console.log(respuesta);
        window.location.assign('goals.html')})
    .catch(error => console.log(error))

})


getTransactions();

function getTransactions ()
{

document.getElementById("goalID").innerHTML=goalId;
getGoal(goalId);

axios.get(urlGoal+goalId,{headers})
.then((response)=>{
    let transactions = response.data.transactions;
    if (transactions.length>0)
    {
        let tabla=` <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
        <tr>
            <th>Product</th>
            <th>Total Sell</th>
            <th>Done</th>
            <th>Type</th>
            <th>Options</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Product</th>
            <th>Total Sell</th>
            <th>Done</th>
            <th>Type</th>
        <th>Options</th>
        </tr>
    </tfoot>
    <tbody>`;
    let finTabla=`</tbody>
    </table>`;
    let filas=``;
    transactions.forEach(element => {
        
        filas += `<tr><td>${element.product}</td><td>${element.total}</td><td>${element.done}</td><td>${element.type}</td><td><i onclick="getTransaction(${element.id})" data-toggle='modal' data-target='#updateTransactionModal' 
        class='fas fa-pen fa-sm fa-fw mr-2 text-gray-400'></i></td></tr>`;
    });
    tabla+=filas+finTabla;
    document.getElementById('cuerpo').innerHTML=tabla;
    }
})
}

function getTransaction (transactionId)
{
    axios.get(urlTransactions+"/"+transactionId,{headers})
    .then((respuesta) => {
        document.getElementById("transaction-id").value=respuesta.data.id;
        document.getElementById("transaction-product").value=respuesta.data.product;
        document.getElementById("transaction-total").value=respuesta.data.total;
    })
    .catch((error)=> {
        console.log(error);
    })
}

function getGoal (goalId)
{
    axios.get(urlGoal+goalId,{headers})
    .then((respuesta) => {
        document.getElementById("goal-name").innerHTML=respuesta.data.name;
        document.getElementById("goal-description").innerHTML=respuesta.data.description;
        document.getElementById("goal-assignedTo").innerHTML=respuesta.data.assignedTo;
    })
    .catch((error)=> {
        console.log(error);
    })
}
