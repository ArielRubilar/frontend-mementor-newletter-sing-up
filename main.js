const required = () =>  ( value ) => {
    return value && value.length > 0
}

const pattern = ( regex ) => ( value ) => {
    return regex.test(value)
}

const regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
const d = document

const handleSubmit =( $form , $cardForm , $cardMessage ) =>   ( event ) => {
    event.preventDefault()

    const $emailInput =  $form.querySelector('[name="email"]')
    const email = $emailInput.value
    
    const validations = [
        required(),
        pattern(regexEmail)
    ]
    
    const isValidEmail = validations.every( validation => validation(email) )

    $emailInput.toggleAttribute('aria-invalid', !isValidEmail)

    if(isValidEmail) {
        const spanEmail = $cardMessage.querySelector('#span-email')
        spanEmail.innerText = email
        $cardForm.classList.toggle('d-none')
        $cardMessage.classList.toggle('d-none')
        $form.reset();
    }
}

const handleClickDismiss = ($cardForm , $cardMessage) => () => {
    $cardForm.classList.toggle('d-none')
    $cardMessage.classList.toggle('d-none')
}


d.addEventListener("DOMContentLoaded", (event) =>  {
    const $document = event.target
    const $form = $document.querySelector('#form')

    const $cardForm = $document.querySelector('#card-form')
    const $cardMessage = $document.querySelector('#card-message')

    const $btnDismiss =  $document.querySelector('#bnt-dismiss-message')

    $form.addEventListener('submit', handleSubmit($form , $cardForm , $cardMessage))

    $btnDismiss.addEventListener( 'click', handleClickDismiss($cardForm, $cardMessage) )
});

