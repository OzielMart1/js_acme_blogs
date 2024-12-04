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
    const section= document.querySelector(`section[data-post-id= "${postId}" ]`);
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

    const button= document.querySelector(`button[data-post-id= "${postId}"]`);


    if(button){
        button.textContent=button.textContent ==='Show Comments'
        ? 'Hide Comments': 'Show Comments';
        
        return button;
    }else{
        console.log('Button not found');
    }
    return null;
}

//5 //fixed
function deleteChildElements(parentElement){

    if(!parentElement || !(parentElement instanceof HTMLElement)){
        console.log('Invalid parent element');
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
    const buttons=document.querySelectorAll('main button');

    if(buttons.length ===0){
<<<<<<< HEAD
        return;
=======

        return buttons;

>>>>>>> e782e3420b13f3cc0c2c4755ab539f3848ddc18d
    }
        buttons.forEach(button=> {
            const postId= button.dataset.postId;

            if(postId){
                button.addEventListener('click', ()=>{
                    toggleCommentSection(event,postId);
                });
            }
        });
<<<<<<< HEAD
    }
=======
    return buttons;
}
>>>>>>> e782e3420b13f3cc0c2c4755ab539f3848ddc18d
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
    

    if(!comments || !Array.isArray(comments)){
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
    try{
        const section = document.createElement('section');
        section.dataset.postId= postId;

        section.classList.add('comments', 'hide');

        const comments= await getPostComments(postId);

        if(comments && Array.isArray(comments)){
            const fragment=createComments(comments);
            section.appendChild(fragment);
        }
        
        return section;
    }catch(error){
        console.error('Error displaying comments: ', error);
        throw error;
    }
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
            h2.textContent= post.title || 'No title provided';
            article.appendChild(h2);

            const pBody=document.createElement('p');
            pBody.textContent= post.body || 'No body content';
            article.appendChild(pBody);

            const pId= document.createElement('p');

            pId.textContent= `Post ID: ${post.id}`;

            article.appendChild(pId);

            const author = await getUser(post.userId);

            const pAuthor= document.createElement('p');
<<<<<<< HEAD
            pAuthor.textContent= `Author: ${author.name} from ${author.company.name}`;
            article.appendChild(pAuthor);

            const pCatchphrase= document.createElement('p');
            pCatchphrase.textContent= `Company Catchphrase: "${author.company.catchPhrase}`;
            article.appendChild(pCatchphrase);
=======
            pAuthor.textContent= `Author: ${author?.name|| 'Unknown'} with ${author?.company?.name || 'No company'}`;
            article.appendChild(pAuthor);

            const pCatchphrase= document.createElement('p');
            pCatchphrase.textContent= `Company Catchphrase: "${author?.company?.catchPhrase|| 'No catchphrase available'}`;
            article.appendChild(pCathcphrase);
>>>>>>> e782e3420b13f3cc0c2c4755ab539f3848ddc18d

            const button = document.createElement('button');
            button.textContent= 'Show Comments';
            button.dataset.postId= post.id;
            article.appendChild(button);

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
        console.error("Main element not found.");
        return;
    }

    if(!posts||posts.length ===0){
        const noPostsMessage= createElemWithText('p', 'Select an Employee to display their posts.');
        noPostsMessage.classList.add('default-text');
        main.appendChild(noPostsMessage);
<<<<<<< HEAD
=======
        console.log("No posts to display. Appended message: ", noPostsMessage);
>>>>>>> e782e3420b13f3cc0c2c4755ab539f3848ddc18d
        return noPostsMessage;
    }

    const fragment=await createPosts(posts);
    console.log("Created fragment with posts: ", fragment);
    main.appendChild(fragment);
    
    if (fragment && fragment.children.length > 0) {
        main.appendChild(fragment);
        console.log("Appended posts to the main element.");
    } else {
        console.error("No posts created in the fragment.");
    }

    return fragment;

}

//17  //fixed

async function toggleComments(event,postId){
    if(!event|| !postId){
        return undefined;
    }
    try{
        

        const section = await toggleCommentSection(postId);
       

        const button = toggleCommentButton(postId);
<<<<<<< HEAD
      
=======

        if(!section || !button){
            console.error("Either section or button is undefined.");
            return undefined;
        }

>>>>>>> e782e3420b13f3cc0c2c4755ab539f3848ddc18d
        return [section,button];

    }catch(error){
        console.error('Error toggling comments: ', error);
        return undefined;
    }
}
//18 
async function refreshPosts(posts){
    if(!posts || !Array.isArray(posts)){

        return undefined;
    }

    try{
        console.log("Received posts: ", posts);

        const removeButtons= removeButtonListener();
        console.log("removeButtons: ", removeButtons);

        const main= document.querySelector('main');
        const clearedMain= deleteChildElements(main);
        console.log("clearedMain: ", clearedMain);

        const fragment=await displayPosts(posts);
        console.log("Fragment from displayPosts:", fragment);

        const addButtons= addButtonListeners();
        console.log("addButtons:", addButtons);

        return [removeButtons, clearedMain, fragment, addButtons];

    }catch(error){
        console.error('Error refreshing posts: ', error);
        return [];
    }

}

//19
async function selectMenuChangeEventHandler(event){

    if(!event){
        return undefined;

    }

    try{
        const selectMenu= event.target;
        console.log("Selected value from the dropdown:", selectMenu.value);

        selectMenu.disabled= true;

        const userId= selectMenu.value ?parseInt(selectMenu.value,10): 1;


        const posts= await getUserPosts(userId);
        if(!posts || posts.length===0 ){

            return [userId, [], [] ];
        }

        const refreshPostsArray= await refreshPosts(posts);
        console.log("Refresh Posts Array:", refreshPostsArray);


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