const optGroup = document.getElementById("optgroup");
const countrySelect = document.getElementById("countrySelect");
const countryInfo = document.getElementById("countryInfo");
const countryImg = document.getElementById("countryImg");
const countryCoatOfArms = document.getElementById("countryCoatOfArms");
const unitedNations = document.getElementById("unitedNations");
const independent = document.getElementById("independent");
const someFacts = document.getElementById("someFacts");
const newsDiv = document.getElementById("news");
const mapOfCountry = document.getElementById("mapOfCountry");
const apiKey = "AIzaSyBeFwbxwlie8EhSrN2Npe8rBhbNf5cXSnI";
const googleMapsBttn = document.getElementById("googleMapsBttn");
const submitBttn = document.getElementById("submit");
const newsAndEmailSection= document.getElementById("newsAndEmailSection")
const infoSection=document.getElementById("infoSection")
const alertMessage=document.getElementById("alertMessage")
const serviceId = "service_fomox93";
const templeteId = "template_r98zw69";


const countriesAPI = async () => {
  try {
      const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
  } catch (error) {
    console.log(error)
    
  }

};

const printCountries = async () => {
  try { 
     let countries = await countriesAPI();
  countries.forEach((country) => {
    optGroup.innerHTML += `<option>${country.name.common}</option>`;
  });
    
  } catch (error) {
    console.log(error)
    
  }

};

const newsAPI = async (cca2) => {
  try { 
     const res = await fetch(
    `https://api.worldnewsapi.com/search-news?api-key=c95390e1879f4276a25a23a78e57538a&text=${cca2}`
  );
  const data = await res.json();
  return data;
    
  } catch (error) {
    console.log(error)
    
  }

};
function checkImage(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.onload = function() {
      resolve(true); // The image exists
    };
    image.onerror = function() {
      reject(false); // The image doesn't exist or an error has occurred
    };
    image.src = url;
  });
}

const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;

const printNews = async (cca2) => {
  try {
    let cNews = await newsAPI(cca2);
    newsAndEmailSection.style.display = "block";
    cNews.news.forEach(cnew=>{
      if(imageUrlRegex.test(cnew.image) ){
        
        checkImage(cnew.image).then(()=>{
          newsDiv.innerHTML += `
          <div class=" col-lg-4  col-md-6 col-sm-6">
            <div class="news-box">
              <div class="new-thumb"> <img src="${cnew.image}" alt="">
              </div>
              <div class="new-txt">z
                <ul class="news-meta">
                  <li>${cnew.publish_date}</li>
                </ul>
                <h6><a href="${cnew.url}">${cnew.title.slice(0, 20)}...</a></h6>
                <p>${cnew.text.slice(0, 101)}...</p>
              </div>
              <div class="news-box-f"> <img 
                src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                alt="">${cnew.author.slice(0, 20)}...<a href="${cnew.url}"><i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>`
        }).catch((e)=>{
          console.log(e);
        })
                
      }
  
  
    })
    
  } catch (error) {
    console.log(error)
    
  }

  
};


function sendMail() {

}
submitBttn.addEventListener("click", ()=>{
  (function () {
    emailjs.init("J2yNuV9aukufAhDad");
  })();
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send(serviceId, templeteId, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      //console.log(res);
      alertMessage.classList.replace("alert-danger","alert-success")
      alertMessage.removeAttribute("hidden")
      alertMessage.innerHTML=`Your Message Sent Successfully.`
     
      setTimeout(()=>{
        alertMessage.setAttribute("hidden", "hidden")
      },4000)
    })
    .catch((err) => {
      //console.log(err);
      alertMessage.classList.replace("alert-success","alert-danger")
      alertMessage.removeAttribute("hidden")
      alertMessage.innerHTML=`Sorry, there is something wrong. Try again.`
      setTimeout(()=>{
        alertMessage.setAttribute("hidden", "hidden")
      },4000)
    });

});

const countryAPI = async (country) => {
  try {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
  const data = await res.json();
  return data;
    
  } catch (error) {
    console.log(error)
    
  }

};
const getCountray = async (countryName) => {
  try {
    let country = await countryAPI(countryName);
    //console.log(country);
    newsDiv.innerHTML=``;
    country.forEach(item=>{
      infoSection.style.display = "block";
      countryImg.src = `${item.flags.png}`;
      countryCoatOfArms.src = `${item.coatOfArms.png}`;
      if (item.unMember == false) {
        unitedNations.classList.replace("fa-check", "fa-times");
      } else {
        unitedNations.classList.replace("fa-times", "fa-check");
      }
      if (item.independent == false) {
        independent.classList.replace("fa-check", "fa-times");
      } else {
        independent.classList.replace("fa-times", "fa-check");
      }
      let population = item.population.toLocaleString();
      someFacts.innerHTML = `
      <div class="container" >
          <h2>Read Some Facts</h2>
          <ul>
             <li>
                <div class="facts-icon"><i class="fas fa-users"></i></div>
                <strong>${population}</strong> <span>Population</span> 
             </li>
             <li>
                <div class="facts-icon"><i class="fas fa-map-marked-alt"></i></div>
                <strong>${item.region}</strong> <span>Region</span> 
             </li>
             <li>
                <div class="facts-icon"><i class="fas fa-calendar-alt"></i></div>
                <strong>${item.startOfWeek}</strong> <span>Start Of Week</span> 
             </li>
             <li>
                <div class="facts-icon"><i class="fas fa-clock"></i></div>
                <strong>${item.timezones}</strong> <span>Time zone</span> 
             </li>
             <li>
                <div class="facts-icon"><i class="fas fa-home"></i></div>
                <strong>${item.capital}</strong> <span>Capital</span> 
             </li>
          </ul>
          </div>
          `;
  
      mapOfCountry.src = `https://www.google.com/maps?q=${item.name.common}&hl=en&z=6&output=embed`;
      googleMapsBttn.href = item.maps.googleMaps;
      printNews(item.cca2);
    })
  
  
    
  } catch (error) {
    console.log(error)
  }
 };

countrySelect.addEventListener("change", () => {
  getCountray(countrySelect.value)
});

printCountries();
