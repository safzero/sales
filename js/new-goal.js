const urlGoals='http://ligafalm.eu:28100/goals';
const urlUsers = 'http://ligafalm.eu:28100/users';
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

const form = document.getElementById('form-add-goal');
let users;
//Obtener usuarios para el select
axios.get(urlUsers,{headers})
.then((respuesta)=> {
    users=respuesta.data;
    let templateSelect =`<select class="form-control form-control-user" id="assignedTo" name="assignedTo">`;
    users.forEach(element => {
        templateSelect+=`<option value='${element.username}'>${element.username}</option>`;
    });
    templateSelect+=`</select>`;
    document.getElementById("selectorUsuario").innerHTML=templateSelect;

})

form.addEventListener('submit', function(element) {
    element.preventDefault();
    const formData = new FormData(form);
    console.log([...formData]);
    console.log(formData.get('name'));
    
    const dataRequest = {
        "name":formData.get('name'),
        "description":formData.get('description'),
        "assignedTo":formData.get('assignedTo')
        }

    console.log(dataRequest);

    axios.post(urlGoals,dataRequest,{headers})
    .then((respuesta) => {console.log(respuesta);
        window.location.assign('milestones.html')})
    .catch(error => console.log(error))

})