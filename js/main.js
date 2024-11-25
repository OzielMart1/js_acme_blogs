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
//3
function toggleCommentSection(postId){
    const section= document.querySelector(`selection[data-post-id= "${postId}" ]`);
    if (section){
        section.classList.toggle('hide');

        return section;
    }else{
        console.log('Section not found');
        return undefined;
    }
}
//4
function toggleCommentButton(postId){
    const button= documet.querySelector(`button[data=post-id"${postId}"]`);

    if(button){
        button.texContent=button.textContent ==='Show Comments'
        ? 'Hide Comments': 'Show Commments';
        
        return button;
    }else{
        console.log('Button not found');
    }
    return undefined;
}

//5
function deleteChildElement(parentElement){
    let child=parentElement.lastElementChild;
    while(child){
        parent.removeChild(child);
        child= parentElement.lastElementChild;
    }
    return parentElement;
}

//6
function addButtonListeners(){
    const buttons=document.querySelectorAll('main button');
    if(buttons.length > 0){
        buttons.forEach(button=> {
            const postId= button.dataset.postId;

            if(postId){
                button.addEventListener('click', (event)=>{
                    toggleCommentSection(event,postId);
                });
            }
        });
    }
    return buttons;
}
//7
function removeButtonListeners(){
    const buttons=document.querySelectorAll('main button');

    buttons.forEach(button =>{
        const postId=button.dataset.postId;

        if(postId){
            button.removeEventListener('click',(event)=>{
                toggleCommentSection(event,postId);
            });
        }
    });
    return buttons;
}
//8
