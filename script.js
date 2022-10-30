const main = document.querySelector('.main')
const addTeamButton = document.querySelector('.add-team')
const relegatedButton = document.querySelector('.relegate')
const showQualifiedButton = document.querySelector('.show-qualified')
const sortButton = document.querySelector('.sort')
const doublePointsButton = document.querySelector('.double')

let data = []
console.log(data)




// fetch country - add points


const getRandomTeam = async () => {
  const results = await fetch('https://randomuser.me/api')
  const data = await results.json()

  const team = data.results[0]

  const newTeam = {
    name: team.location.country,
    points: Math.floor(Math.random() * 100),
  }
  addData(newTeam)
}
getRandomTeam()
addTeamButton.addEventListener('click', getRandomTeam)
const addData = (object) => {
  data.push(object)
  updateDOM()
}




// show only relgated countries


const showRelegated = () => {
  data = data.filter((team) => team.points <= 49)
  updateDOM()
}
relegatedButton.addEventListener('click', showRelegated)





// sort teams by most points
const sortByPoints = () => {
  data.sort((a, b) => b.points - a.points)
  updateDOM()
}
sortButton.addEventListener('click', sortByPoints)







// filter only qualified
const showQualified = () => {
  data = data.filter((team) => team.points > 49)
  updateDOM()
}


showQualifiedButton.addEventListener('click', showQualified)






//update DOM -- NOT MY OWN CODE AT ALL
const updateDOM = (providedData = data) => {
  // clear main div
  console.log(data)
  main.innerHTML = '<h2><strong>Team</strong> Points</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${(item.points)}`;
    main.appendChild(element)
  });
}

// double points using map
const doublePoints = () => {
  data = data.map((team) => {
    return { name: team.name, points: team.points * 2 };
  });

  updateDOM()
}
doublePointsButton.addEventListener('click', doublePoints)




