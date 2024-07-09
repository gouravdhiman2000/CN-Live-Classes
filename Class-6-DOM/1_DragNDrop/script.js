const dropArea = document.getElementById('drop-area');
const inputFile = document.getElementById('input-file');
const imgView = document.getElementById('img-view');

// addEventListener = eventName , function, UseCapture - bydeafult it is false

inputFile.addEventListener('change', uploadImage);

//a- to store images create an array
const imageLinkList = []

function uploadImage(){
    // gives the array of objrct which contains the info. related to the image
    // Image name is always present ar the [0] index
    /* const fileList = inputFile.files;*/

    // We need link/URL of the file that has been uploaded for that we have to convert the image object to the link by :-

    //1. get the selected image by user
    // console.log(inputFile.files[0]);
    const imageLink = URL.createObjectURL(inputFile.files[0]);

    // b. push the image url inside the array
    imageLinkList.push(imageLink);

    // c. store it in a local storage
    localStorage.setItem("imageLinkList", JSON.stringify(imageLinkList));

    // 2. show the selected image on the screen - imgView area
    // how to add styles to HTml element using JS
    // targettedElement.style.propertyName = value;
    imgView.style.backgroundImage = `url(${imageLink})`;
    imgView.textContent = '';
    imgView.style.border = "none";
   

    // console.log("on change upload image is called", imageLink);


}

// Implementing Drag and Drop 
// dragOver
dropArea.addEventListener('dragover', (event)=>{
    event.preventDefault(); 
    console.log("Dragging Over");
})

// drop
dropArea.addEventListener('drop',(event)=>{
    // preventDefault used so that dropping the image will not open the new window for the drop image
    event.preventDefault();

    inputFile.files = event.dataTransfer.files;
    console.log("Dropped :",inputFile.files);
    // uploadImage - tranforming the file  and showing on the screen
    uploadImage();
});

