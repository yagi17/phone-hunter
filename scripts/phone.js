// load data
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer=document.getElementById('phone-container')

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    console.log('is show all', isShowAll);

    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    // display only first 12;

    phones = phones.slice(0,12);

    phones.forEach(phone => {
        // console.log(phone);
        // step 2 : create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-6 bg-gray-100 shadow-xl`
        // setp 3 : set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        // 4 append child
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle search button
const handleSearch = (isShowAll)=>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText)
}

// // handle search recap
// const handleSearch2= () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2')
//     const searchText = searchField.value;
//     // console.log(searchText);
//     loadPhone(searchText)
// }

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}
// loadPhone();