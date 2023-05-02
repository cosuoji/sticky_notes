document.addEventListener("DOMContentLoaded", function() {
    // code...
    var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    var dt = new Date();
    let day = dt.getDate()
    let month = dt.getMonth() 
    let year = dt.getFullYear()
    
    let answer = monthArr[month]

    var noteModal = document.getElementById("note-modal")
    var openModal = document.getElementById("add-note-modal")
    var span = document.getElementById("close");
    var textBox = document.getElementById("content_selector");
    let clearButton = document.getElementById("clearButton")
    let addNoteButton = document.getElementById("add-note-button")
    var successModal = document.getElementById("success-modal")
    let notes = document.getElementById("notes")
    let notesClass = document.getElementsByClassName("notes")
    let notesContainer = document.getElementById("notes_container")
    let notesText = document.getElementById("notes-text")
    let deleteButton = document.getElementsByClassName("delete-button")
    let brushButton = document.getElementsByClassName("brush-button")
    let noteColorPicker = document.getElementsByClassName("note-color-picker")


    //date time function 
    function get_current_time (){
        document.getElementById('date-time').innerHTML= `${answer},${day} ${year}`;
    }


    openModal.onclick = function(){
        noteModal.style.display = "block";
    }

    textBox.onclick = function(){
        clearButton.style.display = "block";
    }

    span.onclick = function() {
        noteModal.style.display = "none";
     }

    clearButton.onclick = function(){
        textBox.value = ""
    }  

    window.onclick = function(event) {
        if (event.target === noteModal || event.target === successModal || event.target === noteColorPicker) {
          noteModal.style.display = "none";
          successModal.style.display = "none";
        }  
    }

    addNoteButton.onclick = function(){
        if(textBox.value !== ""){
            noteModal.style.display = 'none'
            successModal.style.display = "block";
        }

        if(!notesText || (notesText && notesText.innerHTML != '')){
            const new_note = create_new_note( textBox.value )
            notesContainer.appendChild( new_note )
            adding_event_listeners()

        } else {
            notesText.innerHTML = textBox.value;
            notesContainer.appendChild(notes)
            adding_event_listeners()
            get_current_time()
      
        }

        setTimeout(()=>{
            successModal.style.animation = "fadeOut 2s forwards"
            textBox.value = ""
            textBox.placeholder = "Type A New Note"
            
        }, 2000)
       
    }

 function create_new_note( note_content ) {
            const note = document.createElement('div')
            if(textBox.value === ""){
                textBox.placeholder = "NOTE CANT BE EMPTY"
                return 
            } 
            const now = new Date()
            const note_creation_time = {
              day: now.getDate(),
              month: now.getMonth(),
              year: now.getFullYear(),
            }
            
            note.id = 'notes'
            note.classList.add( 'notes' )
     
            note.innerHTML = ''
             + '<div>'
              + '<p id="notes-text" class="notes-text">'
               + `${ note_content }`
              + '</p>'
             + '</div>' 
             + '<div class="footer-ish">'
              + '<div>'
               + `<p id="date-time">${ monthArr[ note_creation_time.month ] } ${ note_creation_time.day }, ${ note_creation_time.year }</p>`
              + '</div>'
              + '<div class="notes-icons">'
               + '<input class="note-color-picker" type="color" style="display: none;">'
               + '<img class="brush-button" src="img/brush-2.svg">'
               + '<img class="delete-button" src="img/trash.svg">'
              + '</div>'
             + '</div>'
     
            return note
         }

 function adding_event_listeners(){
   function get_current_note(index){
     for(let i = 0; i < notesClass.length; i++){
        return notesClass[index]
     }
   }
    for(let i = 0; i < noteColorPicker.length; i++){
        noteColorPicker[i].addEventListener("input", ()=>{
         get_current_note(i).style.backgroundColor = noteColorPicker[i].value;
        })
    }

    for(let i = 0; i < brushButton.length; i++){
      brushButton[i].addEventListener('click',()=>{
        noteColorPicker[i].style.display = "initial";

        window.onclick = function(event){
        if(event.target === noteColorPicker[i]){
            noteColorPicker[i].style.display = "none";
        }

          }
     
      })

    }

    for(let i = 0; i < deleteButton.length; i++){
        deleteButton[i].addEventListener('click', (e)=>{
            e.target.parentNode.parentNode.parentNode.remove()
        })
    }
 }
  });



