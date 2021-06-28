
const inputLink = document.getElementById('link-input');
const btn = document.getElementById('btn');
const shortenedLinksList = document.querySelector('.list');

// loading div
const loading = document.querySelector('.loading');

// shorten link enterend by user
btn.addEventListener('click', shortenLink);


function shortenLink(e) {
    let outputLink = '';

    // first check for valid input
    const inputLinkValue = inputLink.value;

    // input field empty
    if(inputLinkValue === '') {
        inputError(inputLink, 'Please add a link');
    }
    // invalid url
    else if(!validateUrl(inputLinkValue)) {
        inputError(inputLink, 'Please add a valid link');
    }
    // correct url
    else {
        correctInput(inputLink);

        // show loading
        showLoading();

        // get shortened link  
        fetch(`https://api.shrtco.de/v2/shorten?url=${inputLinkValue}`)
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then(data => {

            // hide loading
            hideLoading();
            
            const result = data.result;
            
            // shortened link
            outputLink = result.full_short_link;
                        
            console.log(result);
            console.log(outputLink);
            createList(inputLinkValue ,outputLink);
        })  
    }

    inputLink.value = '';
    e.preventDefault();
}


function inputError(input, errorMessage) {
    // getting the parent of the input i.e form input div
    const formInput = input.parentElement;

    const small = formInput.querySelector('small');
    
    // add error message inside the small tag
    small.innerText = errorMessage;
    
    formInput.className = 'form-input form-error';
}

function correctInput(input) {
    // getting the parent of the input i.e form input div
    const formInput = input.parentElement;
    
    formInput.className = 'form-input success';
}

function validateUrl(link) {
    return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(link);
}

// show loading 
function showLoading() {
    loading.classList.add('display');
}
// hide loading
function hideLoading() {
    loading.classList.remove('display');
}

// create a new list item
function createList(originalLink, outputLink) {
    // create a new li element  
    const li = document.createElement('li');
    // add class
    li.className = 'list-item';
    
    // create a new p element to add into the li
    const p1 = document.createElement('p');
    // add class
    p1.className = 'original-link';
    // create textnode and add it to p1
    p1.appendChild(document.createTextNode(originalLink));

    // create a new div element 
    const div = document.createElement('div');
    // add class
    div.className = 'shortened-link-div';

    // create a new p element to add into the div
    const p2 = document.createElement('p');
    // add class
    p2.className = 'shortened-link';
    // create a textnode and add it to p2
    p2.appendChild(document.createTextNode(outputLink));

    // create a new button
    const btn = document.createElement('button');
    // add class
    btn.className = 'btn-copy';
    // create a textnode and add into btn
    btn.appendChild(document.createTextNode('Copy'));

    // append p2 and btn to div
    div.appendChild(p2);
    div.appendChild(btn);

    // append p1 and div to li
    li.appendChild(p1);
    li.appendChild(div);

    // append li to ul
    shortenedLinksList.appendChild(li);

    btn.addEventListener('click', () => {
        const text = p2.textContent;
        const elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = text;
        elem.select();
        document.execCommand("copy");
        document.body.removeChild(elem);

        if(!(btn.classList.contains('copied'))) {
            btn.classList.add('copied');
            btn.textContent = 'Copied';
        }
    });

}



