// My products

var imgAndVideo = document.querySelectorAll('.imgAndVideo') /*lấy toàn bộ thẻ img and video trong class products-wrapper*/
var prev = document.querySelector('.prev')
var next = document.querySelector('.next')
var closeGallery = document.querySelector('.close')
var gallery__inner = document.querySelector('.gallery__inner')
var gallery = document.querySelector('.gallery')


/*nodeList cũng giống mảng nên có thể sử dụng forEach nhưng bên trong là callbackFunction
    3 tham số item chính là những node trong nodeList index là key(hay giống chỉ số trong mảng)
    trong th này ko cần truyền vào nodeList đó
*/
var currentIndex = 0

function showImage(currentIndex){
    gallery__inner.innerHTML = ''
    
    /*Ta sẽ tạo biến creatImg chứa object là thẻ img mà ta tạo bằng document.createElement*/
    /*Sau đó ta gán đường dẫn của cái đc click cho biến creatImg thông qua attribute src*/
    /*sau đó ta dùng property classlist rồi dùng method add để thêm class cho creatImg. Mục đích
    là để điều chỉnh lại size của tấm ảnh khi hiện lên*/
    /*Cuối cùng ta chỉ cần thêm nguyên cái object là thẻ img là con của gallery__inner thông qua 
    method appendChild và hiển thị gallery lên cho ng dùng */
    var creatImg = document.createElement('img')
    creatImg.src = imgAndVideo[currentIndex].src
    creatImg.classList.add('sizeImg')

    gallery__inner.appendChild(creatImg)

    gallery.classList.add('show-gallery')
}

function showVideo(currentIndex){
        gallery__inner.innerHTML = ''

      /*Video thì cũng tương tự như img nhưng ta sẽ thêm 2 method là play and setAttribute
        Vs method play là để khi user click vào thì video tự động chạy
        Vs setAttribute thì để ta thêm thuộc tính controls cho tagVideo*/
        var creatVideo = document.createElement('video')
        creatVideo.src = imgAndVideo[currentIndex].src
        creatVideo.classList.add('sizeVideo')
        creatVideo.play()
        creatVideo.setAttribute('controls', '')

        gallery__inner.appendChild(creatVideo)

        gallery.classList.add('show-gallery')
}

imgAndVideo.forEach(function(item, index){
    // function sẽ đc gọi khi event click xảy ra
    item.addEventListener('click',function(){
        currentIndex = index /* gán key của item hiện tại (đc click) cho currentIndex */

        /* nếu tagName (tên của thẻ) === img, 3 giống = thể hiện bằng cả loại chữ hoa, chữ thường, kiểu*/
        if(imgAndVideo[currentIndex].tagName === 'IMG'){ 
            showImage(currentIndex)
        }
         else if(imgAndVideo[currentIndex].tagName === 'VIDEO'){
            showVideo(currentIndex)
        }

        // khi user nhấn vào product đầu hoặc cuối thì phải gọi hàm showAndHideBtn()
        // để ẩn đi nút prev or next tương ứng
        // còn khi user ấn vào product ở vị trí khác thì phải hiện lên cả 2 nut prev or next
        if(currentIndex == 0 || currentIndex == imgAndVideo.length - 1){
            showAndHideBtn()
        } else{
            next.classList.remove('hide-btn-gallery')
            prev.classList.remove('hide-btn-gallery')
        }
    })
})


/* ở dưới là 2 option để user có thể đóng gallery 1 cách thuận tiện nhất */
// khi user click vào biểu tượng tắt 
closeGallery.addEventListener('click', function(){
    gallery.classList.remove('show-gallery')
    gallery__inner.innerHTML = ''
})


// khi user click vào esc ta sẽ bắt event keyboard, nút esc trên bàn phím là 27 (dựa vào mã ascii)
// và khi keyCode == 27 thì ta tắt gallery
document.addEventListener('keydown', function(e){
    if(e.keyCode == 27){
        gallery.classList.remove('show-gallery')
        gallery__inner.innerHTML = ''
    }
})

function showAndHideBtn(){
    if(currentIndex == 0){
        prev.classList.add('hide-btn-gallery')
    } else{
        prev.classList.remove('hide-btn-gallery')
    }

    if(currentIndex == imgAndVideo.length - 1){
        next.classList.add('hide-btn-gallery')
    } else{
        next.classList.remove('hide-btn-gallery')
    }
}

prev.addEventListener('click', function(){
    if(currentIndex > 0){
        currentIndex--
        console.log(currentIndex)
        if(imgAndVideo[currentIndex].tagName === 'IMG'){ 
            showImage(currentIndex)
        }
         else if(imgAndVideo[currentIndex].tagName === 'VIDEO'){
            showVideo(currentIndex)
        }
    }
    showAndHideBtn()
})

next.addEventListener('click', function(){
    if(currentIndex < imgAndVideo.length - 1){
        currentIndex++
        console.log(currentIndex)
        if(imgAndVideo[currentIndex].tagName === 'IMG'){ 
            showImage(currentIndex)
        }
         else if(imgAndVideo[currentIndex].tagName === 'VIDEO'){
            showVideo(currentIndex)
        }
    }
    showAndHideBtn()
})


// scroll sections
var sections = document.querySelectorAll('section')
var navLinks = document.querySelectorAll('header nav a') /* chọn all thẻ a là con của nav và nav là con của header */

// đầu tiên gán event click cho all item có trong nodelist navLinks
// sau đó mỗi khi event click xảy ra với item nào thì ta lại xóa hết
// class active của những item trx đó rồi sau đó mới thêm class active 
// vào item mới đc click
navLinks.forEach(function(item){
    item.addEventListener('click', function(){
        navLinks.forEach(function(item2){
            item2.classList.remove('active')
        })
        item.classList.add('active')
    })
})

// sẽ bắt sự kiện scroll của user sau đó lấy object header gán vào biến header và sử dụng classList.toggle
// toggle ('className', condition), trong trường hợp này thì khi window.scrollY > 70 (khi cuộn cửa sộ theo chiều dọc > 70px thì 
// thỏa điều kiện
window.addEventListener('scroll', function(){
    // sticky header
    var header = document.querySelector('header')
    header.classList.toggle('sticky', window.scrollY > 70)

    // xóa toggle icon and navbar khi click vào navbar links (scroll)
    menuIcon.classList.replace('bx-x-circle', 'bxs-home')
    navbar.classList.remove('active')
})

// toggle icon navbar
var menuIcon = document.querySelector('#menu-icon')
var navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click', function(){
    if(menuIcon.classList[1] == 'bxs-home'){
        menuIcon.classList.replace('bxs-home', 'bx-x-circle')
    }
    else if(menuIcon.classList[1] == 'bx-x-circle'){
        menuIcon.classList.replace('bx-x-circle', 'bxs-home')
    }

    navbar.classList.toggle('active')
})

//footer 
var iconFooter = document.querySelector('.footer-iconTop i')
iconFooter.addEventListener('click', function(){
    navLinks.forEach(function(item){
        item.classList.remove('active')
    })
    navLinks[0].classList.add('active')
})