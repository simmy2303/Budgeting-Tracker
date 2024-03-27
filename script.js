const transactions = JSON.parse(localStorage.getItem("transactions")) || [];


const list=document.getElementById('transactionslist');
const status= document.getElementById('status');
const form= document.getElementById('transaction');
const balance= document.getElementById('balance');;
const income= document.getElementById('income');
const expense= document.getElementById('expense');

form.addEventListener('submit', addTransaction);

function updateTotal() {
    const incomeTotal = transactions
      .filter((trx) => trx.type === "income")
      .reduce((total, trx) => total + trx.amount, 0);
  
    const expenseTotal = transactions
      .filter((trx) => trx.type === "expense")
      .reduce((total, trx) => total + trx.amount, 0);
  
      let balanceTotal = incomeTotal - expenseTotal;

     
      if (balanceTotal < 0) {
          balanceTotal = 0;
      }
  
  
    balance.textContent = formatter.format(balanceTotal).substring(1);
    
    income.textContent = formatter.format(incomeTotal);
    expense.textContent = formatter.format(expenseTotal * -1);
  }
  


const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MYR",
    signDisplay: "always",
  });

function renderList(){
    list.innerHTML='';
    status.textContent="";
    if(transactions.length===0){
        status.textContent= "No transactions.";
        return;
    }
    transactions.forEach(({ id, name, amount, date, type  })=>{
        const li= document.createElement('li');
        const sign = "income" === type ? 1 : -1;

        li.innerHTML=`
            <div class="name">
                <h4>${name}</h4>
                <p>${new Date(date).toLocaleDateString()}</p>
            </div>
            <div class="amount ${type}">
                <span>${formatter.format(amount*sign)}</span>
            </div>
            <div class="action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTrans(${id})">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
          </div>
        
        `;
        list.appendChild(li);
    })

}
renderList();
updateTotal();

 function deleteTrans(id){
    const index = transactions.findIndex((trx)=>trx.id===id);
    transactions.splice(index,1);

    updateTotal();
    renderList()
 }
 function addTransaction(e){
    e.preventDefault();
    const formData = new FormData(this);

    transactions.push({
        id:transactions.length+1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: "on" === formData.get("type") ? "income" : "expense",
        });
        this.reset();
        saveTransactions();
        updateTotal();
        renderList();

 }

 function changeTheme(theme) {
  const body = document.body;
  const header= document.querySelector('header');
  const submitbutton= document.querySelector('.submitt');

  body.classList.remove('standardTheme', 'lightTheme', 'darkerTheme');
  
  if (theme === 'standardTheme') {
    body.classList.add('standardTheme');
  } else if (theme === 'lightTheme') {
    body.classList.add('lightTheme');
  } else if (theme === 'darkerTheme') {
    body.classList.add('darkerTheme');
  }
  if (theme === 'darkerTheme') {
    header.classList.add('darkerThemeH');
    submitbutton.classList.add('darkerThemeS');
  } else {
    header.classList.remove('darkerThemeH');
    submitbutton.classList.remove('darkerThemeS');
  }
  if (theme==='lightTheme'){
    header.classList.add('lighterThemeH');
    submitbutton.classList.add('lighterThemeS');
  } else {
    header.classList.remove('lighterThemeH');
    submitbutton.classList.remove('lighterThemeS');
  }
  if (theme==='standardTheme'){
    header.classList.add('standThemeH');
    submitbutton.classList.add('standThemeS');
  } else {
    header.classList.remove('standThemeH');
    submitbutton.classList.remove('standThemeS');
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const standardThemeButton = document.querySelector('.standardTheme');
    const lightThemeButton = document.querySelector('.lightTheme');
    const darkerThemeButton = document.querySelector('.darkerTheme');
  
    standardThemeButton.addEventListener('click', function () {
      changeTheme('standardTheme');
    });
  
    lightThemeButton.addEventListener('click', function () {
      changeTheme('lightTheme');
    });
  
    darkerThemeButton.addEventListener('click', function () {
      changeTheme('darkerTheme');
    })})
}


 function saveTransactions() {
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }