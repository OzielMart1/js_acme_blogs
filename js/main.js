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
function populateSelectMenu(users){
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

//12 
async function getUser(userId){
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
//14
async function displayComments(postId){
    try{
        const section = document.createElement('section');
        section.dataset.postId= postId;

        section.classList.add('comments', 'hide');

        const comments= await getPostComments(postId);
        const fragment= createComments(comments);

        section.appendChild(fragment);
        return section;
    }catch(error){
        console.error('Error displaying comments: ', error);
        throw error;
    }
}
//15 
async function createPosts(postss){
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

            const pId= docment.createElement('p');
            pId.textContent= `Post ID: ${post.id}`;
            article.appendChild(pId);

            const author = await getUser(post.userId);

            const pAuthor= document.createElement('p');
            pAuthor.textContent= `Author: ${author.name} with ${author.company.name}`;
            article.appendChild(pAuthor);

            const pCatchphrase= document.createElement('p');
            pCatchphrase.textContent= `Company Catchphrase: "${author.company.catchPhrase}`;
            article.appendChild(pCathcphrase);

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

    const element = posts && posts.length>0
    ? await createPosts(posts): createElemWithText('p', 'No posts available.');
    main.appendChild(element);

    return element;

}

//17 

async function toggleComments(event,postId){
    try{
        event.target.listener= true;

        const section = await toggleCommentSection(postId);

        const button = toggleCommentButton(postId);

        return [section,button];
    }catch(error){
        console.error('Error toggling comments: ', error);

    }
}
//18 
async function refreshPosts(posts){
    try{
        const removeButtons= removeButtonListener();

        const main= document.querySelector('main');
        const clearedMain= deleteChildElements(main);

        const fragment=await displayPosts(posts);

        const addButtons= addButtonListeners();

        return [removeButtons, clearedMain, fragment, addButtons];

    }catch(error){
        console.error('Error refreshing posts: ', error);

    }

}

//19
async function selectMenuChangeEventHandler(event){
    try{
        const selectMenu= event.target;
        selectMenu.disabled= true;

        const userId= event.target.value|| 1;

        const posts= await getUserPosts(userId);

        const refreshPostsArray= await refreshPosts(posts);

        selectMenu.disable = false;

        return [userId, posts, refreshPostsArray];

    }catch(error){
        console.error('Error handling select menu change: ', error);

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