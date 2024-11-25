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
