/* Brandon Ruger
 * Project 3
 * MiU 1310 */

window.addEventListener("DOMContentLoaded", function(){
    
    //Function to get elements from HTML file.
    function getElements(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    
    
    //Dynanmically create select field and populate it with options.
    function makeFleaMedOptions() {
        var formTag = document.getElementsByTagName("form");
        var chooseList = getElements('select');
        var makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "fleaRx");
        for (var i=0, j=fleaMedication.length; i<j; i++) {
            var createOption = document.createElement('option');
            var optionText = fleaMedication[i];
            createOption.setAttribute("value", optionText);
            createOption.innerHTML = optionText;
            makeSelect.appendChild(createOption);
        }
        chooseList.appendChild(makeSelect);
    }
    
    //Function to determine which check boxes are checked:
    function getSelectedCheckedBoxes() {
        if (getElements('flea').checked) {
            fleaValue = getElements('flea').value;
        } else {
            fleaValue = "No"
        };
        if (getElements('heartworm').checked){
            heartwormValue = getElements('heartworm').value;
        } else {
            heartwormValue = "No"
        };
        if (getElements('other').checked) {
            otherValue = getElements('other').value;
        } else{
            otherValue = "No"
        };
    }

    function toHideForm(n) {
        switch (n){
            case "on":
                getElements('addReminderForm').style.display = "none";
                getElements('clearData').style.display = "inline";
                getElements('displayData').style.display = "none";
                getElements('addNewReminder').style.display = "inline";
                break;
            case "off":
                getElements('addReminderForm').style.display = "block";
                getElements('clearData').style.display = "inline";
                getElements('displayData').style.display = "inline";
                getElements('addNewReminder').style.display = "none";
                getElements('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    //Create function to submit data.
    function submitData(key) {
        //If there is no key, this means this is a brand new item and we need a new key.
        if (!key) {
            var generateId = Math.floor(Math.random()*100000001);
        }else{
            //Set the id to the existing key we're editing, so it will save over the data.
            generateId = key;
        }
        
        //Gather up all our form field values and store in an object.
        //Object properties contain array with the form label and input value.
        getSelectedCheckedBoxes(); 
        var itemList            = {};
            itemList.petname    = ["Pet Name:", getElements('petname').value];
            itemList.petage     = ["Pet Age:", getElements('petage').value];
            itemList.pettype    = ["Pet Type:", getElements('pettype').value];
            itemList.flea       = ["Flea:", fleaValue];
            itemList.fleaRx     = ["Flea Rx:", getElements('fleaRx').value];
            itemList.heartworm  = ["Heartworm:", heartwormValue];
            itemList.other      = ["Other:", otherValue];
            itemList.date       = ["Date:", getElements('date').value];
            itemList.range      = ["Range:", getElements('range').value];
            itemList.note       = ["Note:", getElements('note').value];
            
            //Save data into Local Storage
            localStorage.setItem(generateId, JSON.stringify(itemList));
            alert("Reminder has been added!");
    }
    
    function getDataFromStorage() {
        toHideForm("on");
        if (localStorage.length === 0) {
            alert("There is no data in Local Storage so default data was added.");
            getJsonData();
        }
        
        //Write Data from local storage to the browser
        var createDiv = document.createElement('div');
        createDiv.setAttribute("id", "items");
        var createList = document.createElement('ul');
        createDiv.appendChild(createList);
        document.body.appendChild(createDiv);
        for (var i=0; i<localStorage.length; i++) {
            var createListItem = document.createElement('li');
            createList.appendChild(createListItem);
            var key = localStorage.key(i);
            var dataValue = localStorage.getItem(key);
            //Convert string from local storage back to an Object.
            var findObject = JSON.parse(dataValue);
            var subList = document.createElement('ul');
            createListItem.appendChild(subList);
            getIcon(findObject.fleaRx[1], subList);
            for (var n in findObject) {
                var makeSublist = document.createElement('li');
                subList.appendChild(makeSublist);
                var subText = findObject[n][0]+ " " +findObject[n][1];
                makeSublist.innerHTML = subText;
                //createListItem.appendChild(newLinksLi);
            }
            createEditDelLinks(localStorage.key(i), createListItem); //Create our edit and delete links for each item in local storage.

        }
        
    }
    
    //Get the Image for the right select category
    function getIcon(fleaType, subList) {
        var imageList = document.createElement('li');
        subList.appendChild(imageList);
        var createImg = document.createElement('img');
        var setImgSrc = createImg.setAttribute("src", "img/" + fleaType + ".png");
        imageList.appendChild(createImg);
    }
    
    //Function to create edit/delete links for each stored item when displayed.
    function createEditDelLinks(key, newLinksLi) {
        //add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Reminder";
        editLink.addEventListener("click", editReminder);
        editLink.innerHTML = editText;
        newLinksLi.appendChild(editLink);
        
        //add line break
        var breakTag = document.createElement('br');
        newLinksLi.appendChild(breakTag);
        
        //add delete single item link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Reminder";
        deleteLink.addEventListener("click", deleteReminder);
        deleteLink.innerHTML = deleteText;
        newLinksLi.appendChild(deleteLink);
    }
    
    //Auto populate Local Storage with JSON data
    function getJsonData() {
        //Store JSON Object into Local Storage.
        for (var n in json) {
            var id = Math.floor(Math.random()*10000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    
    function editReminder() {
        //Grab the data from our item from Local Storage.
        var lsData = localStorage.getItem(this.key);
        var itemList = JSON.parse(lsData);
        
        //Show the form
        toHideForm("off");
        
        //Populate form fields with current localStorage values.
        getElements('petname').value = itemList.petname[1];
        getElements('petage').value = itemList.petage[1];
        getElements('pettype').value = itemList.pettype[1];

        if(itemList.flea[1] == "Flea Medication") {
            getElements('flea').setAttribute("checked", "checked");
        }
        
        getElements('select').value = itemList.fleaRx[1];
        
        if (itemList.heartworm[1] == "Heartworm Medication") {
            getElements('heartworm').setAttribute("checked", "checked");
            
        }
        
        if (itemList.other[1] == "Other Meds") {
            getElements('other').setAttribute("checked", "checked");
        }
                
        getElements('date').value = itemList.date[1];
        getElements('range').value = itemList.range[1];
        getElements('note').value = itemList.note[1];
        
        //Remove the initial listener from the input 'create reminder' button.
        createButton.removeEventListener("click", validateInput);
        //Change Submit button value to Edit button
        getElements('button').value = "Update Reminder";
        var changeButton = getElements('button');
        
        //Save the key value established in this function as a property of the editSubmit event.
        //So that we can use that value when we save the data we edited.
        changeButton.addEventListener("click", validateInput);
        changeButton.key = this.key;
        
    }
    
    function deleteReminder() {
        var askUser = confirm("Are you sure you want to delete this reminder?");
        if (askUser) {
            localStorage.removeItem(this.key);
            alert("Reminder was deleted!");
            window.location.reload();
        }else{
            alert("Reminder was NOT deleted.")
        }
    }
    
    function clearLocalStorage() {
        if (localStorage.length === 0) {
            alert("Reminder list is already empty.")
        } else {
            localStorage.clear();
            alert("All Reminders have been deleted!");
            window.location.reload();
            return false;
        }
    }
    
    function validateInput(eventData) {
        //Define the elements we want to check
        var getPetName = getElements('petname');
        var getPetAge = getElements('petage');
        var getPetType = getElements('pettype');
        
        //Reset Error Messages
        error.innerHTML = "";
        getPetName.style.border = "1px solid black";
        getPetAge.style.border = "1px solid black";
        getPetType.style.border = "1px solid black";
        
        
        //Get Error Messages
        var errorMessagesArray = [];
        
        //Pet Name Validation
        if (getPetName.value === "") {
            var nameError = "Please enter your pet's name.";
            getPetName.style.border = "2px solid red";
            errorMessagesArray.push(nameError);
        }
        
        
        //Pet Age Validation
        var re = /^\d{1,2}$/;
        if (!(re.exec(getPetAge.value))){
            var ageError = "Please enter your pet's numerical age.";
            getPetAge.style.border = "2px solid red";
            errorMessagesArray.push(ageError);
        }
        
        
        //Pet Type Validation
        if (getPetType.value === ""){
            var typeError = "Please enter your pet's type.";
            getPetType.style.border = "2px solid red";
            errorMessagesArray.push(typeError);
        }
        
        //If there were errors, display them on screen.
        if (errorMessagesArray.length >= 1) {
            for (var i=0, j=errorMessagesArray.length; i<j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = errorMessagesArray[i];
                error.appendChild(txt);
;            }

            eventData.preventDefault();
            return false;
        } else{
            //If all is OK, save our data!
            //Send key value which came from edit function.
            //Remember this key value was passed through the event Listener as a property.
            submitData(this.key);
        }

    }
    
    //Variable Defaults
    var fleaMedication = ["--Type of Flea Medication--", "Topical", "Oral", "Sprayon"];
    var fleaCheckBox;
    var fleaValue;
    var heartwormValue;
    var otherValue;
    var error = getElements('errors');
    makeFleaMedOptions();
    
    //Set Link & Submit Click Events
    
    var displayData = getElements('displayData');
    displayData.addEventListener("click", getDataFromStorage);
    var clearData = getElements('clearData');
    clearData.addEventListener("click", clearLocalStorage);
    var createButton = getElements('button');
    createButton.addEventListener("click", validateInput);
    
    
    
    
    
});

