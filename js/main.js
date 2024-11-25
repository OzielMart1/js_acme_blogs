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

function createSelectOptions(users){ // this one is correct
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
function deleteChildElements(parentElement){
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
//7 // this one is correct 
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
function createComments(comments){
    const fragment=document.createDocumentFragment();

    comments.forEach(comment=>{
        const article=document.createElement('article');
        const h3=createElemWithText('h3', comment.name);

        const bodyPara=createElemWithText('p', comment.body);

        const emailPara=createElemWithText('p', `From: ${comment.email}`);

        article.appendChild(h3);
        article.appendChild(bodyPara);
        article.appendChild(emailPara);

        fragment.appendChild(article);

    });
    return fragment;
}

//9 
function createSelectOptions(users){
    return users.map(user => {
        const option= document.createElement('option');
        option.value =user.id;
        option.textContent=user.name;
        return option;
    });
}

//10 

async function getUsers(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok){
            throw new Error('Failed to fetch users')
        }

        const usersData=await response.json();
        return usersData;
    }catch(error){
        console.error('Error fetching users:', error);
        return null;
    }
}

//11 
async function getUserPosts(userId){
    try{
        const response= await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if(!response.ok){
            throw new Error('Failed to fetch posts');
        }

        const postsData= await response.json();

        return postsData;

    }catch(error){
        console.error('Error fetching posts for user:', error);
        return null;
    }
}