// bron voor de tutorial:  ...

const emailQuestionForm = document.getElementById("emailQuestionForm")

emailQuestionForm.addEventListener("submit", (e) => {
  console.log("emailQuestionForm is submitted")
  e.preventDefault()

  const inputs = emailQuestionForm.querySelectorAll("input") // select all inputs inside the emailQuestionForm-form   (remark from teaching assistent could've used a .reduce here but that is maybe too advanced for now.)


  //   console.log("email: " + teValiderenEmail)
  //   console.log("bericht: " + teValiderenBericht)

  validateInputs(inputs)
})


const validateInputs = (inputs) => {
    console.log("validateInputs nu uitvoeren")

    const email = inputs[0]
    const message = inputs[1]

   // de email en bericht-values los in een array stoppen 
    const inputValues = Array.from(inputs) // convert the NodeList from the html, to an array
    const inputDingen = inputValues.map((input) => {
      return input.value // return only the value of the input
    })
  
    // en daarna in hun eigen variabelen stoppen
    const teValiderenEmail = inputDingen[0] // test@test.nl
    const teValiderenBericht = inputDingen[1] // ik heb een vraag over de blablabla.

    const trimmedEmail = teValiderenEmail.trim() // get the value of the email input and trim it (remove whitespace at the beginning and end of the string)
    const trimmedMessage = teValiderenBericht.trim() // get the value of the message input and trim it (remove whitespace at the beginning and end of the string)
  
    if (trimmedEmail == "") {     // if the email is empty
      setError(email, "Email is required")
    } else if (!isValidEmail(trimmedEmail)) { // if the email is not valid (so: returned false from isValidEmail)
      setError(email, "Vul een geldig emailadres in")
    } else { // if the email is valid
      setSucces(email)
    }
  
    if (trimmedMessage == "") { // if the message is empty
      setError(message, "Message is required")
    } else { // if the message is not empty
      setSucces(message)
    }
  }

// for setting the error class to input control
const setError = (element, message) => {
  console.log("setError nu uitvoeren")
  const fieldsetElement = element.parentElement // get the parent element of the input
  const errorDisplay = fieldsetElement.querySelector(".errorMessage") // get the error element inside this fieldset

  errorDisplay.innerText = message // add error message to error display
  fieldsetElement.classList.add("error") // add error class to input control
  fieldsetElement.classList.remove("succes") // remove succes class from input control
}

// for setting the succes class to input control
const setSucces = (element) => {
  console.log("setSucces nu uitvoeren")
  const fieldsetElement= element.parentElement // get the parent element of the input

  const errorDisplay = fieldsetElement.querySelector(".errorMessage") // get the error display element

  errorDisplay.innerText = "" // remove any error messages
  fieldsetElement.classList.add("success") // add success class to input control
  fieldsetElement.classList.remove("error") // remove error class from input control


  const succesDisplay = document.querySelector(".successMessage") // get the succes display element
  const submitButton = document.querySelector(".signinButton") // get the submit button element

  succesDisplay.innerHTML = "Je bericht is verstuurd!" // add succes message to message display
  succesDisplay.classList.add("visible") // add visible class to successdisplay, making it visible
  submitButton.classList.add("hidden") // add hidden class to submit button, making it invisible
 
}

const isValidEmail = (email) => { // function to check if email is valid
console.log("isValidEmail nu uitvoeren")
  const regex =
    /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // regex to check if email is valid: the email must contain an @ and a .
  const emailToCheck = String(email).toLowerCase() // convert the email to string to lowercase
  return regex.test(emailToCheck) //check email with regex: returns true or false
}


// message
emailQuestionForm.addEventListener("submit", (e) => {
    console.log("emailQuestionForm is submitted: laatste functie nu uitvoeren")
  let messages = []
  if (message.value === "" || message.value == null) {
    messages.push("Stel je vraag eerst voor je verstuurt")
  }

  if (message.value.length <= 5) {
    messages.push("Je vraag moet langer zijn dan 5 tekens")
  }

  if (message.value.length >= 15) {
    messages.push("Je vraag mag niet langer zijn dan 25 tekens")
  }

  if (messages.length > 0) {
    e.preventDefault()
    errorMessage.innerText = messages.join(", ")
  }
})
