const urlGoals='http://ligafalm.eu:28100/goals';
const headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'

};

const form = document.getElementById('form-add-goal');
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