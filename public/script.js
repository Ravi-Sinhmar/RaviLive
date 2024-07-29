
const navButtons = document.querySelectorAll('.nav-button');
const navBg = document.querySelector('#navbg');
function removeSpaces(text) {
  // Remove all whitespace characters (spaces, tabs, newlines)
  return text.replace(/\s/g, "");
}
navButtons.forEach(button => {
  button.addEventListener('click', function(){
    const nextLeft = this.offsetLeft;
  const travelWidth = nextLeft;
  const itemWidth = this.offsetWidth;
    document.documentElement.style.setProperty('--travel-width', `${travelWidth}px`);
    document.documentElement.style.setProperty('--item-width', `${itemWidth}px`);
  
    navButtons.forEach(bt => {
    bt.classList.remove('text-white');

// changing the page connent according to the click 

   });

    navBg.classList.toggle('active');
    this.classList.toggle('text-white');
    const contentId=button.textContent.toLowerCase()+'-section';
    const url=button.textContent.toLowerCase();
    const newUrl=removeSpaces(url);

    
    console.log(contentId);
    // removing spaces from texts by above declared function using here 
    const finalId = removeSpaces(contentId);
    console.log(finalId);
    const contentElement= document.getElementById(finalId);
    console.log(contentElement);
    document.querySelectorAll('section').forEach(section =>{
      section.classList.add('hidden');
      contentElement.classList.remove('hidden');

      const finalUrl = `/${newUrl}`;
history.pushState({}, null, finalUrl);
      
    })

  
    
  })
})
