let peopleSection = document.querySelector("section.people");
let modal = document.querySelector("aside");
let modalImage = document.querySelector("aside img");
let modalName = document.querySelector("p.name");
let modalAddress = document.querySelector("p.address");
let modalcountry = document.querySelector("p.country");
let modalButton = document.querySelector("aside button");


const createPersonCard = (person) => {
  let card = document.createElement("div");
  card.classList.add("card");

  let imageDiv = document.createElement("div");
  imageDiv.classList.add("image-div");

  let personImage = document.createElement("img");
  personImage.src = person.picture.large

  imageDiv.append(personImage)


  let name = `${person.name.title} ${person.name.first} ${person.name.last}`;
  let nameP = document.createElement("p");
  nameP.textContent = name;

  let gender = `${person.gender}`;
  let genderP = document.createElement("p");
  genderP.textContent = gender;

  let email = `${person.email}`;
  let emailP = document.createElement("p");
  emailP.textContent = email;

  let date = new Date(person.dob.date);

  let dob = `${getDate(date.getDate())} ${getMonth(date.getMonth())} ${date.getFullYear()}`;
  let dobP = document.createElement("p");
  dobP.textContent = dob;

  let phone = person.phone;
  let phoneP = document.createElement("p");
  phoneP.textContent = phone;


  card.append(imageDiv);
  card.append(nameP);
  card.append(dobP);
  card.append(genderP);
  card.append(emailP);
  card.append(phoneP);

  return card;
}


let people;
let newPeople;
window.onload = () => {

  fetch("https://randomuser.me/api/?results=12").then((res) => {
    return res.json();
  }).then((data => {
    people = data.results;

  })).catch((e) => {
    console.error(e);
  }).finally(() => {
    for (const person of people) {
      peopleSection.append(createPersonCard(person))
    }
  });
}



window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    fetch("https://randomuser.me/api/?results=12").then((res) => {
      return res.json();
    }).then((data => {
      newPeople = data.results;
    })).catch((e) => {
      console.error(e);
    }).finally(() => {
      for (const person of newPeople) {
        peopleSection.append(createPersonCard(person))
      }
      newPeople.forEach((v) => {
        people[people.length] = v;
      });

      document.querySelectorAll(".card").forEach((v, i) => {
        v.addEventListener("click", () => {

        });
        v.onclick = () => {
          modal.style.display = "flex";
          modal.style.opacity = 0;
          setInterval(() => {
            modal.style.opacity = 1;
          }, 100);
          modalImage.src = people[i].picture.large;
          modalName.textContent = `${people[i].name.title} ${people[i].name.first} ${people[i].name.last}`;
          modalAddress.textContent = `${people[i].location.street.number} ${people[i].location.street.name}, ${people[i].location.city}, ${people[i].location.state}`;
          modalcountry.textContent = people[i].location.country;
        }
      });
    });
  }
});



modalButton.addEventListener("click", () => {
  modal.style.opacity = 0;
  modal.style.display = "none"
})

const slideToggle = (element) => {

  element = document.querySelector(".options");
  if (element.style.display === "none") {
    element.style.height === 0
    element.style.display === "inherit"
    setInterval(() => {
      navButton.style.height === "fit-content"

    }, 100);
  }
}
let navButton = document.querySelector("nav button");

navButton.addEventListener("click", () => {
  if (navButton.style.display === "none") {
    navButton.style.height === 0
    navButton.style.display === "inherit"
    setInterval(() => {
      navButton.style.height === "fit-content"
    }, 100);
  }
})