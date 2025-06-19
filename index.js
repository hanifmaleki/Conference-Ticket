const MAX_ALLOWED_UPLOAD_SIZE = 500 * 1024

const iconUploadOriginal = 'assets/images/icon-upload.svg'
let avatarUploadedSuccesfully = false
let url 

let formSection
let ticketSection
let uploadImageButtonDiv 
let uploadAvatarImage
let uploadContainerTextDiv 
let uploadImageActionDiv
let fileUploadErrorDiv 
let fileUploadBelowDiv 

// Ticket section
let ticketFullNameSpan
let ticketEmailSpan
let ticketImage
let ticketFullnameDiv
let ticketGithubDiv

window.onload = () => {
    formSection = document.querySelector('#form-section')
    ticketSection = document.querySelector('#ticket-section')
    uploadImageButtonDiv = document.querySelector('#upload-button-image')
    uploadAvatarImage = document.querySelector('#upload-avatar-image')
    uploadContainerTextDiv = document.querySelector('#upload-container-text')
    uploadImageActionDiv = document.querySelector('#upload-image-button-container')
    fileUploadErrorDiv = document.querySelector('#file-upload-error-container')
    fileUploadBelowDiv = document.querySelector('#file-upload-below-container')

    ticketFullNameSpan = document.querySelector('#full-name-span-id')
    ticketEmailSpan = document.querySelector('#email-span-id')
    ticketImage = document.querySelector('#ticket-avatar-image-id')
    ticketFullnameDiv = document.querySelector('#ticket-fullname-div-id')
    ticketGithubDiv = document.querySelector('#ticket-github-div-id')

    uploadImageButtonDiv.addEventListener('click', uploadImageDivOnClick)
    document.querySelector('#change-image-button').addEventListener('click', uploadImageDivOnClick)
    document.querySelector('#remove-image-button').addEventListener('click', removeUploadedImage)

    setInitialUploadImageButton()

    const inputWrapperDivs = document.querySelectorAll('.input-wrapper')
    inputWrapperDivs.forEach(inputWrapperDiv => {
        input = inputWrapperDiv.querySelector('input')
        input.addEventListener('focus', () => inputWrapperDiv.classList.add('focused'))
        input.addEventListener('blur', () => inputWrapperDiv.classList.remove('focused'))
        
        input.wrapper = inputWrapperDiv
    })

    ticketSection.style.display = 'none'
}

function formSubmitted() {
    const uploadInput = document.querySelector('#avatar')
    const uploadInputWrapperDiv = uploadInput.wrapper
    const nameInput = document.querySelector('#name')

    uploadInputWrapperDiv.classList.remove('input-wrapper-error')

    if (!avatarUploadedSuccesfully) {
        uploadInputWrapperDiv.classList.add('input-wrapper-error')
        
        return false
    }

    const name = nameInput.value.trim()
    if (!name) {
        nameInput.classList.add('input-wrapper-error')

        return false
    }

    const email = document.querySelector('#email').value.trim()
    if (!email) {

        return false
    }

    ticketFullNameSpan.textContent = name
    ticketFullnameDiv.textContent = name
    ticketEmailSpan.textContent = email
    ticketGithubDiv.textContent = document.querySelector('#github').value.trim()

    formSection.style.display = 'none'
    ticketSection.style.display = 'block'

    return false
}

async function uploadImageDivOnClick(event) {
    const pickerOpts = {
        id: 123456,
        types: [
            {
                description: 'Images',
                accept: {
                    "image/*": ['.png', '.gif', '.jpeg', '.jpg'],
                },
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
    }

    const [fileHandle] = await showOpenFilePicker(pickerOpts)

    const fileData = await fileHandle.getFile()

    if (fileData.size > MAX_ALLOWED_UPLOAD_SIZE) {
        fileUploadErrorDiv.style.display = 'flex'
        fileUploadBelowDiv.style.display = 'none'

        return
    }

    url = URL.createObjectURL(fileData)

    uploadAvatarImage.src = url
    ticketImage.src = url


    uploadContainerTextDiv.style.display = 'none'
    uploadImageActionDiv.style.display = 'flex'
    avatarUploadedSuccesfully = true
}

function removeUploadedImage() {
    avatarUploadedSuccesfully = false
    setInitialUploadImageButton()
}

function setInitialUploadImageButton() {
    url = new URL(`${iconUploadOriginal}`, window.location.href)
    uploadAvatarImage.src = url
}

function onUploadError(error) {
    console.log('upload error', error)
}

