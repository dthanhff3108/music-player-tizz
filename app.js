import {appFirebase ,db} from './firebaseConfig.js'
import { collection, getDocs, query} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = $(".app")

const headerContainer = $(".header")
const controlContainer = $(".control")
const menuContainer = $(".menu")
const authorContainer = $(".author")

const menuItem = $$(".menu-item")
const lightBg = $(".light-bg")
const switchMode = $(".switch-mode")
const backGround = $(".background")

const mousePointer = $(".mouse-cursor")

const fullScr = $(".full-scr")
const shareBtn = $$(".share")

const imgAuthor = $(".author img")
const mainAudio = $(".audio-main")
const fireAudio = $(".audio-fire")
const trafficAudio = $(".audio-traffic")
const rainAudio = $(".audio-rain")

const songNameText = $(".name-song")
const songArtistText = $(".name-artist")
const playBtn = $(".play-pause-btn")
const nextBtn = $(".next-btn")
const prevBtn = $(".prev-btn")
const sliderDuration = $("#song-range")
const sliderDurationTrack = $("#range-label")



const mixMode = $(".mix-mode")
const repeatBtn = $(".repeat-btn")
const shuffleBtn = $(".shuff-btn")

const volumeRange = $(".volume-range")
const volumeTracked = $(".volume-range-tracked")

const volumeFire = $(".fire")
const volumeFireIcon = $(".fire-icon  > path")

const volumeTraffic = $(".traffic")
const volumeTrafficIcon = $(".traffic-icon  > path")

const volumeRain = $(".rain")
const volumeRainIcon = $(".rain-icon  > path")

const contactPopup = $(".contact-popup")
const contactNav  = $$(".item-contact")
const contactPopupClose = $(".close-contact-popup")

const responsiveMenu = $(".responsive-menu")
const closeTabletMenuBtn = $(".close-tablet-menu")
const openTabletMenuBtn  = $(".handle-phone")


const playerMusic = {
    currentIndex :0,
    isPlaying : false,
    isRainning : false,
    isNight : false,
    isRepeat : false,
    isShuffle : false,
    listSongsDefault : [
        {
            name:"lofi-1",
            thumb : "https://i.ibb.co/vw24pz6/lifted.png",
            src : "./music/lofi-1.mp3"
        },
        {
            name  :"lofi-car",
            thumb: "https://i.ibb.co/SQrYBBc/clovr.png",
            src : "./music/lofi-car.mp3"
        },
        {
            name: " lofi-study",
            thumb: "https://i.ibb.co/7pXZ8gF/space.png",
            src : "./music/lofi-study.mp3"
        },
        {
            name: " chim sau",
            thumb: "https://yt3.ggpht.com/ytc/AKedOLQfWG2jyoT5wok4VxGm4XTKnhH4p-e6MUVbHKc_=s176-c-k-c0x00ffffff-no-rj",
            src : "./music/chimsau.mp3"
        },
        {
            name: " lofi-study",
            thumb: "https://yt3.ggpht.com/mTwSVZXUOwAIzrSInjYBS0EHkl1Lmm2ya9qVy-VkkQ7OjcZoLFdbANN9571zgIPDnnE-VaeL=s88-c-k-c0x00ffffff-no-nd-rj",
            src : "./music/river.mp3"
        },
    ],
    songs : [] ,
    async getAllMusic(db) {
        const colRef = query(collection(db,"music-link"));
        const querySnapshot = await getDocs(colRef);
        querySnapshot.forEach(doc=>{
            this.songs.push(doc.data())
        })  
    },
    menuItemActive(e,index){
        const parentLi = e.target.closest("li");
        if(!$(".menu-item.active")){
            parentLi.classList.add("active");
        }
        else if($(".menu-item.active")!==parentLi){
            $(".menu-item.active").classList.remove("active");
            parentLi.classList.add("active");
        }
        else if($(".menu-item.active")===parentLi
                &&e.target.closest("li")===$(".menu-item.active")
                &&e.target.closest(".options")!==$(`.option-${index+1}`)){
            parentLi.classList.remove("active");
        }
    },
    fullScrHandle(){
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }        
    },
    
    async loadCurrentSong(){
        mainAudio.src =this.songs[this.currentIndex].src
        imgAuthor.src = this.songs[this.currentIndex].thumb
        songNameText.textContent = this.songs[this.currentIndex].name
        songArtistText.textContent = this.songs[this.currentIndex].singer
    },
    nextSong(){
        if(this.isShuffle){
            this.currentIndex = Math.floor(Math.random() * 3)
            this.loadCurrentSong()
            mainAudio.play()
        }  
        else if(this.currentIndex===this.songs.length-1){
            this.currentIndex=0
            this.loadCurrentSong()
            mainAudio.play()
        }
        else{
            this.currentIndex++
            this.loadCurrentSong()
            mainAudio.play()
        }
    },
    prevSong(){
        if(this.isShuffle){
            this.currentIndex = Math.floor(Math.random() * 3)
            this.loadCurrentSong()
            mainAudio.play()
        }  
        else if(this.currentIndex===0){
            this.currentIndex=this.songs.length-1
            this.loadCurrentSong()
            mainAudio.play()
        }
        else{
            this.currentIndex--
            this.loadCurrentSong()
            mainAudio.play()
        }
    },
    changeMode(){
        const check = $("#mode")
        check.onclick =()=>{
            if(check.checked){
                if(this.isRainning){
                    backGround.classList.remove("daytime-rain")
                    backGround.classList.add("night-rain")
                }
                else{
                    backGround.classList.add("night")
                }
                this.isNight = true
            }
            else{
                if(this.isRainning){
                    backGround.classList.remove("night-rain")
                    backGround.classList.add("daytime-rain")
                }
                else{
                    backGround.classList.remove("night")
                }
                this.isNight = false                                  
            }   
        }
    },
    showTabs(bool){
        if(bool){
            headerContainer.style.transform = "translateY(0)"
            controlContainer.style.bottom = "8%"
            menuContainer.style.right = "20px"
            authorContainer.style.bottom = "18px"
        }
        else{
            headerContainer.style.transform = "translateY(-100%)"
            controlContainer.style.bottom = "-100%"
            menuContainer.style.right = "-200%"
            authorContainer.style.bottom = "-100%"
        }
    },
    handleClick(e){
        const _this = this
        let isShowTab = false
        let timeOut
        // Show animation Loading
        window.onload = ()=>{
            $(".load-background").style.display ="none"
        }
        window.onclick = (e)=>{
            if(e.target.closest(".menu")!==$(".menu")){
                if($(".menu-item.active")){
                    $(".menu-item.active").classList.remove("active")
                }
            }
        }
        // toggle tab
        window.onmouseover = ((e) =>{
            // Check device type
                if(document.body.offsetWidth > 850){
                    if(timeOut){
                        clearTimeout(timeOut)
                    }
                    if(isShowTab===false){
                        isShowTab = true
                        _this.showTabs(true)
                    }
                }
            }
        )
        window.onmouseout = ((e) =>{
            // Check device type
            if(document.body.offsetWidth > 650){
                if(isShowTab===true){
                    timeOut = setTimeout(() => {
                        _this.showTabs(false)
                        isShowTab = false
                    },8765)
                }
            }
        })
        //Share Btn
        shareBtn.forEach(shareItem=>shareItem.onclick = ()=>{
            navigator.clipboard.writeText("https://dinhduythanh3182.github.io/music-player-tizz/")
            }
        )     
        //Tablet menu
        openTabletMenuBtn.onclick = ()=>{
            responsiveMenu.classList.add("active")
        }
        closeTabletMenuBtn.onclick = ()=>{
            responsiveMenu.classList.remove("active")
        }
        // 
       
        mainAudio.onended = ()=>{
            if(_this.isRepeat){
                _this.loadCurrentSong()
                mainAudio.play()
            }
            else{
                nextBtn.click()
            }
        }
        contactNav.forEach(item=>item.onclick = ()=>{
            openModal.play()
            contactPopup.classList.toggle("active")
            responsiveMenu.classList.remove("active")
            } 
        )
        contactPopupClose.onclick = ()=>{
            closeModal.play()
            setTimeout(()=>{
                contactPopup.classList.toggle("active")
            },200)
        }
        const openModal = contactPopup.animate(
            [   {opacity: "0"},
                {opacity: "1"}],
            {
                duration: 100,
                iterations: 1,
            })
        const closeModal = contactPopup.animate(
            [   {opacity: "1"},
                {opacity: "0"}],
            {
                duration: 200,
                iterations: 1,
            })

        const repeatAnimate = repeatBtn.animate(
            [   {transform: "scale(0.9)"},
                {transform: "scale(1)"}],
            {
                duration: 200,
                iterations: 1,
            })
        
        const shuffleAnimate = shuffleBtn.animate(
            [   {transform: "scale(0.9)"},
                {transform: "scale(1)"}],
            {
                duration: 200,
                iterations: 1,
            })

      

        menuItem.forEach((item,index)=>(
            item.onclick = function(e){
                _this.menuItemActive(e,index)
            }        
        ))
        switchMode.onclick = ()=>{
            _this.changeMode()
           
        }
        fullScr.onclick = this.fullScrHandle

        repeatBtn.onclick = ()=>{
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle("active",_this.isRepeat)
            repeatAnimate.play()
        }
        shuffleBtn.onclick = ()=>{
            _this.isShuffle = !_this.isShuffle
            shuffleBtn.classList.toggle("active",_this.isShuffle)
            shuffleAnimate.play()
        }
        playBtn.onclick = ()=>{
            if(!this.isPlaying){
                mainAudio.play()
            }
            else{
                mainAudio.pause()
            }
        }
        nextBtn.onclick = ()=>{
            this.nextSong()
        }
        prevBtn.onclick = ()=>{
            this.prevSong()
        }
        // Main Audio
        mainAudio.ontimeupdate = () => {
            if(mainAudio.duration){
                sliderDuration.value = ( mainAudio.currentTime / mainAudio.duration ) * 100
                sliderDurationTrack.style.width = ( mainAudio.currentTime / mainAudio.duration ) * 100 + '%'
            }
        }
        sliderDuration.oninput = () => {
            mainAudio.pause()
            sliderDurationTrack.style.width = sliderDuration.value + '%' 
            mainAudio.currentTime = (sliderDuration.value * mainAudio.duration) / 100
            sliderDuration.onmouseup = () => {
                mainAudio.play()
            }
        }
        mainAudio.onplay = ()=>{
            this.isPlaying = true
            playBtn.classList.add("playing")
        }
        mainAudio.onpause = ()=>{
            this.isPlaying = false
            playBtn.classList.remove("playing")
        }
        volumeRange.oninput = ()=>{
            mainAudio.volume = volumeRange.value/100
            volumeTracked.style.width = volumeRange.offsetWidth * volumeRange.value /100 + "px" 
        }
        volumeFire.oninput = (e)=>{
            const nextEle = e.target.nextElementSibling   
            volumeFireIcon.style.fill = "var(--main-color)"   
            if(volumeFire.value<5){
                nextEle.style.width = 24 +'px'
            }   
            else if(volumeFire.value>=5&&volumeFire.value<40){
                nextEle.style.width = volumeFire.offsetWidth * volumeFire.value /100 +12+ "px"     
            }    
            else{
                nextEle.style.width = volumeFire.offsetWidth * volumeFire.value /100 + "px" 
            }
            fireAudio.play()
            fireAudio.volume = volumeFire.value /100
            if(volumeFire.value==0){
                volumeFireIcon.style.fill = "#555555"   
                fireAudio.pause()
            }
        }
        volumeTraffic.oninput = (e)=>{
            const nextEle = e.target.nextElementSibling   
            volumeTrafficIcon.style.fill = "var(--main-color)"   
            if(volumeTraffic.value<5){
                nextEle.style.width = 24 +'px'
            }   
            else if(volumeTraffic.value>=5&&volumeTraffic.value<40){
                nextEle.style.width = volumeTraffic.offsetWidth * volumeTraffic.value /100 +12+ "px"     
            }    
            else{
                nextEle.style.width = volumeTraffic.offsetWidth * volumeTraffic.value /100 + "px" 
            }
            fireAudio.play()
            fireAudio.volume = volumeTraffic.value /100
            if(volumeTraffic.value==0){
                volumeTrafficIcon.style.fill = "#555555"   
                fireAudio.pause()
            }
        }
        volumeRain.oninput = (e)=>{
            const nextEle = e.target.nextElementSibling   
            if(volumeRain.value>0){
                _this.isRainning = true
                volumeRainIcon.style.fill = "var(--main-color)"   
                if(volumeRain.value<5&&volumeRain.value>0){
                    nextEle.style.width = 24 +'px'
                }   
                else if(volumeRain.value>=5&&volumeRain.value<40){
                    nextEle.style.width = volumeRain.offsetWidth * volumeRain.value /100 +12+ "px"  
                }    
                else{
                    nextEle.style.width = volumeRain.offsetWidth * volumeRain.value /100 + "px" 
                }
                if(this.isNight){
                    backGround.classList.remove("night")
                    backGround.classList.add("night-rain")
                }
                else if(this.isNight==false){
                    backGround.classList.add("daytime-rain")
                }
                rainAudio.play()
                rainAudio.volume = volumeRain.value /100
            }
            if(volumeRain.value==0){
                volumeRainIcon.style.fill = "#555555"   
                _this.isRainning = false
                rainAudio.pause()
                if(this.isNight){
                    backGround.classList.remove("night-rain")
                    backGround.classList.add("night")
                }
                else if(this.isNight==false){
                    backGround.classList.remove("daytime-rain")
                }
                nextEle.style.width = 24 +'px'
            }
        }
        mixMode.onclick = () => {
            _this.mixAudio()
        }
    },
    async start(){
        this.handleClick()
        await this.getAllMusic(db)
        await this.loadCurrentSong()
    }   
}

playerMusic.start()
