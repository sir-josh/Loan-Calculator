//Listen for form submission
document.querySelector('#loan-form').addEventListener('submit', function(e){
    //display loader icon for some seconds and result div
    document.querySelector('#loading').style.display = 'block';
    setTimeout(calculateResult, 1500);

    e.preventDefault();
});


// CalculateResult function definition
function calculateResult(){
    //Get all required UI variable for the calculation
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');
    
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        //First change the result div display to block
        document.querySelector('#result').style.display = 'block';
        //Hide the loader icon
        document.querySelector('#loading').style.display = 'none';

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    }else{
        //If there is error then change the result & loading div display to none
        document.querySelector('#result, #loading').style.display = 'none';
        showError('Please cross-check your inputs');
    }
}

function showError(errorMsg){
    //create div element
    const divElement = document.createElement('div');
    //Attach bootstrap alert danger class to the div element
    divElement.className = 'alert alert-danger';
    //append child error message inside the div
    divElement.appendChild(document.createTextNode(errorMsg));

    //Get the card class and heading(h1) inside the card class,then put the div message inbetween those DOM elements
    const cardElement = document.querySelector('.card');
    const h1Element = document.querySelector('.heading');
    cardElement.insertBefore(divElement,h1Element);

    //Set the amount of time the error div message will appear before it disappear
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
    
}
