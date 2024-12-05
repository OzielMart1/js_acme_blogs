//1 //fixed
function createElemWithText(elementType= "p", textContent= "", className= ""){
    const element = document.createElement(elementType);
    element.textContent= textContent;

    if(className){
        element.className= className;
    }

    return element;
}

// 2 // correct 

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
//3 //fixed
function toggleCommentSection(postId){
    if(!postId){
        return undefined;
    }
    const section= document.querySelector(`section[data-post-id="${postId}" ]`);
    if (section){
        section.classList.toggle('hide');

        return section;
    }else{
        console.log('Section not found');
        return null;
    }
}
//4 //fixed
function toggleCommentButton(postId){
    if(!postId){
        return undefined;
    }
    const buttons = Array.from(document.getElementsByTagName('button'));
    const button = buttons.find(el => el.dataset.postId == postId);
    if(!button){
        return null;
    }
    button.textContent=button.textContent ==='Show Comments' ? 'Hide Comments': 'Show Comments';
    return button;
}

//5 //fixed
function deleteChildElements(parentElement){

    if(!parentElement || !(parentElement instanceof HTMLElement)){
        
        return undefined;
    }
    let child=parentElement.lastElementChild;
    while(child){
        parentElement.removeChild(child);
        child= parentElement.lastElementChild;
    }
    return parentElement;
}

//6 //fixed
function addButtonListeners(){
    const main= document.querySelector('main');
    if(!main){
        return false;
    }

    const buttons=main.querySelectorAll('button');
    if(buttons.length===0){
        return false;
    }
        buttons.forEach(button=> {
            const postId= button.dataset.postId;

            if(postId){
                button.addEventListener('click', ()=>{
                    toggleCommentSection(postId);
                });
            }else{
                console.error('Button does not have a postId');
            }
        });
        return true; 
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
//8 //fixed
function createComments(comments){

    if(!comments){
        return undefined;
    }
    const fragment=document.createDocumentFragment();

    comments.forEach(comment=>{
        const article=document.createElement('article');

        const h3=createElemWithText('h3', comment.name || 'No name provided');

        const bodyPara=createElemWithText('p', comment.body|| 'No body text provied');

        const emailPara=createElemWithText('p', `From: ${comment.email || 'No email provided'}`);

        article.appendChild(h3);
        article.appendChild(bodyPara);
        article.appendChild(emailPara);

        fragment.appendChild(article);

    });
    return fragment;
}

//9 
function populateSelectMenu(users){

    if(!users || !Array.isArray(users)){
        return undefined;
    }
    const selectMenu=document.getElementById('selectMenu');
    selectMenu.innerHTML='';

    const options = createSelectOptions(users);

    options.forEach(option =>{
        selectMenu.appendChild(option);
    });
    return selectMenu;
}

//10 

async function getUsers(){ //correct
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

//11 //fixed
async function getUserPosts(userId){

    if(!userId){
        return undefined;

    }
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

//12 //fixed
async function getUser(userId){
    if(!userId){
        return undefined;
    }
    try{
        const response= await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if(!response.ok){
            throw new Error(`User with ID ${userId} not found`);
        }

        const userData= await response.json();
        return userData;

    }catch(error){
    console.error('Error fetching user data:', error);
    throw error;
    }
}

//13
async function getPostComments(postId){
    if(!postId){
        return undefined;
    }
    try{
        const response= await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

        if(!response.ok){
            throw new Error(`Comments for post ID ${postId} not found`);

        }
        const commentsData= await response.json();
        return commentsData;

    }catch(error){
        console.error('Error fetching comments: ', error);
        throw error;
    }
}
//14 fixed
async function displayComments(postId){

    if(!postId){
        return undefined;
    }
    const section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');

    try{
        const comments= await getPostComments(postId);
        const fragment= createComments(comments || []);
        section.appendChild(fragment);
    }catch(error){
        console.error('Error displaying comments: ', error);
        return undefined;
    }
    return section;
  
}
//15 //fixed
async function createPosts(posts){
    if(!posts || !Array.isArray(posts)){
        return undefined;
    }

    const fragment= document.createDocumentFragment();
    for(const post of posts){
        try{
            const article = document.createElement('article');

            const h2 = document.createElement('h2');
            h2.textContent= post.title;
            article.appendChild(h2);

            const pBody=document.createElement('p');
            pBody.textContent= post.body;
            article.appendChild(pBody);

            const pId= document.createElement('p');
            pId.textContent= `Post ID: ${post.id}`;
            article.appendChild(pId);

            const author = await getUser(post.userId);
            const pAuthor= document.createElement('p');
            pAuthor.textContent= `Author: ${author.name} with ${author.company.name}`;
            article.appendChild(pAuthor);

            const pCatchphrase= document.createElement('p');
            pCatchphrase.textContent= author.company.catchPhrase;
            article.appendChild(pCatchphrase);

            const button = document.createElement('button');
            button.textContent= 'Show Comments';
            button.dataset.postId= post.id;
            article.appendChild(button);

            const section = await displayComments(post.id);
            article.appendChild(section);
            

            fragment.appendChild(article);

        }catch(error){
            console.error('Error processing post: ', error);

            }

        }
        return fragment;
    }

//16 
async function displayPosts(posts){
    const main= document.querySelector('main');
    if(!main){
        console.error("Main element not found");
        return;
    }

    if(!posts||posts.length ===0){
        const noPostsMessage= createElemWithText('p', 'Select an Employee to display their posts.');
        noPostsMessage.classList.add('default-text');
        main.appendChild(noPostsMessage);
        return noPostsMessage;
    }

    const fragment=await createPosts(posts);
    if(fragment){
        main.appendChild(fragment);
        return fragment;l
    }
    console.error("Failed to create posts fragment");
    return null;

}

//17  //fixed

async function toggleComments(event,postId){
    if(!event|| !postId){
        return undefined;
    }
    try{
        const section = toggleCommentSection(postId);
        const button = toggleCommentButton(postId);

        if(!section || section.tagName !== 'SECTION'){
            console.error('Invalid section returned');
            return undefined;
        }
       
        if(!button || button.tagName!=='BUTTON'){
            console.error('Invalid button returned');
            return undefined;
        }
      
        return [section,button];

    }catch(error){
        console.error('Error toggling comments: ', error);
        return undefined;
    }
}
//18 
async function refreshPosts(posts){
    if(!posts || !Array.isArray(posts)){
        console.error('Invalid posts array');
        return undefined;
    }

    try{
        const removeButtons= removeButtonListener() || [];

        const main= document.querySelector('main');
        if(!main){
            console.error('Main element not found');
            return undefined;
        }
        const clearedMain= deleteChildElements(main) || [];
        const fragment=await displayPosts(posts);
        if(!fragment || fragment.nodeType !== 11){
            console.error('Invalid fragment returned from displayPosts');
            return undefined;
        }
        const addButtons= addButtonListeners();
        if(!addButtons){
            console.error('addButtonListeners returned invalid result');
            return undefined;
        }

        return [removeButtons, clearedMain, fragment, addButtons];

    }catch(error){
        console.error('Error refreshing posts: ', error);
        return undefined;
    }

}

//19
async function selectMenuChangeEventHandler(event){
    if(!event){
        return undefined;
    }

    try{
        const selectMenu= document.getElementById("selectMenu");
        if(!selectMenu){
            console.error('Select menu not found');
            return [1, [] , [] ];
        }
        selectMenu.disabled= true;

        const userId= event?.target?.value || 1;
        const posts = await getUserPosts(userId);
        if(!Array.isArray(posts)|| posts.length===0){
            return [userId, [], [] ];
        }
      
        const refreshPostsArray= await refreshPosts(posts);
        if(!Array.isArray(refreshPostsArray) || refreshPostsArray.length ===0 ){
            console.error('refreshPosts did not return a valid array: ', refreshPostsArray);
            return [userId, posts, []];
        }

        selectMenu.disable = false;

        return [userId, posts, refreshPostsArray];

    }catch(error){
        console.error('Error handling select menu change: ', error);
        return [1, [], [] ];
    }
}

//20

async function initPage(){
    try{
        const users= await getUsers();

        const select= populateSelectMenu(users);

        return [users, select];

    }catch(error){
        console.error("Error initializing the page: ", error);

    }
}
//21 
async function initApp(){
    initPage().then(() => {
        const selectMenu= document.querySelector('#user-select');
        selectMenu.addEventListener('change', function(event){
            selectMenuChangeEventHandler(event);
        });

    }).catch(error=>{
        console.error("Error initializing the app: ", error);

    });
}

document.addEventListener("DOMContentLoaded", function(){
    initApp();
});
//hello