window.addEventListener("load", setupGallery);
window.addEventListener("load", createLightboxes);

function createLightboxes() {
   const lightBoxes = document.querySelectorAll(".slideshow");

   lightBoxes.forEach((lightBox, index) => {
      const slideShowName = lightBox.getAttribute("name");
      let imgArray;

      // Select the correct image array based on slideshow name
      switch (slideShowName) {
         case "kid":
            imgArray = imgKids;
            break;
         case "highschool":
            imgArray = imgHighSchool;
            break;
         case "collegiate":
            imgArray = imgCollegiate;
            break;
         default:
            console.warn("Unknown slideshow name:", slideShowName);
            return;
      }

      const imgCount = imgArray.length;
      let currentImg = 1;
      let timeID;

      // Create slideshow UI elements
      const lbCounter = document.createElement("div");
      lbCounter.className = "lbCounter";
      lbCounter.innerText = currentImg + " / " + imgCount;

      const lbPrev = document.createElement("div");
      lbPrev.className = "lbPrev";
      lbPrev.innerHTML = "&#9664;";

      const lbNext = document.createElement("div");
      lbNext.className = "lbNext";
      lbNext.innerHTML = "&#9654;";

      const lbPlay = document.createElement("div");
      lbPlay.className = "lbPlay";
      lbPlay.innerHTML = "&#9199;";

      const lbImages = document.createElement("div");
      lbImages.className = "lbImages";

      lightBox.append(lbCounter, lbPrev, lbNext, lbPlay, lbImages);

      // Populate images
      imgArray.forEach((src, i) => {
         const image = document.createElement("img");
         image.src = src;
         image.alt = imgCaptions[i];
         image.onclick = createOverlay;
         lbImages.appendChild(image);
      });

      // Navigation functions
      function showPrev() {
         lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
         currentImg = currentImg > 1 ? currentImg - 1 : imgCount;
         lbCounter.innerText = currentImg + " / " + imgCount;
      }

      function showNext() {
         lbImages.appendChild(lbImages.firstElementChild);
         currentImg = currentImg < imgCount ? currentImg + 1 : 1;
         lbCounter.innerText = currentImg + " / " + imgCount;
      }

      // Event bindings
      lbPrev.onclick = showPrev;
      lbNext.onclick = showNext;

      lbPlay.onclick = () => {
         if (timeID) {
            clearInterval(timeID);
            timeID = null;
         } else {
            showNext();
            timeID = setInterval(showNext, 1500);
         }
      };
   });
}

function createOverlay(){
   let overlay = document.createElement("div");
   overlay.id = "lbOverlay";
   let figureBox = document.createElement("figure");
   let overlayImage = this.cloneNode(true);
   figureBox.appendChild(overlayImage);
   let overlayCaption = document.createElement("figcaption");
   overlayCaption.textContent = this.alt;
   figureBox.appendChild(overlayCaption);
   let closeBox = document.createElement("div");
   closeBox.id = "lbOverlayClose";
   closeBox.innerHTML = "X";
   closeBox.onclick = function(){
      document.body.removeChild(overlay);
   }
   overlay.appendChild(closeBox);
   overlay.appendChild(figureBox);
   document.body.appendChild(overlay);
}

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("gallery");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
   

   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "activeModal";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "modalClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
   }
   
}