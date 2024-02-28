const loadPhone = async (searchText ='13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');

    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    // console.log('Is show all', isShowAll)
    //display only first 12 phones if not show all
   if(!isShowAll){
    phones = phones.slice(0, 12);
   }


    phones.forEach(phone =>{
    // console.log(phone);
    //2 creat a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
    //3  set inner html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
            <button onclick = "handleShowdetails('${phone.slug}')
            " class="btn btn-primary">Show Details</button>
        </div>
        </div>
    `;
    // 4 append child
    phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoadingSpinner(false);
}

//Event handler search button
const handlesearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

//Show datails 
const handleShowdetails = async (id) =>{
    // console.log('clicked show details', id)
    //load single phone data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    //show the modal
    show_details_modal.showModal();
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }

}

//handle show all 
const handleShowAll = () =>{
 handlesearch(true);
}

loadPhone();