const formElements = new POS.Fields("99346d84-5187-4221-9c16-dc51a8de27fa")
const placeholders = {
  cardNumber: '1234 1234 1234 1234',
  expDate: 'MM / YY'
}

const cardNumber = formElements.create('cardNumber', { placeholders })
cardNumber.mount('#card-number')

const expiry = formElements.create('creditCardExpiry', { placeholders })
expiry.mount('#exp-date')

document.getElementById('payment-form').addEventListener('submit', async(event) => {
    event.preventDefault()
    const additionalData = {
        holder_name: document.getElementById('cardholder-name').value // This field is mandatory
    }
    const result = await POS.createToken(cardNumber, {
        additionalData,
        environment: 'test' // Set the PaymentsOS environment you're connecting to
    })
    
    if (result.error) {
      alert(`${JSON.stringify(result.error)}. Please try again.`)
    } else {
      console.log(result)
      processPayment(JSON.parse(result))
    }
})


function processPayment(result) {
  console.log(result)
  var xhttp = new XMLHttpRequest()
  xhttp.open("POST", "/payment", true)
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.href = "/success"
    }
  }

  var data = new FormData();
  for(name in result) {
   data.append(name, result[name]);
  }
  
  xhttp.send(data)
}
