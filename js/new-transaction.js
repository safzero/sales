const urlGoals='http://ligafalm.eu:28100/goals';
const urlTransactions = 'http://ligafalm.eu:28100/transactions';

const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

//Obtener goals para asignar a transaction
axios.get(urlGoals+"/?page=0&size=100",{headers})
.then((respuestaGoals)=>{
    let goals=respuestaGoals.data;
    let templateGoals=`<select class="form-control form-control-user" id="goalId" name="goalId">`;
    goals.forEach(element=> {
        templateGoals+=`<option value='${element.id}'>${element.name}</option>`;
    });
    templateGoals+=`</select>`;
    document.getElementById("selectorGoal").innerHTML=templateGoals;
})


//Nueva transaction y relación con goal
const form = document.getElementById('form-add-transaction');

form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    console.log(formData);

    const dataRequest = {
        "product":formData.get('product'),
        "total":formData.get('total'),
        "type":'SELL',
        "done":1,
        "goal":formData.get('goalId')
        }

    axios.post(urlTransactions,dataRequest,{headers})
    .then((respuesta) => {
        console.log(respuesta.data);
        window.location.assign('goals.html');

    })
})