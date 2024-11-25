//1
function createElemWithText(elementType= "p", textContent= "", className= ""){
    const element = document.createElement(elementType);
    element.textContenet= textContent;

    if(className){
        element.className= className;
    }

    return element;
}

// 2

function createSelectOptions(users){
    if(!users){
        return undefined;
    }
    const options=[];

    users.forEach(user=>{
        const option= document.createElement('option');

        option.value = user.id;

        option.textContent= user.name;

        options.push(option);

    });
return options;

}